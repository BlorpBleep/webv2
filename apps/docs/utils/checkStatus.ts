// File: utils/checkStatus.ts

import { supabaseAdmin } from './supabaseAdmin';

export async function checkStatus() {
  console.log('--- Database Status Check ---');

  // 1. Check Subscriptions
  const { data: subscriptions, error: subError } = await supabaseAdmin
    .from('subscriptions')
    .select('id, user_id, status')
    .order('id', { ascending: false }) // Changed to 'id' since 'created_at' does not exist
    .limit(5); // Check the latest 5 subscriptions

  if (subError) {
    console.error('Error fetching subscriptions:', subError.message);
  } else {
    console.log(`Subscriptions (Latest 5): ${subscriptions.length}`);
    subscriptions.forEach((sub) => {
      console.log(`- ID: ${sub.id}, User ID: ${sub.user_id}, Status: ${sub.status}`);
    });
  }

  // 2. Check Payment Intents
  const { data: paymentIntents, error: piError } = await supabaseAdmin
    .from('payment_intents')
    .select('id, stripe_payment_intent_id, customer_id, status')
    .order('created_at', { ascending: false })
    .limit(5); // Check the latest 5 payment intents

  if (piError) {
    console.error('Error fetching payment intents:', piError.message);
  } else {
    console.log(`Payment Intents (Latest 5): ${paymentIntents.length}`);
    paymentIntents.forEach((pi) => {
      console.log(`- Stripe PI ID: ${pi.stripe_payment_intent_id}, Customer ID: ${pi.customer_id}, Status: ${pi.status}`);
    });
  }

  // 3. Check Customers
  const { data: customers, error: custError } = await supabaseAdmin
    .from('customers')
    .select('id, stripe_customer_id')
    .order('id', { ascending: false }) // Changed to 'id' since 'created_at' does not exist
    .limit(5); // Check the latest 5 customers

  if (custError) {
    console.error('Error fetching customers:', custError.message);
  } else {
    console.log(`Customers (Latest 5): ${customers.length}`);
    customers.forEach((cust) => {
      console.log(`- ID: ${cust.id}, Stripe Customer ID: ${cust.stripe_customer_id}`);
    });
  }

  // 4. Check Vouchers
  const { data: vouchers, error: voucherError } = await supabaseAdmin
    .from('vouchers')
    .select('id, code, payment_intent_id, status')
    .order('created_at', { ascending: false })
    .limit(5); // Check the latest 5 vouchers

  if (voucherError) {
    console.error('Error fetching vouchers:', voucherError.message);
  } else {
    console.log(`Vouchers (Latest 5): ${vouchers.length}`);
    vouchers.forEach((voucher) => {
      console.log(`- Code: ${voucher.code}, Payment Intent ID: ${voucher.payment_intent_id}, Status: ${voucher.status}`);
    });
  }

  // 5. Check Charges
  const { data: charges, error: chargeError } = await supabaseAdmin
    .from('charges')
    .select('id, stripe_charge_id, payment_intent_id, status')
    .order('created_at', { ascending: false })
    .limit(5); // Check the latest 5 charges

  if (chargeError) {
    console.error('Error fetching charges:', chargeError.message);
  } else {
    console.log(`Charges (Latest 5): ${charges.length}`);
    charges.forEach((charge) => {
      console.log(`- Stripe Charge ID: ${charge.stripe_charge_id}, Payment Intent ID: ${charge.payment_intent_id}, Status: ${charge.status}`);
    });
  }

  console.log('--- End of Status Check ---\n');
}
