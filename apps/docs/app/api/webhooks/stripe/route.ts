// File: app/api/webhooks/stripe/route.ts

import { NextResponse } from 'next/server';
import { handleWebhookEvent } from '@/app/api/webhooks/stripe/handlers/webhookHandler';
import { stripe, isProduction } from '@/utils/stripeClient';
import type { NextRequest } from 'next/server';

// Webhook handler
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing Stripe signature.');
    return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });
  }

  // Select the appropriate webhook secret based on the environment
  const webhookSecret = isProduction
    ? process.env.STRIPE_LIVE_WEBHOOK_SECRET!
    : process.env.STRIPE_TEST_WEBHOOK_SECRET!;

  let event;

  try {
    const body = await req.text(); // Retrieve the raw request body
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`Webhook signature verified. Event ID: ${event.id}`);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    await handleWebhookEvent(event);
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(`⚠️  Error handling webhook event: ${error instanceof Error ? error.message : error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}