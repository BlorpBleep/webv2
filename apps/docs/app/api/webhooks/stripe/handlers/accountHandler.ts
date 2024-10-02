// File: accountHandler.ts

import { supabaseAdmin } from '@/utils/supabaseAdmin'; // Supabase client
import { Database } from '@/types/supabase'; // Import the generated Database type

// Define TypeScript type aliases using Supabase's Database type
type AccountRecord = Database['public']['Tables']['accounts']['Row'];

// Manage user accounts based on user ID
export async function manageAccount(userId: string) {
  console.log(`>>> Managing account for user ID: ${userId}`);

  try {
    // Check if the account already exists
    const { data: account, error: accountError } = await supabaseAdmin
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (accountError) {
      // Handle the case where no account is found or another error occurs
      if (accountError.code === 'PGRST116') {
        console.warn(`No account found for user ID ${userId}: ${accountError.message}`);
      } else {
        console.error(`Error fetching account for user ID ${userId}: ${accountError.message}`);
      }
      // Proceed to create a new account since one doesn't exist
    } else if (account) {
      console.log(`Account already exists for user ID: ${userId}`);
      return; // Account exists, no action needed
    }

    // If no account exists, create a new account
    const newAccountData: Omit<AccountRecord, 'id'> = { // Exclude 'id' from the new account data
      account_number: generateUniqueAccountNumber(), // Call your unique account number generation function
      user_id: userId, // Reference the user ID
      status: 'active', // Default status
      max_devices: '5', // Default max devices
      cryptotoken: null, // Default value for cryptotoken
      can_add_ports: 'false', // Default value for can_add_ports
      can_add_devices: 'true', // Default value for can_add_devices
      max_ports: '0', // Default max ports
      expiry: '', // Default expiry
      apple_receipt: null, // Default value for apple_receipt
      apple_api_response: null, // Default value for apple_api_response
      created_at: new Date().toISOString(), // Set to current time
      marked_inactive_by_user: null, // Default value for marked_inactive_by_user
    };

    const { data: createdAccount, error: createError } = await supabaseAdmin
      .from('accounts')
      .insert([newAccountData]);

    if (createError) {
      console.error(`Failed to create account for user ID ${userId}: ${createError.message}`);
    } else {
      console.log(`Successfully created new account for user ID: ${userId}`, createdAccount);
    }
  } catch (error) {
    console.error('Error managing account:', error);
  }
}

// Function to generate a unique account number (adjust as necessary)
function generateUniqueAccountNumber(): string {
  return Math.floor(Math.random() * 10000000000000000).toString(); // Generate a unique number
}