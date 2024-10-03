import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleCheckoutCompleted } from './handlers/checkoutSessionHandler';
import { handlePaymentIntentCreated, handlePaymentIntentSucceeded } from './handlers/paymentHandlers';
import { handleChargeSucceeded } from './handlers/chargeHandler';
import { checkStatus } from '@/utils/checkStatus';

// Ensure all required environment variables are set
const requiredEnvVars = [
  'NODE_ENV',
  'STRIPE_LIVE_SECRET_KEY',
  'STRIPE_TEST_SECRET_KEY',
  'STRIPE_LIVE_WEBHOOK_SECRET',
  'STRIPE_TEST_WEBHOOK_SECRET',
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
console.log('Stripe environment:', isProduction ? 'Production' : 'Test');
console.log('Using Stripe Secret Key:', stripeSecretKey);

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
    console.log('Handling event of type:', event.type);
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Calling handleCheckoutCompleted...');
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'payment_intent.created':
        console.log('Calling handlePaymentIntentCreated...');
        await handlePaymentIntentCreated(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.succeeded':
        console.log('Calling handlePaymentIntentSucceeded...');
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'charge.succeeded':
        console.log('Calling handleChargeSucceeded...');
        await handleChargeSucceeded(event.data.object as Stripe.Charge);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
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
