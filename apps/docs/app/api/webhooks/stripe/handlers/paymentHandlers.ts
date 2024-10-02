import Stripe from 'stripe';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { v4 as uuidv4 } from 'uuid';

// Function to handle 'payment_intent.created' event
export async function handlePaymentIntentCreated(paymentIntent: Stripe.PaymentIntent) {
  console.log('--- handlePaymentIntentCreated called ---');
  console.log('Payment Intent created:', paymentIntent.id);

  const { data: existingPaymentIntent, error: fetchError } = await supabaseAdmin
    .from('payment_intents')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntent.id)
    .single();

  if (existingPaymentIntent) {
    console.log('Payment Intent already exists. Skipping insertion.');
    return;
  }

  let customerUUID: string | null = null;
  if (paymentIntent.customer && typeof paymentIntent.customer === 'string') {
    console.log('Fetching customer UUID for customer ID:', paymentIntent.customer);
    customerUUID = await getCustomerUUID(paymentIntent.customer);
  }

  const paymentIntentData = {
    id: uuidv4(),
    stripe_payment_intent_id: paymentIntent.id,
    status: paymentIntent.status,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    customer_id: customerUUID,
    created_at: new Date(paymentIntent.created * 1000).toISOString(),
    receipt_email: paymentIntent.receipt_email || null,
  };

  console.log('Payment Intent Data to be inserted:', paymentIntentData);

  const { error: insertError } = await supabaseAdmin
    .from('payment_intents')
    .insert(paymentIntentData);

  if (insertError) {
    if (insertError.code === '23505') { // Unique violation
      console.warn('Payment Intent already exists during insertion:', paymentIntent.id);
      return;
    }
    console.error('Error inserting Payment Intent:', insertError.message);
    throw new Error('Failed to insert Payment Intent.');
  }

  console.log('Payment Intent inserted successfully:', paymentIntent.id);
}

// Function to handle 'payment_intent.succeeded' event
export async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('--- handlePaymentIntentSucceeded called ---');
  console.log('Payment Intent succeeded:', paymentIntent.id);

  const { data: existingPaymentIntent, error: fetchError } = await supabaseAdmin
    .from('payment_intents')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntent.id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      console.warn(`No payment intent record found for Stripe Payment Intent ID: ${paymentIntent.id}`);
      return;
    } else {
      console.error('Error fetching payment intent:', fetchError.message);
      throw new Error('Failed to fetch Payment Intent.');
    }
  } else {
    console.log('Payment Intent already exists:', existingPaymentIntent.id);
  }

  // Check if there's a payment method associated with the payment intent
  if (paymentIntent.payment_method) {
    console.log('Inserting associated Payment Method:', paymentIntent.payment_method);
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string);
    await handlePaymentMethodInsert(paymentMethod);
  } else {
    console.warn('No payment method associated with this Payment Intent.');
  }
}

// Function to handle the payment method insert
export async function handlePaymentMethodInsert(paymentMethod: Stripe.PaymentMethod) {
  console.log('--- handlePaymentMethodInsert called ---');
  console.log('Payment Method to be inserted:', paymentMethod.id);

  const { data: existingPaymentMethod, error: fetchError } = await supabaseAdmin
    .from('payment_methods')
    .select('*')
    .eq('stripe_payment_method_id', paymentMethod.id)
    .single();

  if (existingPaymentMethod) {
    console.log('Payment Method already exists. Skipping insertion.');
    return;
  }

  // Check if card details are present
  const cardDetails = paymentMethod.card;
  if (!cardDetails) {
    console.error('Card details are missing in the payment method.');
    throw new Error('Payment Method lacks card details.');
  }

  const paymentMethodData = {
    stripe_payment_method_id: paymentMethod.id,
    type: paymentMethod.type,
    last_four: cardDetails.last4 || null,
    exp_month: cardDetails.exp_month || null,
    exp_year: cardDetails.exp_year || null,
    customer_id: paymentMethod.customer || null,
    created_at: new Date(paymentMethod.created * 1000).toISOString(),
    updated_at: new Date(paymentMethod.created * 1000).toISOString(),
  };

  console.log('Payment Method Data to be inserted:', paymentMethodData);

  const { error: insertError } = await supabaseAdmin
    .from('payment_methods')
    .insert(paymentMethodData);

  if (insertError) {
    console.error('Error inserting Payment Method:', insertError.message);
    throw new Error('Failed to insert Payment Method.');
  }

  console.log('Payment Method insertion request completed. Payment Method ID:', paymentMethod.id);
  console.log('Payment Method inserted successfully:', paymentMethod.id);
}

// Helper function to get customer UUID from Stripe Customer ID
async function getCustomerUUID(stripeCustomerId: string): Promise<string | null> {
  console.log('--- getCustomerUUID called ---');
  console.log('Fetching customer UUID for Stripe Customer ID:', stripeCustomerId);

  const { data: customerRecord, error: customerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  if (customerError) {
    if (customerError.code === 'PGRST116') {
      console.warn(`No customer found with Stripe Customer ID: ${stripeCustomerId}`);
      return null;
    } else {
      console.error('Error fetching customer record:', customerError.message);
      throw new Error('Failed to fetch customer record.');
    }
  }

  console.log('Customer UUID retrieved:', customerRecord.id);
  return customerRecord.id;
}
