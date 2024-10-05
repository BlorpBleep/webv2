// File: handlers/voucherHandler.ts

import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { Database } from '@/types/supabase';

/**
 * Defines the structure of a Voucher.
 */
type VoucherRecord = Database['public']['Tables']['vouchers']['Row'];

/**
 * Generates a unique 16-digit integer voucher code.
 * @returns A unique 16-digit voucher code string.
 */
function generateVoucherCode(): string {
  // Generate a random 16-digit integer as a string
  let code = '';
  for (let i = 0; i < 16; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

/**
 * Generates a unique voucher code ensuring no duplication in the database.
 * @returns A unique 16-digit voucher code string.
 */
async function generateUniqueVoucherCode(): Promise<string> {
  let isUnique = false;
  let code = '';

  while (!isUnique) {
    code = generateVoucherCode();
    // Check if the code already exists
    const { data, error } = await supabaseAdmin
      .from('vouchers')
      .select('id')
      .eq('code', code)
      .single();

    if (error && error.code === 'PGRST116') {
      // Code is unique
      isUnique = true;
    } else {
      // Code already exists or another error occurred
      console.warn(`Voucher code ${code} already exists or an error occurred. Generating a new one.`);
    }
  }

  return code;
}

/**
 * Creates and assigns a voucher to the user's associated account.
 * @param userId - The ID of the user.
 * @param durationMonths - The duration in months for the voucher.
 * @param subscriptionId - The Stripe subscription ID associated with the purchase (optional).
 */
export async function createAndAssignVoucher(
  userId: string,
  durationMonths: number,
  subscriptionId: string | null = null
) {
  try {
    console.log(`>>> Creating voucher for user ID: ${userId} with duration: ${durationMonths} months`);

    // Generate a unique 16-digit voucher code
    const voucherCode = await generateUniqueVoucherCode();

    // Retrieve the user's associated account with account_number
    const { data: account, error: accountError } = await supabaseAdmin
      .from('accounts')
      .select('account_number, expiry')
      .eq('user_id', userId)
      .single();

    if (accountError) {
      console.error(`Error fetching account for user ID ${userId}:`, accountError.message);
      throw new Error('Failed to retrieve user account.');
    }

    if (!account) {
      console.error(`No account found for user ID ${userId}.`);
      throw new Error('User account does not exist.');
    }

    // Calculate the new expiry date by adding durationMonths
    const currentExpiry = account.expiry ? new Date(account.expiry) : new Date();
    const newExpiry = new Date(currentExpiry);
    newExpiry.setMonth(newExpiry.getMonth() + durationMonths);

    // Prepare the new voucher data
    const newVoucher: Omit<VoucherRecord, 'id' | 'created_at' | 'updated_at'> = {
      associated_account: account.account_number, // Correctly reference account_number
      channel_id: null, // Set accordingly if needed
      code: voucherCode,
      duration_months: durationMonths,
      is_used: true, // Mark as used immediately
      payment_intent_id: null, // Set accordingly if needed
      status: 'active', // Adjust based on your business logic
      subscription_id: subscriptionId, // Set based on the parameter
      updated_by: null,
      used_at: new Date().toISOString(),
      // Add other fields if necessary
    };

    // Insert the new voucher
    const { data: insertedVoucher, error: insertError } = await supabaseAdmin
      .from('vouchers')
      .insert([newVoucher]);

    if (insertError) {
      console.error('Error inserting voucher:', insertError.message);
      throw new Error('Failed to insert voucher.');
    }

    console.log(`>>> Successfully created and assigned voucher ${voucherCode} to account ${account.account_number}.`);

    // Update the account's expiry date
    const { error: updateError } = await supabaseAdmin
      .from('accounts')
      .update({ expiry: newExpiry.toISOString() })
      .eq('account_number', account.account_number); // Ensure to match account_number

    if (updateError) {
      console.error(`Error updating expiry for account number ${account.account_number}:`, updateError.message);
      throw new Error('Failed to update account expiry.');
    }

    console.log(`>>> Updated account ${account.account_number} expiry to ${newExpiry.toISOString()}.`);
  } catch (error) {
    console.error('>>> Error in createAndAssignVoucher:', error);
    throw error; // Re-throw the error after logging
  }
}
