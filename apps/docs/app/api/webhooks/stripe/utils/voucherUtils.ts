// File: apps/api/webhooks/stripe/utils/voucherUtils.ts

import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { generateVoucherCode } from '@/utils/voucherCodeGenerator';
import { calculateNewExpiry } from '@/utils/expiryDateCalculator';
import { v4 as uuidv4 } from 'uuid';

// Create or update voucher with idempotency
export async function createOrUpdateVoucher(
  accountNumber: string,
  durationMonths: number,
  paymentIntentId: string
) {
  // Check if a voucher already exists for this payment intent
  const { data: existingVoucher, error: fetchError } = await supabaseAdmin
    .from('vouchers')
    .select('*')
    .eq('payment_intent_id', paymentIntentId)
    .single();

  if (existingVoucher) {
    console.log('Voucher already exists for this payment intent:', existingVoucher.code);
    return;
  }

  const voucherCode = generateVoucherCode();
  const expiryDate = calculateNewExpiry(null, durationMonths); // Returns Date

  const voucherData = {
    id: uuidv4(),
    code: voucherCode,
    duration_months: durationMonths,
    is_used: false,
    associated_account: accountNumber,
    created_at: new Date().toISOString(),
    status: 'active',
    subscription_id: null, // Optionally link to subscription
    channel_id: 'c4c8ca3f-3083-4484-a69c-cd64624ab765', // Default channel ID or dynamically set
    updated_at: new Date().toISOString(),
    used_at: null,
    updated_by: null,
    payment_intent_id: paymentIntentId, // UUID from payment_intents table
  };

  const { error: voucherError } = await supabaseAdmin
    .from('vouchers')
    .insert(voucherData);

  if (voucherError) {
    if (voucherError.code === '23505') { // Unique violation
      console.warn('Voucher already exists during insertion:', voucherData.code);
      return;
    }
    console.error('Error creating voucher:', voucherError.message);
    throw new Error('Failed to create voucher.');
  }

  console.log('Voucher created successfully:', voucherCode);
}
