// File: apps/api/webhooks/stripe/handlers/subscriptionUtils.ts

import Stripe from 'stripe'; // Add this import
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { calculateNewExpiry } from '@/utils/expiryDateCalculator';

// Insert subscription into 'subscriptions' table
export async function insertSubscription(
  stripeSubscriptionId: string | null, 
  userId: string, 
  accountNumber: string, 
  paymentIntentId: string, 
  isOneTimePurchase: boolean
) {
  console.log(`Inserting subscription${isOneTimePurchase ? ' (OTP)' : ''}:`, stripeSubscriptionId || 'N/A');

  const validStatuses = ['active', 'canceled', 'incomplete_expired', 'one_time_purchase'];
  const subscriptionStatus = isOneTimePurchase ? 'one_time_purchase' : 'active';

  if (!validStatuses.includes(subscriptionStatus)) {
    console.error(`Invalid subscription status: ${subscriptionStatus}`);
    throw new Error(`Invalid subscription status: ${subscriptionStatus}`);
  }

  const internalSubscriptionId = uuidv4();
  const priceId = stripeSubscriptionId ? await sessionPriceIdFromSession(stripeSubscriptionId) : null;

  const subscriptionData = {
    id: internalSubscriptionId,
    stripe_subscription_id: stripeSubscriptionId, 
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

// Function to retrieve price ID from subscription
export async function sessionPriceIdFromSession(subscriptionId: string): Promise<string | null> {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });
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
