// File: types/supabase.ts

export interface ChargeRecord {
  id: string;
  stripe_charge_id: string;
  payment_intent_id: string | null;
  customer_id: string | null;
  status: string;
  amount: number;
  amount_refunded: number;
  currency: string;
  latest_charge: string;
  receipt_email: string | null;
  created_at: string; // ISO date string
}

export interface PaymentIntentRecord {
  id: string;
  stripe_payment_intent_id: string;
  status: string;
  amount: number;
  currency: string;
  customer_id: string | null;
  receipt_email: string | null;
  created_at: string; // ISO date string
}

export interface CustomerRecord {
  id: string;
  stripe_customer_id: string;
  email: string;
}