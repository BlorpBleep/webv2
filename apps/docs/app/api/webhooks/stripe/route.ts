// File: app/api/webhooks/stripe/route.ts
// Use this command to run local and listen to webhooks for 90 days:
// stripe listen --forward-to localhost:3000/api/webhooks/stripe

import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextResponse } from 'next/server'; // Needed for Next.js 13 App Router
import { supabase } from '@/utils/supabase';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body for signature verification
  },
};

// Webhook handler
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const rawBody = await req.text(); // Use req.text() to read raw body
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    console.error('Error verifying Stripe signature:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the webhook event
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    case 'checkout.session.async_payment_failed':
      // Handle async payment failed
      console.log(`Payment failed for session: ${event.id}`);
      break;
    case 'checkout.session.expired':
      // Handle checkout session expired
      console.log(`Session expired: ${event.id}`);
      break;
    case 'customer.created':
      const customer = event.data.object as Stripe.Customer;
      await handleCustomerCreated(customer);
      break;
    case 'invoice.payment_succeeded':
      const invoiceSucceeded = event.data.object as Stripe.Invoice;
      await handleInvoiceEvent(invoiceSucceeded);
      break;
    case 'invoice.payment_failed':
      const invoiceFailed = event.data.object as Stripe.Invoice;
      await handleInvoiceFailed(invoiceFailed);
      break;
    case 'payment_intent.created':
    case 'payment_intent.processing':
    case 'payment_intent.succeeded':
    case 'payment_intent.canceled':
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentIntentEvent(paymentIntent);
      break;
    case 'payment_method.attached':
    case 'payment_method.detached':
    case 'payment_method.updated':
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      await handlePaymentMethodEvent(paymentMethod);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Handle successful checkout session
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email;
  const subscriptionId = session.subscription as string;

  if (!subscriptionId) {
    console.error("No subscription ID found in session.");
    return;
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (!subscription) {
      console.error("Failed to retrieve subscription.");
      return;
    }

    const priceId = subscription.items.data[0]?.price.id;
    const startDate = subscription.current_period_start;
    const endDate = subscription.current_period_end;

    // Find or create the customer in Supabase
    const { data: user, error: findUserError } = await supabase
      .from('auth.users')
      .select('*')
      .eq('email', customerEmail)
      .single();

    if (findUserError) {
      console.error('Error finding user:', findUserError.message);
      return;
    }

    const { data: subscriptionData, error: subError } = await supabase
      .from('subscriptions')
      .upsert({
        id: subscriptionId,
        user_id: user.id,
        status: subscription.status,
        price_id: priceId,
        current_period_start: new Date(startDate * 1000).toISOString(),
        current_period_end: new Date(endDate * 1000).toISOString(),
      });

    if (subError) {
      console.error('Error creating/updating subscription:', subError.message);
    } else {
      console.log('Subscription created/updated:', subscriptionData);
    }

    // Optionally create or update a voucher
    await createOrUpdateVoucher(subscriptionId, user.id);

  } catch (error) {
    console.error("Error retrieving subscription:", error);
  }
}

// Handle successful invoice payment
async function handleInvoiceEvent(invoice: Stripe.Invoice) {
  const { data, error } = await supabase
    .from('invoices')
    .upsert({
      stripe_invoice_id: invoice.id,
      customer_id: invoice.customer as string, // Link to customers table
      subscription_id: invoice.subscription as string,
      status: invoice.status,
      total: invoice.amount_paid,
      payment_intent_id: invoice.payment_intent as string,
      created_at: new Date(invoice.created * 1000).toISOString(),
    });

  if (error) {
    console.error('Error creating/updating invoice:', error.message);
  } else {
    console.log('Invoice created/updated:', data);
  }
}

// Handle failed invoice payment
async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  console.error(`Invoice payment failed: ${invoice.id}`);
}

// Handle payment intent events
async function handlePaymentIntentEvent(paymentIntent: Stripe.PaymentIntent) {
  const { data, error } = await supabase
    .from('payment_intents')
    .upsert({
      stripe_payment_intent_id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customer_id: paymentIntent.customer as string,
      created_at: new Date(paymentIntent.created * 1000).toISOString(),
    });

  if (error) {
    console.error('Error creating/updating payment intent:', error.message);
  } else {
    console.log('Payment Intent created/updated:', data);
  }
}

// Handle customer created event
async function handleCustomerCreated(customer: Stripe.Customer) {
  const { data, error } = await supabase
    .from('customers')
    .upsert({
      stripe_customer_id: customer.id,
      id: customer.metadata.user_id,  // Assuming you have user_id in metadata from checkout session
    });

  if (error) {
    console.error('Error creating/updating customer:', error.message);
  } else {
    console.log('Customer created/updated:', data);
  }
}

// Handle payment method events
async function handlePaymentMethodEvent(paymentMethod: Stripe.PaymentMethod) {
  const { data, error } = await supabase
    .from('payment_methods')
    .upsert({
      stripe_payment_method_id: paymentMethod.id,
      type: paymentMethod.type,
      last_four: paymentMethod.card?.last4,
      exp_month: paymentMethod.card?.exp_month,
      exp_year: paymentMethod.card?.exp_year,
      customer_id: paymentMethod.customer as string,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating/updating payment method:', error.message);
  } else {
    console.log('Payment Method created/updated:', data);
  }
}

// Create or update voucher
async function createOrUpdateVoucher(subscriptionId: string, userId: string) {
  const { data, error } = await supabase
    .from('vouchers')
    .upsert({
      subscription_id: subscriptionId,
      associated_account: userId,
      duration_months: 12, // Example
      is_used: false,
    });

  if (error) {
    console.error('Error creating/updating voucher:', error.message);
  } else {
    console.log('Voucher created/updated:', data);
  }
}