// File: apps/docs/app/api/webhooks/stripe/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  supabaseAdmin,
  getUserByEmail,
  getUserAccount,
  Account,
} from '@/utils/supabaseAdmin';
import { generateVoucherCode } from '@/utils/voucherCodeGenerator';
import { generateAccountNumber } from '@/utils/accountNumberGenerator';
import { calculateNewExpiry } from '@/utils/expiryDateCalculator';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { checkStatus } from '@/utils/checkStatus';

// Define TypeScript interfaces for Supabase tables

interface PaymentMethod {
  id: string;
  stripe_payment_method_id: string;
  type: string;
  last_four: string | null;
  exp_month: number | null;
  exp_year: number | null;
  customer_id: string | null; // UUID referencing customers(id)
  created_at: string;
  updated_at: string;
}

interface Subscription {
  id: string; // Internal UUID
  stripe_subscription_id: string | null; // Stripe's subscription ID, null for one-time purchases
  user_id: string;
  status: string;
  metadata: Record<string, any>;
  price_id: string | null;
  quantity: number;
  cancel_at_period_end: boolean;
  created: string; // ISO string
  current_period_start: string; // ISO string
  current_period_end: string; // ISO string
  ended_at: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
}

interface Voucher {
  id: string;
  code: string;
  duration_months: number;
  is_used: boolean;
  associated_account: string | null;
  created_at: string;
  status: string;
  subscription_id: string | null;
  channel_id: string | null; // UUID referencing channels(id)
  updated_at: string;
  used_at: string | null;
  updated_by: string | null;
  payment_intent_id: string | null; // UUID referencing payment_intents(id)
}

interface PaymentIntentRecord {
  id: string; // Internal UUID
  stripe_payment_intent_id: string; // Stripe's pi_ ID
  status: string;
  amount: number;
  currency: string;
  customer_id: string | null; // UUID referencing customers(id)
  created_at: string;
  receipt_email: string | null;
}

interface ChargeRecord {
  id: string; // Internal UUID
  stripe_charge_id: string; // Stripe's ch_ ID
  payment_intent_id: string | null; // UUID referencing payment_intents(id)
  amount: string; // Changed from bigint to string
  amount_refunded: string; // Changed from bigint to string
  currency: string;
  customer_id: string | null; // UUID referencing customers(id)
  billing_details: any; // jsonb
  status: string;
  created_at: string;
  receipt_email: string | null;
  refunded: boolean;
  disputed: boolean;
}

interface CustomerRecord {
  id: string; // Internal UUID
  stripe_customer_id: string; // Stripe's cus_ ID
}

// Ensure all required environment variables are set
const requiredEnvVars = [
  'NODE_ENV',
  'STRIPE_LIVE_SECRET_KEY',
  'STRIPE_TEST_SECRET_KEY',
  'STRIPE_LIVE_WEBHOOK_SECRET',
  'STRIPE_TEST_WEBHOOK_SECRET',
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET',
  'GMAIL_REFRESH_TOKEN',
  'GMAIL_USER',
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Determine if the environment is production
const isProduction = process.env.NODE_ENV === 'production';

// Stripe configuration
const stripeSecretKey = isProduction
  ? process.env.STRIPE_LIVE_SECRET_KEY!
  : process.env.STRIPE_TEST_SECRET_KEY!;

const stripeWebhookSecret = isProduction
  ? process.env.STRIPE_LIVE_WEBHOOK_SECRET!
  : process.env.STRIPE_TEST_WEBHOOK_SECRET!;

// Initialize Stripe with your Secret Key
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
});

// Define the runtime (specific to Next.js)
export const runtime = 'nodejs';

// Initialize Nodemailer transporter with OAuth2 for enhanced security
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

// Helper function to convert ReadableStream to Buffer
async function buffer(readableStream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = readableStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
    }
  }

  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

// Webhook handler for POST requests
export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing Stripe signature.');
    return NextResponse.json(
      { error: 'Missing Stripe signature.' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  let rawBody: Buffer | null = null;

  try {
    if (!req.body) {
      throw new Error('Request body is null');
    }

    rawBody = await buffer(req.body as ReadableStream<Uint8Array>);

    // Only log raw body in development
    if (!isProduction) {
      console.log('Raw Body:', rawBody.toString());
    }

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret
    );
    console.log('Webhook signature verified.');
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    if (rawBody && !isProduction) {
      console.error('Raw Body at failure:', rawBody.toString());
    }
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 }
    );
  }

  try {
    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'payment_intent.created':
        await handlePaymentIntentCreated(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'charge.succeeded':
        await handleChargeSucceeded(event.data.object as Stripe.Charge);
        break;
      case 'charge.updated':
        await handleChargeUpdated(event.data.object as Stripe.Charge);
        break;
      default:
        await handleUnhandledEvent(event);
    }

    // After handling the event, perform status checks
    await checkStatus();

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error handling event:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

// Handle 'checkout.session.completed' event
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout Session completed:', session.id);

  const customerEmail = session.customer_email || session.customer_details?.email;

  if (!customerEmail) {
    console.error('Customer email is required but not found.');
    throw new Error('Customer email is missing.');
  }

  // Check if the user exists
  let user = await getUserByEmail(customerEmail);

  if (!user) {
    console.log('User not found. Creating a new user:', customerEmail);
    const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email: customerEmail,
      email_confirm: true,
    });

    if (createUserError) {
      // Handle case where user might have been created in the meantime
      if (createUserError.message.includes('already been registered')) {
        console.warn('User already exists during creation attempt:', customerEmail);
        user = await getUserByEmail(customerEmail);
        if (!user) {
          throw new Error('Failed to retrieve user after creation conflict.');
        }
      } else {
        console.error('Error creating user:', createUserError.message);
        throw new Error('Failed to create user.');
      }
    } else {
      user = newUser.user;
      console.log('User created successfully:', user.id);

      // Create corresponding customer entry
      const { error: customerError } = await supabaseAdmin
        .from('customers')
        .insert({
          id: user.id, // Assuming customers.id references users.id
          stripe_customer_id: session.customer as string, // Assuming session.customer is the Stripe customer ID
        });

      if (customerError) {
        // Handle case where customer entry might already exist
        if (customerError.message.includes('duplicate key value violates unique constraint')) {
          console.warn('Customer entry already exists:', user.id);
        } else {
          console.error('Error creating customer entry:', customerError.message);
          throw new Error('Failed to create customer entry.');
        }
      } else {
        console.log('Customer entry created successfully.');
      }
    }
  } else {
    console.log('User already exists:', user.id);

    // Ensure customer entry exists
    const { data: existingCustomer, error: fetchCustomerError } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchCustomerError) {
      if (fetchCustomerError.code === 'PGRST116') { // Row not found
        console.log('Customer entry not found. Creating a new customer entry.');
        const { error: customerError } = await supabaseAdmin
          .from('customers')
          .insert({
            id: user.id,
            stripe_customer_id: session.customer as string,
          });

        if (customerError) {
          // Handle duplicate entry if it was created in the meantime
          if (customerError.message.includes('duplicate key value violates unique constraint')) {
            console.warn('Customer entry already exists:', user.id);
          } else {
            console.error('Error creating customer entry:', customerError.message);
            throw new Error('Failed to create customer entry.');
          }
        } else {
          console.log('Customer entry created successfully.');
        }
      } else {
        console.error('Error fetching customer entry:', fetchCustomerError.message);
        throw new Error('Failed to fetch customer entry.');
      }
    } else {
      console.log('Customer entry already exists:', existingCustomer.id);
    }
  }

  // Retrieve or create account for the user
  let account: Account | null = await getUserAccount(user.id);

  if (!account) {
    console.log(`Account not found for user ID ${user.id}. Creating a new account.`);
    const accountNumber = generateAccountNumber();
    const newExpiryDate = calculateNewExpiry(null, 1); // 1 month duration

    const { data: newAccount, error: createAccountError } = await supabaseAdmin
      .from('accounts')
      .insert({
        account_number: accountNumber,
        user_id: user.id,
        expiry: newExpiryDate.toISOString(), // Convert Date to string
      })
      .select()
      .single();

    if (createAccountError) {
      console.error('Error creating account:', createAccountError.message);
      throw new Error('Failed to create account.');
    }

    account = newAccount as Account;
    console.log('Account created successfully:', account.id);
  } else {
    console.log('Account retrieved successfully:', account.id);
    // Update expiry date
    const newExpiryDate = calculateNewExpiry(new Date(account.expiry), 1); // Returns Date
    const { error: updateExpiryError } = await supabaseAdmin
      .from('accounts')
      .update({ expiry: newExpiryDate.toISOString() }) // Convert Date to string
      .eq('id', account.id);

    if (updateExpiryError) {
      console.error('Error updating account expiry:', updateExpiryError.message);
      throw new Error('Failed to update account expiry.');
    }

    console.log('Account expiry updated successfully:', newExpiryDate.toISOString());
  }

  // At this point, 'account' is guaranteed to be non-null
  const accountNumber = account.account_number;

  // Handle payment intent from session
  const paymentIntentId: string | undefined = session.payment_intent as string | undefined;

  if (paymentIntentId) {
    // Retrieve the Payment Intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      console.log('Payment Intent retrieved and succeeded:', paymentIntent.id);

      // Insert payment intent into Supabase if not already present
      const { data: existingPaymentIntent, error: fetchPiError } = await supabaseAdmin
        .from('payment_intents')
        .select('*')
        .eq('stripe_payment_intent_id', paymentIntent.id)
        .single();

      if (fetchPiError) {
        if (fetchPiError.code === 'PGRST116') { // Row not found
          // Insert the payment intent
          const paymentIntentRecord: PaymentIntentRecord = {
            id: uuidv4(),
            stripe_payment_intent_id: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            customer_id: await getCustomerUUID(paymentIntent.customer as string) || null,
            created_at: new Date(paymentIntent.created * 1000).toISOString(),
            receipt_email: paymentIntent.receipt_email || null,
          };

          const { error: insertPiError } = await supabaseAdmin
            .from('payment_intents')
            .insert(paymentIntentRecord);

          if (insertPiError) {
            console.error('Error inserting Payment Intent:', insertPiError.message);
            throw new Error('Failed to insert Payment Intent.');
          }

          console.log('Payment Intent inserted successfully:', paymentIntent.id);
        } else {
          console.error('Error fetching Payment Intent:', fetchPiError.message);
          throw new Error('Failed to fetch Payment Intent.');
        }
      } else {
        console.log('Payment Intent already exists:', existingPaymentIntent.id);
      }

      // Retrieve the internal UUID from the payment_intents table
      const { data: internalPaymentIntent, error: internalPiError } = await supabaseAdmin
        .from('payment_intents')
        .select('id')
        .eq('stripe_payment_intent_id', paymentIntent.id)
        .single();

      if (internalPiError) {
        console.error('Error retrieving internal Payment Intent:', internalPiError.message);
        throw new Error('Failed to retrieve internal Payment Intent.');
      }

      const internalPaymentIntentId = internalPaymentIntent.id;

      // Create or update a voucher based on the payment using the internal UUID
      await createOrUpdateVoucher(accountNumber, 1, internalPaymentIntentId);

      // Insert subscription data if applicable
      const stripeSubscriptionId = session.subscription as string | undefined; // Stripe subscription ID
      const isOneTimePurchase = !stripeSubscriptionId; // If no subscription ID, it's a one-time purchase

      await insertSubscription(
        stripeSubscriptionId || null, // Pass null for one-time purchases
        user.id,
        accountNumber,
        internalPaymentIntentId,
        isOneTimePurchase
      );

      // Send email notification
      await sendEmailNotification(customerEmail, session);
    } else {
      console.warn('Payment Intent is not succeeded:', paymentIntent.status);
    }
  } else {
    console.error('No payment intent ID found in session.');
    throw new Error('Payment intent ID is missing.');
  }
}

// Handle 'payment_intent.created' event
async function handlePaymentIntentCreated(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment Intent created:', paymentIntent.id);

  // Check if the payment intent already exists to ensure idempotency
  const { data: existingPaymentIntent, error: fetchError } = await supabaseAdmin
    .from('payment_intents')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntent.id)
    .single();

  if (existingPaymentIntent) {
    console.log('Payment Intent already exists. Skipping insertion.');
    return;
  }

  // Map Stripe Customer ID to internal customer UUID
  let customerUUID: string | null = null;
  if (paymentIntent.customer && typeof paymentIntent.customer === 'string') {
    customerUUID = await getCustomerUUID(paymentIntent.customer);
  }

  // Insert payment intent data into 'payment_intents' table
  const paymentIntentData: PaymentIntentRecord = {
    id: uuidv4(),
    stripe_payment_intent_id: paymentIntent.id,
    status: paymentIntent.status,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    customer_id: customerUUID,
    created_at: new Date(paymentIntent.created * 1000).toISOString(),
    receipt_email: paymentIntent.receipt_email || null,
  };

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

// Handle 'payment_intent.succeeded' event
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment Intent succeeded:', paymentIntent.id);

  // Check if the payment intent already exists to ensure idempotency
  const { data: existingPaymentIntent, error: fetchError } = await supabaseAdmin
    .from('payment_intents')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntent.id)
    .single();

  if (fetchError) {
    if (fetchError.code === 'PGRST116') { // No rows found
      // Optionally, you can create the payment intent record here
      console.warn(`No payment intent record found for Stripe Payment Intent ID: ${paymentIntent.id}`);
      // Decide whether to create it or wait for 'payment_intent.created'
      // For now, we'll log and proceed
      return;
    } else {
      console.error('Error fetching payment intent:', fetchError.message);
      throw new Error('Failed to fetch Payment Intent.');
    }
  } else {
    console.log('Payment Intent already exists:', existingPaymentIntent.id);
  }

  // Additional logic for succeeded payment intents can be added here
}

// Handle 'charge.succeeded' event
async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log('Charge succeeded:', charge.id);

  // Validate that the charge has a payment_intent
  if (!charge.payment_intent || typeof charge.payment_intent !== 'string') {
    console.error('Charge does not have a valid payment_intent.');
    throw new Error('Invalid charge event: missing payment_intent.');
  }

  const stripePaymentIntentId = charge.payment_intent as string;

  // Retrieve the internal UUID for the payment intent
  const { data: paymentIntentRecord, error: paymentIntentError } = await supabaseAdmin
    .from('payment_intents')
    .select('id')
    .eq('stripe_payment_intent_id', stripePaymentIntentId)
    .single();

  if (paymentIntentError) {
    if (paymentIntentError.code === 'PGRST116') { // Row not found
      console.warn(`No payment intent record found for Stripe Payment Intent ID: ${stripePaymentIntentId}`);
      // Instead of throwing an error, log and continue to prevent halting the webhook processing
      return;
    } else {
      console.error('Error fetching payment intent record:', paymentIntentError.message);
      throw new Error('Failed to fetch Payment Intent record.');
    }
  }

  const paymentIntentUUID = paymentIntentRecord.id;

  // Map Stripe Customer ID to internal customer UUID
  let customerUUID: string | null = null;
  if (charge.customer && typeof charge.customer === 'string') {
    customerUUID = await getCustomerUUID(charge.customer);
  }

  // Check if the charge already exists to ensure idempotency
  const { data: existingCharge, error: fetchChargeError } = await supabaseAdmin
    .from('charges')
    .select('*')
    .eq('stripe_charge_id', charge.id)
    .single();

  if (existingCharge) {
    console.log('Charge already exists. Skipping insertion.');
    return;
  }

  // Prepare billing details for insertion
  const billingDetails = charge.billing_details ? {
    address: charge.billing_details.address,
    email: charge.billing_details.email,
    name: charge.billing_details.name,
    phone: charge.billing_details.phone,
  } : null;

  // Insert charge data into 'charges' table using the UUID
  const chargeData: Partial<ChargeRecord> = {
    id: uuidv4(),
    stripe_charge_id: charge.id,
    payment_intent_id: paymentIntentUUID, // Use UUID from 'payment_intents' table
    amount: charge.amount.toString(), // Convert to string
    amount_refunded: charge.amount_refunded.toString(), // Convert to string
    currency: charge.currency,
    customer_id: customerUUID, // Use mapped UUID or null
    billing_details: billingDetails, // jsonb
    status: charge.status,
    created_at: new Date(charge.created * 1000).toISOString(),
    receipt_email: charge.receipt_email || null,
    refunded: charge.refunded,
    disputed: charge.disputed,
  };

  const { error: chargeError } = await supabaseAdmin
    .from('charges')
    .insert(chargeData);

  if (chargeError) {
    console.error('Error inserting charge data:', chargeError.message);
    console.error('Charge data:', chargeData);
    throw new Error('Failed to insert charge data.');
  } else {
    console.log('Charge data inserted successfully.');
  }

  // Insert payment method data if available
  if (charge.payment_method) {
    const paymentMethod = await stripe.paymentMethods.retrieve(charge.payment_method as string);

    if (paymentMethod) {
      await insertPaymentMethod(paymentMethod, customerUUID || '');
    }
  }
}

// Handle 'charge.updated' event
async function handleChargeUpdated(charge: Stripe.Charge) {
  console.log('Charge updated:', charge.id);

  // Implement any specific logic needed for charge updates
  // For example, handling refunds, disputes, etc.

  // Example: Update charge status in Supabase
  const { data: existingCharge, error: fetchChargeError } = await supabaseAdmin
    .from('charges')
    .select('*')
    .eq('stripe_charge_id', charge.id)
    .single();

  if (fetchChargeError) {
    if (fetchChargeError.code === 'PGRST116') { // Row not found
      console.warn(`Charge record not found for Stripe Charge ID: ${charge.id}`);
      // Optionally, create the charge record here
      return;
    } else {
      console.error('Error fetching charge record:', fetchChargeError.message);
      throw new Error('Failed to fetch charge record.');
    }
  }

  // Update the charge status and other relevant fields
  const { error: updateError } = await supabaseAdmin
    .from('charges')
    .update({
      status: charge.status,
      refunded: charge.refunded,
      disputed: charge.disputed,
      // Add other fields as necessary
    })
    .eq('id', existingCharge.id);

  if (updateError) {
    console.error('Error updating charge record:', updateError.message);
    throw new Error('Failed to update charge record.');
  }

  console.log('Charge record updated successfully.');
}

// Insert payment method into 'payment_methods' table
async function insertPaymentMethod(paymentMethod: Stripe.PaymentMethod, customerId: string) {
  console.log('Inserting payment method:', paymentMethod.id);

  // Check if payment method already exists to ensure idempotency
  const { data: existingPM, error: fetchError } = await supabaseAdmin
    .from('payment_methods')
    .select('*')
    .eq('stripe_payment_method_id', paymentMethod.id)
    .single();

  if (existingPM) {
    console.log('Payment method already exists:', existingPM.id);
    return;
  }

  const paymentMethodData: PaymentMethod = {
    id: uuidv4(), // Generate a new UUID for the payment_methods table
    stripe_payment_method_id: paymentMethod.id,
    type: paymentMethod.type,
    last_four: paymentMethod.card?.last4 || null,
    exp_month: paymentMethod.card?.exp_month || null,
    exp_year: paymentMethod.card?.exp_year || null,
    customer_id: customerId || null,
    created_at: new Date(paymentMethod.created * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { error: pmError } = await supabaseAdmin
    .from('payment_methods')
    .insert(paymentMethodData);

  if (pmError) {
    console.error('Error inserting payment method:', pmError.message);
    throw new Error('Failed to insert payment method.');
  }

  console.log('Payment method inserted successfully.');
}

// Insert subscription into 'subscriptions' table
async function insertSubscription(
  stripeSubscriptionId: string | null, // Stripe subscription ID, null for one-time
  userId: string,
  accountNumber: string,
  paymentIntentId: string,
  isOneTimePurchase: boolean
) {
  console.log(`Inserting subscription${isOneTimePurchase ? ' (OTP)' : ''}:`, stripeSubscriptionId || 'N/A');

  // Define valid subscription statuses based on your database schema
  const validStatuses = ['active', 'canceled', 'incomplete_expired', 'one_time_purchase']; // Ensure 'one_time_purchase' is added

  // Determine status based on purchase type
  const subscriptionStatus = isOneTimePurchase ? 'one_time_purchase' : 'active';

  if (!validStatuses.includes(subscriptionStatus)) {
    console.error(`Invalid subscription status: ${subscriptionStatus}`);
    throw new Error(`Invalid subscription status: ${subscriptionStatus}`);
  }

  // Generate an internal UUID for the subscription
  const internalSubscriptionId = uuidv4();

  // Retrieve price details to associate with subscription
  const priceId = stripeSubscriptionId ? await sessionPriceIdFromSession(stripeSubscriptionId) : null;

  const subscriptionData: Partial<Subscription> = {
    id: internalSubscriptionId,
    stripe_subscription_id: stripeSubscriptionId, // Null for one-time purchases
    user_id: userId,
    status: subscriptionStatus,
    metadata: {
      is_otp: isOneTimePurchase,
    },
    price_id: priceId || null,
    quantity: 1,
    cancel_at_period_end: false,
    created: new Date().toISOString(),
    current_period_start: new Date().toISOString(),
    current_period_end: calculateNewExpiry(new Date(), isOneTimePurchase ? 1 : 12).toISOString(),
    ended_at: null,
    cancel_at: null,
    canceled_at: null,
    trial_start: null,
    trial_end: null,
  };

  const { error: subError } = await supabaseAdmin
    .from('subscriptions')
    .insert(subscriptionData);

  if (subError) {
    console.error('Error inserting subscription:', subError.message);
    throw new Error('Failed to insert subscription.');
  }

  console.log('Subscription inserted successfully:', subscriptionData.id);
}

// Create or update voucher with idempotency
async function createOrUpdateVoucher(
  accountNumber: string,
  durationMonths: number,
  paymentIntentId: string
) {
  // Check if a voucher already exists for this payment intent
  const { data: existingVoucher, error: fetchError } = await supabaseAdmin
    .from('vouchers')
    .select('*')
    .eq('payment_intent_id', paymentIntentId)
    .single();

  if (existingVoucher) {
    console.log('Voucher already exists for this payment intent:', existingVoucher.code);
    return;
  }

  const voucherCode = generateVoucherCode();
  const expiryDate = calculateNewExpiry(null, durationMonths); // Returns Date

  const voucherData: Partial<Voucher> = {
    id: uuidv4(),
    code: voucherCode,
    duration_months: durationMonths,
    is_used: false,
    associated_account: accountNumber,
    created_at: new Date().toISOString(),
    status: 'active',
    subscription_id: null, // Optionally link to subscription
    channel_id: 'c4c8ca3f-3083-4484-a69c-cd64624ab765', // Default channel ID or dynamically set
    updated_at: new Date().toISOString(),
    used_at: null,
    updated_by: null,
    payment_intent_id: paymentIntentId, // UUID from payment_intents table
  };

  const { error: voucherError } = await supabaseAdmin
    .from('vouchers')
    .insert(voucherData);

  if (voucherError) {
    if (voucherError.code === '23505') { // Unique violation
      console.warn('Voucher already exists during insertion:', voucherData.code);
      return;
    }
    console.error('Error creating voucher:', voucherError.message);
    throw new Error('Failed to create voucher.');
  }

  console.log('Voucher created successfully:', voucherCode);
}

// Send email notification to the customer
async function sendEmailNotification(recipientEmail: string, session: Stripe.Checkout.Session) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipientEmail,
    subject: 'Payment Confirmation',
    text: `Thank you for your purchase! Your session ID is: ${session.id}.`,
    html: `<p>Thank you for your purchase!</p><p>Your session ID is: <strong>${session.id}</strong>.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
}

// Handle unhandled Stripe events
async function handleUnhandledEvent(event: Stripe.Event) {
  console.warn(`Unhandled event type: ${event.type}`);

  // Optionally, log the event details to a monitoring service or notify the admin
  if (!isProduction) {
    console.log('Unhandled event data:', JSON.stringify(event, null, 2));
  }

  // Implement any additional logic for unhandled events here
}

// Function to retrieve price ID from subscription
async function sessionPriceIdFromSession(subscriptionId: string): Promise<string | null> {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription.items && subscription.items.data.length > 0) {
      return subscription.items.data[0].price?.id || null;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving subscription from Stripe:', error);
    return null;
  }
}

// Helper function to get customer UUID from Stripe Customer ID
async function getCustomerUUID(stripeCustomerId: string): Promise<string | null> {
  const { data: customerRecord, error: customerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  if (customerError) {
    if (customerError.code === 'PGRST116') { // Row not found
      console.warn(`No customer found with Stripe Customer ID: ${stripeCustomerId}`);
      return null;
    } else {
      console.error('Error fetching customer record:', customerError.message);
      throw new Error('Failed to fetch customer record.');
    }
  }

  return customerRecord.id;
}
