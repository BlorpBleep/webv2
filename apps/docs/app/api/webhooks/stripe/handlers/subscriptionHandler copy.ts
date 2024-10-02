// File: subscriptionHandler.ts

import { stripe } from '@/utils/stripeClient'; // Centralized Stripe instance
import { supabaseAdmin } from '@/utils/supabaseAdmin'; // Supabase client
import { Database } from '@/types/supabase'; // Import the generated Database type

// Example of making fields optional
type SubscriptionRecord = {
  id: string;
  user_id: string;
  status: string; // Adjust based on your enum
  metadata?: any; // Make optional
  price_id?: string | null; // Make optional
  quantity?: number | null; // Make optional
  cancel_at_period_end?: boolean | null; // Make optional
  created: string; // Required
  current_period_start?: string; // Make optional
  current_period_end?: string | null; // Make optional
  ended_at?: string | null; // Make optional
  cancel_at?: string | null; // Make optional
  canceled_at?: string | null; // Make optional
  trial_start?: string | null; // Make optional
  trial_end?: string | null; // Make optional
  stripe_subscription_id?: string | null; // Make optional
  amount?: number | null; // Ensure this is present and optional
  currency?: string | null; // Make optional
  description?: string | null; // Make optional
};

// Provision subscription information in Supabase
export async function provisionSubscription(session: any, userId: string) {
  console.log(`>>> Provisioning subscription for session ID: ${session.id}`);

  const amountTotal = session.amount_total; // Amount for one-time payment
  const subscriptionId = session.subscription; // Subscription ID

  try {
    // Check if this is a one-time payment (OTP)
    if (amountTotal > 0 && !subscriptionId) {
      console.log(`>>> Detected one-time payment (OTP). Amount Total: ${amountTotal}`);
      await createOneTimePaymentSubscription(session);
    } else if (subscriptionId) {
      // For subscriptions, retrieve subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log(`>>> Retrieved subscription from Stripe:`, subscription);
      
      // Prepare subscription data for insertion into Supabase
      const subscriptionData: SubscriptionRecord = {
        id: subscription.id, // Stripe subscription ID
        user_id: session.customer_details.email as string, // Ensure this is a string
        status: subscription.status as any, // Cast to correct enum type
        price_id: subscription.items.data[0]?.price.id || null,
        quantity: subscription.items.data[0]?.quantity || 1,
        // Comment out unnecessary fields for now
        cancel_at_period_end: subscription.cancel_at_period_end || false,
        created: new Date(subscription.created * 1000).toISOString(), // Creation time
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(), // Current period start
        current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null, // End time if available
        ended_at: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
        cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
        trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        stripe_subscription_id: subscription.id,
        amount: amountTotal, // Capture the total amount
        currency: session.currency || null, // Set currency based on session data
        description: null // Optional description field
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




// Create a one-time payment subscription in Supabase
async function createOneTimePaymentSubscription(session) {
  try {
    const otpSubscriptionData: SubscriptionRecord = {
      id: session.id || `otp_${Date.now()}`, // Generate a temporary ID if not provided
      user_id: session.customer_details.email as string, // Fetch the user ID based on the customer email
      status: 'one_time_purchase', // Status for one-time purchases
      metadata: session.metadata || null,
      price_id: null, // No price ID for OTP
      quantity: 1, // Quantity for one-time purchase
      cancel_at_period_end: false,
      created: new Date(session.created * 1000).toISOString(), // Start at creation time
      current_period_start: new Date(session.created * 1000).toISOString(), // Start at creation time
      ended_at: null,
      cancel_at: null,
      canceled_at: null,
      trial_start: null,
      trial_end: null,
      stripe_subscription_id: null, // No Stripe subscription ID for OTP
      amount: session.amount_total || 0, // Use the amount total from the session
      currency: session.currency || null, // Set currency based on session data
      description: null // Optional description field
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
