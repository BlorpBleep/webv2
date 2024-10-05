// File: handlers/webhookHandler.ts

import { stripe } from '@/utils/stripeClient'; // Centralized Stripe instance
import { supabaseAdmin, getUserByEmail, createUser } from '@/utils/supabaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '@/types/supabase'; // Import the generated Database type
import { provisionSubscription } from './subscriptionHandler'; // Import the provisionSubscription function
import { manageAccount } from './accountHandler'; // Import manageAccount function
import { sendReceiptEmail, sendEmailNotification } from '@/app/api/webhooks/stripe/utils/emailUtils'; // Import the new email function
import { createAndAssignVoucher } from './voucherHandler'; // Import the voucher handler
import { syncStripeProductsAndPrices } from './priceSyncHandler';
import { provisionSubscriptionFromWebhook } from '@/utils/subscriptions'; // Import provisionSubscriptionFromWebhook function
import { syncPublicUser } from '@/utils/userUtils'; // Import syncPublicUser function
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Handles Stripe webhook events.
 * @param event - The Stripe event object.
 */
export async function handleWebhookEvent(event: any) {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'charge.succeeded':
      await handleChargeSucceeded(event.data.object);
      break;
    case 'price.created':
      await handlePriceCreated(event.data.object);
      break;
    case 'price.updated':
      await handlePriceUpdated(event.data.object);
      break;
    case 'product.created':
      await handleProductCreated(event.data.object);
      break;
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object);
      break;
    // Add additional cases for other events as needed
    default:
      await handleUnhandledEvent(event);
      break;
  }
}

/**
 * Handles 'checkout.session.completed' event.
 * @param session - The Stripe Checkout session object.
 */
async function handleCheckoutCompleted(session: any) {
  console.log('>>> Raw session data received from Stripe:', JSON.stringify(session, null, 2));

  const customerEmail = session.customer_email ?? session.customer_details?.email ?? null;
  const fullName = session.customer_details?.name ?? null;
  const subscriptionId = session.subscription ?? null;

  console.log(`>>> Processing checkout.session.completed for email: ${customerEmail}`);

  if (!customerEmail) {
    console.warn('No customer email found in checkout.session.completed event.');
    return; // Exit early since email is essential
  }

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(customerEmail);

    let userId: string | undefined;

    if (existingUser) {
      console.log(`User already exists in auth.users: ${existingUser.id}`);
      userId = existingUser.id;
      // Update user information if needed
      await syncPublicUser(existingUser.id, customerEmail, fullName);
    } else {
      // If user does not exist, provision the new user
      const newPassword = uuidv4();
      console.log(`Creating new user with email: ${customerEmail}`);
      const newUser = await createUser(customerEmail, newPassword);

      if (newUser) {
        console.log(`New user created: ${newUser.id}`);
        userId = newUser.id;
        // Sync the new user profile
        await syncPublicUser(newUser.id, customerEmail, fullName);
      } else {
        console.error('Failed to create a new user.');
        return;
      }
    }

    if (!userId) {
      console.error('User ID is undefined after user provisioning.');
      return;
    }

    // Manage account for the user
    await manageAccount(userId);

    // Provision the subscription based on the session
    await provisionSubscription(session, userId, subscriptionId);

    // Extract durationMonths from subscription or session metadata
    let durationMonths: number = 1;

    if (subscriptionId) {
      // Fetch the subscription from Stripe to get interval_count
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const price = subscription.items.data[0]?.price;

      if (price && price.recurring) {
        const interval = price.recurring.interval;
        const intervalCount = price.recurring.interval_count || 1;

        if (interval === 'month') {
          durationMonths = intervalCount;
        } else if (interval === 'year') {
          durationMonths = intervalCount * 12;
        }
      }
    } else {
      if (session.metadata && session.metadata.duration_months) {
        const parsedDuration = parseInt(session.metadata.duration_months, 10);
        durationMonths = isNaN(parsedDuration) ? 1 : parsedDuration;
      }
    }

    // Create and assign the voucher
    await createAndAssignVoucher(userId, durationMonths, subscriptionId);

  } catch (error) {
    console.error('Error processing checkout.session.completed:', error);
  }
}

/**
 * Handles 'charge.succeeded' event.
 * @param charge - The Stripe Charge object.
 */
async function handleChargeSucceeded(charge: any) {
  console.log('>>> Processing charge.succeeded event.');

  const receiptUrl = charge.receipt_url;
  const customerEmail = charge.receipt_email || charge.billing_details?.email;

  if (!customerEmail) {
    console.warn('No customer email found in charge.succeeded event.');
    return;
  }

  if (!receiptUrl) {
    console.warn('No receipt URL found in charge.succeeded event.');
    return;
  }

  try {
    // Send the receipt email
    await sendReceiptEmail(customerEmail, receiptUrl);
    console.log(`>>> Receipt email sent to ${customerEmail}`);
  } catch (error) {
    console.error('Error sending receipt email:', error);
  }
}

/**
 * Handles 'price.created' event.
 * @param price - The Stripe Price object.
 */
async function handlePriceCreated(price: any) {
  console.log('>>> Processing price.created event.');

  const { data, error } = await supabaseAdmin
    .from('prices')
    .upsert({
      id: price.id,
      product_id: price.product,
      active: price.active,
      description: price.description || null,
      unit_amount: price.unit_amount || null,
      currency: price.currency || null,
      type: price.type,
      interval: price.recurring?.interval || null,
      interval_count: price.recurring?.interval_count || null,
      trial_period_days: price.recurring?.trial_period_days || null,
      metadata: price.metadata || {},
    })
    .eq('id', price.id);

  if (error) {
    console.error(`Failed to upsert price ${price.id}:`, error.message);
  } else {
    console.log(`Price ${price.id} synchronized successfully.`);
  }
}

/**
 * Handles 'price.updated' event.
 * @param price - The Stripe Price object.
 */
async function handlePriceUpdated(price: any) {
  console.log('>>> Processing price.updated event.');

  const { data, error } = await supabaseAdmin
    .from('prices')
    .upsert({
      id: price.id,
      product_id: price.product,
      active: price.active,
      description: price.description || null,
      unit_amount: price.unit_amount || null,
      currency: price.currency || null,
      type: price.type,
      interval: price.recurring?.interval || null,
      interval_count: price.recurring?.interval_count || null,
      trial_period_days: price.recurring?.trial_period_days || null,
      metadata: price.metadata || {},
    })
    .eq('id', price.id);

  if (error) {
    console.error(`Failed to upsert price ${price.id}:`, error.message);
  } else {
    console.log(`Price ${price.id} updated successfully.`);
  }
}

/**
 * Handles 'product.created' event.
 * @param product - The Stripe Product object.
 */
async function handleProductCreated(product: any) {
  console.log('>>> Processing product.created event.');

  const { data, error } = await supabaseAdmin
    .from('products')
    .upsert({
      id: product.id,
      active: product.active,
      description: product.description || null,
      EAN: product.metadata.EAN || null, // Assuming EAN is stored in metadata
      image: product.images && product.images.length > 0 ? product.images[0] : null,
      ltr_order: product.metadata.ltr_order ? parseInt(product.metadata.ltr_order, 10) : null,
      metadata: product.metadata || {},
      name: product.name || null,
    })
    .eq('id', product.id);

  if (error) {
    console.error(`Failed to upsert product ${product.id}:`, error.message);
  } else {
    console.log(`Product ${product.id} synchronized successfully.`);
  }
}

/**
 * Handles 'customer.subscription.created' event.
 * @param subscription - The Stripe Subscription object.
 */
async function handleSubscriptionCreated(subscription: any) {
  console.log('>>> Processing customer.subscription.created event.');

  // Ensure the subscription is provisioned
  const userId = await getUserIdFromSubscription(subscription);

  if (!userId) {
    console.error(`User ID not found for subscription ${subscription.id}.`);
    return;
  }

  // Provision the subscription
  await provisionSubscriptionFromWebhook(subscription, userId);
}

/**
 * Handles 'customer.subscription.updated' event.
 * @param subscription - The Stripe Subscription object.
 */
async function handleSubscriptionUpdated(subscription: any) {
  console.log('>>> Processing customer.subscription.updated event.');

  // Ensure the subscription is provisioned/updated
  const userId = await getUserIdFromSubscription(subscription);

  if (!userId) {
    console.error(`User ID not found for subscription ${subscription.id}.`);
    return;
  }

  // Provision the subscription
  await provisionSubscriptionFromWebhook(subscription, userId);
}

/**
 * Handles 'invoice.payment_succeeded' event.
 * @param invoice - The Stripe Invoice object.
 */
async function handleInvoicePaymentSucceeded(invoice: any) {
  console.log('>>> Processing invoice.payment_succeeded event.');

  const subscriptionId = invoice.subscription;

  if (!subscriptionId) {
    console.warn('No subscription ID found in invoice.');
    return;
  }

  // Retrieve the subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (!subscription) {
    console.error(`Subscription ${subscriptionId} not found.`);
    return;
  }

  const userId = await getUserIdFromSubscription(subscription);

  if (!userId) {
    console.error(`User ID not found for subscription ${subscriptionId}.`);
    return;
  }

  // Extract durationMonths from subscription's price
  const price = subscription.items.data[0]?.price;
  const interval = price?.recurring?.interval;
  const intervalCount = price?.recurring?.interval_count;

  let durationMonths: number = 1; // Default duration

  if (interval === 'month') {
    durationMonths = intervalCount || 1;
  } else if (interval === 'year') {
    durationMonths = (intervalCount || 1) * 12;
  }

  if (durationMonths) {
    try {
      await createAndAssignVoucher(userId, durationMonths, subscriptionId);
      console.log(`>>> Voucher created and assigned for user ID: ${userId}`);
    } catch (error) {
      console.error('Error creating and assigning voucher:', error);
    }
  } else {
    console.warn('Duration months could not be determined. Voucher not created.');
  }
}

/**
 * Handles unhandled events.
 * @param event - The Stripe event object.
 */
async function handleUnhandledEvent(event: any) {
  console.warn(`Unhandled event type: ${event.type}`);
  return; // Added return to resolve TS error
}

/**
 * Retrieves the user ID associated with a subscription.
 * @param subscription - The Stripe subscription object.
 * @returns The user ID or null.
 */
async function getUserIdFromSubscription(subscription: any): Promise<string | null> {
  const customerId = subscription.customer;

  if (!customerId) {
    console.warn('No customer ID found in subscription.');
    return null;
  }

  // Fetch the customer record from Supabase
  const { data: customer, error } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (error) {
    console.error(`Error fetching customer with Stripe ID ${customerId}:`, error.message);
    return null;
  }

  return customer ? customer.id : null;
}