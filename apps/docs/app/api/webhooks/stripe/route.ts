// File: apps/docs/app/api/webhooks/stripe/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin, getUserByEmail } from '@/utils/supabaseAdmin';
import { generateVoucherCode } from '@/utils/voucherCodeGenerator';
import { generateAccountNumber } from '@/utils/accountNumberGenerator';
import { calculateNewExpiry } from '@/utils/expiryDateCalculator';
import nodemailer from 'nodemailer';

const isProduction = process.env.NODE_ENV === 'production'; // Adjust this for your environment in the .env file or set the var in vercel

const stripeSecretKey = isProduction 
  ? process.env.STRIPE_LIVE_SECRET_KEY! 
  : process.env.STRIPE_TEST_SECRET_KEY!;

const stripeWebhookSecret = isProduction 
  ? process.env.STRIPE_LIVE_WEBHOOK_SECRET! 
  : process.env.STRIPE_TEST_WEBHOOK_SECRET!;

// Initialize Stripe with your Secret Key
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20', // Ensure this matches your Stripe API version
});

console.log('Stripe Secret Key:', stripeSecretKey);
console.log('Stripe Webhook Secret:', stripeWebhookSecret);

// Specify the runtime to use Node.js
export const runtime = 'nodejs';

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info@cicadavpn.com',
    pass: process.env.EMAIL_PASSWORD, // Store the email password securely
  },
});

/**
 * Helper function to convert ReadableStream to Buffer
 * @param readableStream - The request body as a ReadableStream
 * @returns Buffer containing the raw request body
 */
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

  return Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
}

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = stripeWebhookSecret;

  if (!signature || !webhookSecret) {
    console.error('Missing Stripe signature or webhook secret.');
    return NextResponse.json({ error: 'Missing Stripe signature or webhook secret.' }, { status: 400 });
  }

  let event: Stripe.Event;
  let rawBody: Buffer | null = null;

  try {
    if (!req.body) {
      throw new Error('Request body is null');
    }

    rawBody = await buffer(req.body as ReadableStream<Uint8Array>);

    // Log the raw body and signature for debugging
    console.log('Raw Body:', rawBody.toString());
    console.log('Received Signature:', signature);

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    console.log('Webhook signature verified.');
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    console.error('Raw Body at failure:', rawBody ? rawBody.toString() : 'No raw body available');
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Handle successful checkout session
 * @param {Stripe.Checkout.Session} session - Stripe Checkout Session object
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Log the entire session for debugging
  console.log('Session data:', JSON.stringify(session, null, 2));

  const customerEmail = session.customer_email || session.customer_details?.email;
  const paymentIntentId = session.payment_intent;

  if (!customerEmail) {
    console.error('No customer email found in session.');
    return;
  }

  try {
    let userId: string | null = null;

    // Fetch user by email
    const user = await getUserByEmail(customerEmail);

    if (!user) {
      console.error('User not found with email:', customerEmail);
      const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email: customerEmail,
        email_confirm: true,
      });

      if (createUserError) {
        console.error('Error creating user:', createUserError.message);
        return;
      }

      userId = newUser.user.id;
      console.log('Auth user created:', newUser.user);
    } else {
      userId = user.id;
      console.log('Auth user found:', user);
    }

    if (!userId) {
      console.error('User ID is null.');
      return;
    }

    // Retrieve or create account for the user
    const { data: account, error: accountError } = await supabaseAdmin
      .from('accounts')
      .select('id, account_number, expiry')
      .eq('user_id', userId)
      .single();

    let accountNumber: string;
    let newExpiryDate: string;

    if (accountError || !account) {
      console.error(`Account not found for user ID ${userId}. Creating a new account.`);
      accountNumber = generateAccountNumber();
      newExpiryDate = calculateNewExpiry(null, 1); // For a one-time purchase, set duration to 1 month

      const { data: newAccount, error: createAccountError } = await supabaseAdmin
        .from('accounts')
        .insert({
          account_number: accountNumber,
          user_id: userId,
          expiry: newExpiryDate,
        })
        .select()
        .single();

      if (createAccountError || !newAccount) {
        console.error('Error creating account:', createAccountError?.message);
        return;
      }

      console.log('Account created:', newAccount);
    } else {
      accountNumber = account.account_number;
      console.log('Existing account found:', account);
    }

    // Handle payment intent from session
    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(String(paymentIntentId));

      if (paymentIntent) {
        console.log('Payment Intent:', JSON.stringify(paymentIntent, null, 2));
        const priceId = paymentIntent.amount === 50 ? 'price_1Q1mJVGUjDHrefXG1KqGN4a9' : 'unknown';
        console.log('Price ID:', priceId);

        const subscriptionId = session.subscription ? String(session.subscription) : null;

        // Create or update a voucher based on the payment
        await createOrUpdateVoucher(accountNumber, 1, subscriptionId);

        // Send email notification
        await sendEmailNotification(customerEmail, session);
      } else {
        console.error('Payment intent not found.');
      }
    } else {
      console.error('No payment intent ID found in session.');
    }
  } catch (error) {
    console.error('Error handling checkout session:', error);
  }
}

/**
 * Create or update voucher
 * @param {string} accountNumber - Account Number from accounts table
 * @param {number} durationMonths - Duration of the voucher in months
 * @param {string | null} subscriptionId - Optional subscription ID
 */
async function createOrUpdateVoucher(accountNumber: string, durationMonths: number, subscriptionId?: string | null) {
  const maxRetries = 5;
  let attempt = 0;
  let voucherCreated = false;

  while (attempt < maxRetries && !voucherCreated) {
    try {
      const voucherCode = generateVoucherCode();

      const voucherData = {
        associated_account: accountNumber,
        duration_months: durationMonths,
        is_used: false,
        code: voucherCode,
        subscription_id: subscriptionId || null,
      };

      const { data, error } = await supabaseAdmin
        .from('vouchers')
        .insert(voucherData);

      if (error) {
        if (error.code === '23505' && error.details?.includes('vouchers_code_key')) {
          console.warn(`Duplicate voucher code generated: ${voucherCode}. Retrying...`);
          attempt++;
          continue;
        } else {
          throw error;
        }
      }

      console.log('Voucher created:', data);
      voucherCreated = true;
    } catch (error) {
      console.error('Error creating/updating voucher:', (error as Error).message);
      attempt++;
      if (attempt >= maxRetries) {
        console.error('Max retries reached. Failed to create voucher.');
      }
    }
  }
}

/**
 * Send an email notification
 * @param {string} recipient - The recipient's email address
 * @param {Stripe.Checkout.Session} session - The Stripe session object
 */
async function sendEmailNotification(recipient: string, session: Stripe.Checkout.Session) {
  const mailOptions = {
    from: 'info@cicadavpn.com',
    to: recipient,
    subject: 'Checkout Session Completed',
    text: `Thank you for your purchase! Your session ID is ${session.id}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', recipient);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}