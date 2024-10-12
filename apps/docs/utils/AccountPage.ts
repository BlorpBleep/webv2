// utils/fetchData.ts

import { supabase } from "./supabaseClient";
import type { Database } from "../types/supabase";

type UserData = Partial<Database["public"]["Tables"]["users"]["Row"]>;
type AccountData = Partial<Database["public"]["Tables"]["accounts"]["Row"]>;
type Subscription = Partial<Database["public"]["Tables"]["subscriptions"]["Row"]>;
type Device = Partial<Database["public"]["Tables"]["devices"]["Row"]>;
type Referral = Partial<Database["public"]["Tables"]["referrals"]["Row"]>;

type Router = {
  push: (path: string) => void;
};

type FetchDataParams = {
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  setAccountData: React.Dispatch<React.SetStateAction<AccountData | null>>;
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
  setReferralStats: React.Dispatch<
    React.SetStateAction<{
      ordered: number;
      delivered: number;
      cancelled: number;
      referralDates: {
        date: string;
        referral_code: string;
        friend_email: string;
        status: string;
      }[];
    }>
  >;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: Router; // Updated type without using useRouter
};

export const fetchData = async ({
  setUserData,
  setAccountData,
  setDevices,
  setSubscriptions,
  setReferralStats,
  setError,
  setLoading,
  router,
}: FetchDataParams) => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.user?.id) {
      router.push("/auth"); // Using router.push without useRouter hook
      return;
    }
    const userId = sessionData.session.user.id;

    // Fetch user details
    const { data: userDetails, error: userError } = await supabase
      .from<UserData>("users")
      .select("id, full_name, email, avatar_url, billing_address, payment_method, type")
      .eq("id", userId)
      .single();

    if (userError) {
      throw userError;
    }

    setUserData(userDetails);

    // Fetch account details
    const { data: accountsData, error: accountsError } = await supabase
      .from<AccountData>("accounts")
      .select("id, account_number, referral_code, expiry, created_at, apple_api_response, apple_receipt, can_add_devices, can_add_ports, user_id")
      .eq("user_id", userId)
      .single();

    if (accountsError) {
      throw accountsError;
    }

    setAccountData(accountsData || null);

    // Fetch subscriptions
    const { data: subscriptionsData, error: subscriptionsError } = await supabase
      .from<Subscription>("subscriptions")
      .select("cancel_at, created, current_period_end, amount, currency, description")
      .eq("user_id", userId);

    if (subscriptionsError) {
      throw subscriptionsError;
    }

    setSubscriptions(subscriptionsData || []);

    // Fetch devices
    if (accountsData) {
      const { data: devicesData, error: devicesError } = await supabase
        .from<Device>("devices")
        .select("account_number, ipv4_address, name, pubkey")
        .eq("account_number", accountsData.account_number);

      if (devicesError) {
        throw devicesError;
      }

      setDevices(devicesData || []);
    }

    // Fetch referrals
    if (accountsData?.referral_code) {
      const { data: referralData, error: referralError } = await supabase
        .from<Referral>("referrals")
        .select("*")
        .eq("referral_code", accountsData.referral_code);

      if (referralError) {
        throw referralError;
      }

      const ordered = referralData?.filter((ref) => ref.status === "ordered").length || 0;
      const delivered = referralData?.filter((ref) => ref.status === "delivered").length || 0;
      const cancelled = referralData?.filter((ref) => ref.status === "cancelled").length || 0;

      const referralDates =
        referralData?.map((ref) => ({
          date: new Date(ref.created_at).toISOString().split("T")[0],
          referral_code: ref.referral_code,
          friend_email: ref.friend_email,
          status: ref.status,
        })) || [];

      setReferralStats({ ordered, delivered, cancelled, referralDates });
    }
  } catch (error: any) {
    setError("An unexpected error occurred.");
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
};
