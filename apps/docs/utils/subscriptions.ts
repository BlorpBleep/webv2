// File: utils/subscriptions.ts

import { stripe } from '@/utils/stripeClient';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { Database } from '@/types/supabase';

/**
 * Provisions subscription information in Supabase from webhook events.
 * @param subscription - The Stripe Subscription object.
 * @param userId - The ID of the user.
 */
export async function provisionSubscriptionFromWebhook(subscription: any, userId: string) {
  try {
    const priceId = subscription.items.data[0]?.price.id || null;

    if (priceId) {
      const priceExists = await ensurePriceExists(priceId);

      if (!priceExists) {
        throw new Error(`Price ID ${priceId} does not exist in Supabase after synchronization.`);
      }
    }

    const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] = {
      id: subscription.id,
      user_id: userId,
      status: subscription.status as Database['public']['Enums']['subscription_status'],
      metadata: subscription.metadata || null,
      price_id: subscription.items.data[0]?.price.id || null,
      quantity: subscription.items.data[0]?.quantity || 1,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
      created: new Date(subscription.created * 1000).toISOString(),
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      ended_at: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
      cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
      canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
      trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
      trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
      stripe_subscription_id: subscription.id,
      amount: subscription.amount_total || null,
      currency: subscription.currency || null,
      description: subscription.description || null,
    };

    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .upsert(subscriptionData, { onConflict: 'id' });

    if (error) {
      console.error(`Failed to upsert subscription data: ${error.message}`);
    } else {
      console.log(`Successfully upserted subscription ${subscription.id}.`);
    }
  } catch (error) {
    console.error('Error provisioning subscription from webhook:', error);
  }
}

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