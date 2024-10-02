// File: utils/stripeClient.ts

import Stripe from 'stripe';

// Determine if the environment is production
const isProduction = process.env.NODE_ENV === 'production';

// Select the appropriate Stripe Secret Key
const stripeSecretKey = isProduction
  ? process.env.STRIPE_LIVE_SECRET_KEY!
  : process.env.STRIPE_TEST_SECRET_KEY!;

console.log(`Initializing Stripe in ${isProduction ? 'Live' : 'Test'} mode.`);

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
});

export { stripe, isProduction };