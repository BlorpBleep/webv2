// File: components/supabaseCalls.ts

import { supabase } from "../../utils/supabaseClient"; // Adjust the path if necessary
import type { Database } from "../../types/supabase"; // Adjust the path if necessary

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
  const { data, error } = await supabase
    .from("users")
    .select("id, type, full_name, email, avatar_url, billing_address, payment_method")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch user details: ${error.message}`);
  }

  if (!data) {
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
  const { data, error } = await supabase
    .from("accounts")
    .select(
      "id, account_number, referral_code, expiry, created_at, apple_api_response, apple_receipt, can_add_devices, can_add_ports, cryptotoken, marked_inactive_by_user, max_devices, max_ports, status, user_id"
    )
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch account details: ${error.message}`);
  }

  if (!data) {
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
  const { data, error } = await supabase
    .from("subscriptions")
    .select(
      "amount, cancel_at, cancel_at_period_end, canceled_at, created, currency, current_period_end, current_period_start, description, ended_at, id, metadata, price_id, quantity, status, stripe_subscription_id, trial_end, trial_start, user_id"
    )
    .eq("user_id", userId);

  if (error) {
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
  const { data, error } = await supabase
    .from("devices")
    .select("account_number, event_type, hijack_dns, id, ipv4_address, ipv6_address, last_active, name, pubkey")
    .eq("account_number", accountNumber);

  if (error) {
    throw new Error(`Failed to fetch devices: ${error.message}`);
  }

  return data || [];
};

/**
 * Fetches referrals by referral code.
 * @param referralCode - The referral code.
 * @returns Promise<Referral[]>
 */
export const getReferrals = async (referralCode: string): Promise<Referral[]> => {
  const { data, error } = await supabase
    .from("referrals")
    .select("created_at, friend_email, id, referral_code, referrer_account_id, status, updated_at")
    .eq("referral_code", referralCode);

  if (error) {
    throw new Error(`Failed to fetch referrals: ${error.message}`);
  }

  return data || [];
};
