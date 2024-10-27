import { supabase } from "../utils/supabaseClient";
import type { Database } from "../types/supabase";

type UserData = Database["public"]["Tables"]["users"]["Row"];
type AccountData = Database["public"]["Tables"]["accounts"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
type Device = Database["public"]["Tables"]["devices"]["Row"];
type Referral = Database["public"]["Tables"]["referrals"]["Row"];

/**
 * Fetches user details by user ID.
 * @param userId - The ID of the user.
 * @returns Promise<UserData>
 */
export const getUserDetails = async (userId: string): Promise<UserData> => {
  console.log(`Fetching user details for userId: ${userId}`);

  const { data, error } = await supabase
    .from("users")
    .select("id, type, full_name, email, avatar_url, billing_address, payment_method")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user details:", error);
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }

  if (!data) {
    console.error("User not found.");
    throw new Error("User not found.");
  }

  return data;
};

/**
 * Fetches account details by user ID.
 * @param userId - The ID of the user.
 * @returns Promise<AccountData>
 */
export const getAccountDetails = async (userId: string): Promise<AccountData> => {
  console.log(`Fetching account details for userId: ${userId}`);

  const { data, error } = await supabase
    .from("accounts")
    .select(
      "id, account_number, referral_code, expiry, created_at, apple_api_response, apple_receipt, can_add_devices, can_add_ports, cryptotoken, marked_inactive_by_user, max_devices, max_ports, status, user_id"
    )
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching account details:", error);
    throw new Error(`Failed to fetch account details: ${error.message}`);
  }

  if (!data) {
    console.error("Account not found.");
    throw new Error("Account not found.");
  }

  return data;
};

/**
 * Fetches subscriptions by user ID.
 * @param userId - The ID of the user.
 * @returns Promise<Subscription[]>
 */
export const getSubscriptions = async (userId: string): Promise<Subscription[]> => {
  console.log(`Fetching subscriptions for userId: ${userId}`);

  const { data, error } = await supabase
    .from("subscriptions")
    .select(
      "amount, cancel_at, cancel_at_period_end, canceled_at, created, currency, current_period_end, current_period_start, description, ended_at, id, metadata, price_id, quantity, status, stripe_subscription_id, trial_end, trial_start, user_id"
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching subscriptions:", error);
    throw new Error(`Failed to fetch subscriptions: ${error.message}`);
  }

  return data || [];
};

/**
 * Fetches devices by account number.
 * @param accountNumber - The account number.
 * @returns Promise<Device[]>
 */
export const getDevices = async (accountNumber: string): Promise<Device[]> => {
  console.log(`Fetching devices for account number: ${accountNumber}`);

  const { data, error } = await supabase
    .from("devices")
    .select("account_number, event_type, hijack_dns, id, ipv4_address, ipv6_address, last_active, name, pubkey")
    .eq("account_number", accountNumber);

  if (error) {
    console.error("Error fetching devices:", error);
    throw new Error(`Failed to fetch devices: ${error.message}`);
  }

  return data || [];
};

/**
 * Fetches referrer details from the accounts table using the referral code.
 * Then fetches the user details based on the user ID stored in accounts.
 * @param referralCode - The referral code.
 * @returns Promise<{ referrerFullName: string }>
 */
export const getReferrerFromAccount = async (referralCode: string): Promise<{ referrerFullName: string }> => {
  console.log(`Fetching referrer details for referralCode: ${referralCode}`);

  // Query the `accounts` table using the `referral_code` to get the `user_id`
  const { data: accountData, error: accountError } = await supabase
    .from("accounts")
    .select("user_id")
    .eq("referral_code", referralCode)
    .single();

  if (accountError || !accountData?.user_id) {
    console.error("Error fetching account details:", accountError?.message);
    throw new Error("Referral code not found in accounts.");
  }

  const userId = accountData.user_id;

  // Fetch the referrer's full name from the `users` table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (userError || !userData?.full_name) {
    console.error("Error fetching referrer full name:", userError?.message);
    throw new Error("Referrer user not found.");
  }

  return {
    referrerFullName: userData.full_name
  };
};
