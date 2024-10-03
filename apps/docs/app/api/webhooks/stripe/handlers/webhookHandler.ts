// File: handlers/webhookHandler.ts

import { stripe } from '@/utils/stripeClient'; // Centralized Stripe instance
import { supabaseAdmin, getUserByEmail, createUser } from '@/utils/supabaseAdmin'; 
import { v4 as uuidv4 } from 'uuid';
import { Database } from '@/types/supabase'; // Import the generated Database type
import { provisionSubscription } from './subscriptionHandler'; // Import the provisionSubscription function
import { manageAccount } from './accountHandler'; // Import manageAccount function
import { sendReceiptEmail } from '@/app/api/webhooks/stripe/utils/emailUtils'; // Import the new email function

// Define TypeScript type aliases using Supabase's Database type
type CustomerRecord = Database['public']['Tables']['customers']['Row'];

// Handle 'checkout.session.completed' event
async function handleCheckoutCompleted(session) {
  // Log the raw session data received from Stripe for debugging
  console.log('>>> Raw session data received from Stripe:', JSON.stringify(session, null, 2));

  const customerEmail = session.customer_email ?? session.customer_details?.email ?? null;
  const fullName = session.customer_details?.name ?? null; 
  const profilePicUrl = session.customer_details?.image ?? null; // Assuming image is the field for profile picture

  console.log(`>>> Processing checkout.session.completed for email: ${customerEmail}`);

  if (!customerEmail) {
    console.warn('No customer email found in checkout.session.completed event.');
    return; // Exit early since email is essential
  }

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(customerEmail);

    let userId: string | undefined; // Initialize userId

    if (existingUser) {
      console.log(`User already exists in auth.users: ${existingUser.id}`);
      userId = existingUser.id; // Store userId for later use
      // Update user information if needed, including profile picture
      await syncPublicUser(existingUser.id, customerEmail, fullName, profilePicUrl);
    } else {
      // If user does not exist, provision the new user
      const newPassword = uuidv4(); // Generate a new UUID for the password
      console.log(`Creating new user with email: ${customerEmail}`);
      const newUser = await createUser(customerEmail, newPassword);

      if (newUser) {
        console.log(`New user created: ${newUser.id}`);
        userId = newUser.id; // Store userId for later use
        // Sync the new user profile
        await syncPublicUser(newUser.id, customerEmail, fullName, profilePicUrl);
      } else {
        console.error('Failed to create a new user.');
        return; // Exit if user creation fails
      }
    }

    // Manage account for the user
    await manageAccount(userId); // Ensure the account is created or verified

    // Now provision the subscription based on the session
    await provisionSubscription(session, userId); // Pass both session and userId

  } catch (error) {
    console.error('Error processing checkout.session.completed:', error);
  }
}

// Handle other (unhandled) events
async function handleUnhandledEvent(event) {
  console.warn(`Unhandled event type: ${event.type}`);
}

// Sync user data to public.users table
async function syncPublicUser(userId: string, email: string | null, fullName: string | null, profilePicUrl: string | null) {
  if (!email) {
    console.warn(`Cannot sync public user without email for user ID: ${userId}`);
    return;
  }

  try {
    console.log(`>>> Upserting user profile in 'users' table for user ID: ${userId}`);
    const { data, error } = await supabaseAdmin
      .from('users') // Ensure this matches your Supabase table
      .upsert(
        { id: userId, email: email, full_name: fullName, avatar_url: profilePicUrl }, // Include profilePicUrl
        { onConflict: 'id' } // Ensure no duplicate entries
      );

    if (error) {
      console.error(`Failed to sync user profile for user ID ${userId}: ${error.message}`);
    } else {
      console.log(`User profile synced successfully for user ID: ${userId}.`);
    }
  } catch (error) {
    console.error(`Error in syncPublicUser for user ID ${userId}:`, error);
  }
}

// Handle 'charge.succeeded' event
async function handleChargeSucceeded(charge) {
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

// Export the event handler function
export async function handleWebhookEvent(event) {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    case 'charge.succeeded':
      await handleChargeSucceeded(event.data.object);
      break;
    // Add additional cases for other events as needed
    default:
      await handleUnhandledEvent(event);
      break;
  }
}