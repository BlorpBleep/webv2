// File: handlers/subscriptionHandler.ts

import { stripe } from '@/utils/stripeClient';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { Database } from '@/types/supabase';

export type SubscriptionRecord = {
  id: string;
  user_id: string;
  status: string;
  metadata?: any;
  price_id?: string | null;
  quantity?: number | null;
  cancel_at_period_end?: boolean | null;
  created: string;
  current_period_start?: string;
  current_period_end?: string | null;
  ended_at?: string | null;
  cancel_at?: string | null;
  canceled_at?: string | null;
  trial_start?: string | null;
  trial_end?: string | null;
  stripe_subscription_id?: string | null;
  amount?: number | null;
  currency?: string | null;
  description?: string | null;
};

/**
 * Ensures that a specific price exists in Supabase. If not, fetches it from Stripe and inserts it.
 * @param priceId - The Stripe price ID.
 * @returns A boolean indicating whether the price exists after the function executes.
 */
async function ensurePriceExists(priceId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('prices')
    .select('id')
    .eq('id', priceId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // Price not found
      console.log(`Price ID ${priceId} not found in Supabase. Fetching from Stripe...`);
      try {
        const price = await stripe.prices.retrieve(priceId);
        const supabasePrice: Database['public']['Tables']['prices']['Insert'] = {
          id: price.id,
          active: price.active,
          currency: price.currency,
          interval: price.recurring?.interval || null,
          interval_count: price.recurring?.interval_count || null,
          metadata: price.metadata || {},
          product_id: price.product as string,
          trial_period_days: price.recurring?.trial_period_days || null,
          type: price.type as Database['public']['Enums']['pricing_type'],
          unit_amount: price.unit_amount || null,
        };

        const { data: insertedData, error: insertError } = await supabaseAdmin
          .from('prices')
          .insert([supabasePrice]);

        if (insertError) {
          console.error(`Failed to insert price ${priceId} into Supabase:`, insertError.message);
          return false;
        }

        console.log(`Price ${priceId} inserted into Supabase successfully.`);
        return true;
      } catch (stripeError) {
        console.error(`Error fetching price ${priceId} from Stripe:`, stripeError);
        return false;
      }
    } else {
      console.error(`Error fetching price ${priceId} from Supabase:`, error.message);
      return false;
    }
  }

  // Price exists
  return true;
}

/**
 * Provisions subscription information in Supabase.
 * @param session - The Stripe Checkout session object.
 * @param userId - The ID of the user in your system.
 */
export async function provisionSubscription(session: any, userId: string, subscriptionId: string | null) {
  console.log(`>>> Provisioning subscription for session ID: ${session.id}`);

  const amountTotal = session.amount_total;
  const subscriptionValue = session.subscription;

  try {
    // If amount is greater than 0 and there's no subscription, it's a one-time payment (OTP)
    if (amountTotal > 0 && !subscriptionValue) {
      console.log(`>>> Detected one-time payment (OTP). Amount Total: ${amountTotal}`);
      await createOneTimePaymentSubscription(session, userId);
    } else if (subscriptionValue) {
      // If there's a subscription value, fetch the subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(subscriptionValue);
      console.log(`>>> Retrieved subscription from Stripe:`, subscription);

      const priceId = subscription.items.data[0]?.price.id || null;
      const description = subscription.items.data[0]?.price.product?.description || null; // Fetch description

      if (priceId) {
        // Ensure that the price exists in Supabase, if not, insert it
        const priceExists = await ensurePriceExists(priceId);
        if (!priceExists) {
          throw new Error(`Price ID ${priceId} does not exist in Supabase after synchronization.`);
        }
      }

      // Prepare the subscription data to be inserted into Supabase
      const subscriptionData: SubscriptionRecord = {
        id: subscriptionValue, // Use the subscription value as the ID
        user_id: userId,
        status: subscription.status as any,
        metadata: subscription.metadata || null,
        price_id: subscription.items.data[0]?.price.id || null,
        quantity: subscription.items.data[0]?.quantity || 1,
        cancel_at_period_end: subscription.cancel_at_period_end || false,
        created: new Date(subscription.created * 1000).toISOString(),
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null,
        ended_at: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
        cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
        trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        stripe_subscription_id: subscription.id,
        amount: amountTotal || null,
        currency: session.currency || null,
        description: description || "Subscription", // Insert description if available, otherwise default to "Subscription"
      };

      console.log(`>>> Inserting subscription data into Supabase:`, subscriptionData);
      const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .insert([subscriptionData]);

      if (error) {
        console.error(`Failed to insert subscription data: ${error.message}`);
      } else {
        console.log(`Successfully inserted subscription ${subscription.id}.`);
      }
    } else {
      console.warn(`No valid subscription ID found, skipping provisioning.`);
    }
  } catch (error) {
    console.error('Error provisioning subscription:', error);
  }
}

/**
 * Creates a one-time payment subscription in Supabase.
 * @param session - The Stripe Checkout session object.
 * @param userId - The ID of the user in your system.
 */
async function createOneTimePaymentSubscription(session: any, userId: string) {
  try {
    // Prepare the data for the one-time payment subscription to be inserted into Supabase
    const otpSubscriptionData: SubscriptionRecord = {
      id: session.subscription || `otp_${Date.now()}`, // Use subscription value if available, otherwise generate a temporary ID
      user_id: userId, // Use the retrieved user ID
      status: 'one_time_purchase', // Status for one-time purchases
      metadata: session.metadata || null,
      price_id: null, // No price ID for OTP
      quantity: 1, // Quantity for one-time purchase
      cancel_at_period_end: false,
      created: new Date(session.created * 1000).toISOString(),
      current_period_start: new Date(session.created * 1000).toISOString(),
      current_period_end: null, // No specific end for OTP
      ended_at: null,
      cancel_at: null,
      canceled_at: null,
      trial_start: null,
      trial_end: null,
      stripe_subscription_id: null, // No Stripe subscription ID for OTP
      amount: session.amount_total || 0, // Use the amount total from the session
      currency: session.currency || null, // Set currency based on session data
      description: session.metadata?.description || "One-time purchase", // Use description from metadata or fallback
    };

    console.log(`>>> Inserting one-time payment subscription data into Supabase:`, otpSubscriptionData);
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .insert([otpSubscriptionData]);

    if (error) {
      console.error(`Failed to insert one-time payment subscription: ${error.message}`);
    } else {
      console.log(`Successfully inserted one-time payment subscription.`);
    }
  } catch (error) {
    console.error('Error creating one-time payment subscription:', error);
  }
}
