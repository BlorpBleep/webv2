import { stripe } from '@/utils/stripeClient'; // Centralized Stripe instance
import { supabaseAdmin, getUserByEmail, createUser } from '@/utils/supabaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '@/types/supabase'; // Import the generated Database type

// Define TypeScript type aliases using Supabase's Database type
type CustomerRecord = Database['public']['Tables']['customers']['Row'];

// Handle 'checkout.session.completed' event
async function handleCheckoutCompleted(session: any) {
  const customerEmail = session.customer_email ?? session.customer_details?.email ?? null;
  const fullName = session.customer_details?.name ?? null;

  console.log(`Processing checkout.session.completed for email: ${customerEmail}`);

  if (!customerEmail) {
    console.warn('No customer email found in checkout.session.completed event.');
    return; // Exit early since email is essential
  }

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(customerEmail);

    if (existingUser) {
      console.log(`User already exists in auth.users: ${existingUser.id}`);
      // Update user information if needed
      await syncPublicUser(existingUser.id, customerEmail, fullName);
    } else {
      // If user does not exist, provision the new user
      const newPassword = uuidv4(); // Generate a new UUID for the password
      console.log(`Creating new user with email: ${customerEmail}`);
      const newUser = await createUser(customerEmail, newPassword);

      if (newUser) {
        console.log(`New user created: ${newUser.id}`);
        // Sync the new user profile
        await syncPublicUser(newUser.id, customerEmail, fullName);
      } else {
        console.error('Failed to create a new user.');
      }
    }
  } catch (error) {
    console.error('Error processing checkout.session.completed:', error);
  }
}

// Handle other (unhandled) events
async function handleUnhandledEvent(event: any) {
  console.warn(`Unhandled event type: ${event.type}`);
}

// Sync user data to public.users table
async function syncPublicUser(userId: string, email: string | null, fullName: string | null) {
  if (!email) {
    console.warn(`Cannot sync public user without email for user ID: ${userId}`);
    return;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users') // Ensure this matches your Supabase table
      .upsert(
        { id: userId, email: email, full_name: fullName },
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

// Export the event handler function
export async function handleWebhookEvent(event: any) {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object);
      break;
    // Add additional cases for other events as needed
    default:
      await handleUnhandledEvent(event);
      break;
  }
}