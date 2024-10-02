import Stripe from 'stripe';
import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { v4 as uuidv4 } from 'uuid';

const isTestMode = process.env.NODE_ENV === 'test';

// Handle 'charge.succeeded' event
export async function handleChargeSucceeded(charge: Stripe.Charge) {
  console.log(`Processing charge event in ${isTestMode ? 'test' : 'live'} mode:`, charge.id);

  if (!charge.payment_intent || typeof charge.payment_intent !== 'string') {
    console.error('Charge does not have a valid payment_intent.');
    throw new Error('Invalid charge event: missing payment_intent.');
  }

  const stripePaymentIntentId = charge.payment_intent as string;

  const { data: paymentIntentRecord, error: paymentIntentError } = await supabaseAdmin
    .from('payment_intents')
    .select('id')
    .eq('stripe_payment_intent_id', stripePaymentIntentId)
    .single();

  if (paymentIntentError) {
    if (paymentIntentError.code === 'PGRST116') {
      console.warn(`No payment intent record found for Stripe Payment Intent ID: ${stripePaymentIntentId}`);
      return;
    } else {
      console.error('Error fetching payment intent record:', paymentIntentError.message);
      throw new Error('Failed to fetch Payment Intent record.');
    }
  }

  const paymentIntentUUID = paymentIntentRecord.id;

  let customerUUID: string | null = null;
  if (charge.customer && typeof charge.customer === 'string') {
    customerUUID = await getCustomerUUID(charge.customer);
  }

  const { data: existingCharge, error: fetchChargeError } = await supabaseAdmin
    .from('charges')
    .select('*')
    .eq('stripe_charge_id', charge.id)
    .single();

  if (existingCharge) {
    console.log('Charge already exists. Skipping insertion.');
    return;
  }

  const billingDetails = charge.billing_details ? {
    address: charge.billing_details.address,
    email: charge.billing_details.email,
    name: charge.billing_details.name,
    phone: charge.billing_details.phone,
  } : null;

  const chargeData = {
    id: uuidv4(),
    stripe_charge_id: charge.id,
    payment_intent_id: paymentIntentUUID,
    amount: charge.amount.toString(),
    amount_refunded: charge.amount_refunded.toString(),
    currency: charge.currency,
    customer_id: customerUUID,
    billing_details: billingDetails,
    status: charge.status,
    created_at: new Date(charge.created * 1000).toISOString(),
    receipt_email: charge.receipt_email || null,
    refunded: charge.refunded,
    disputed: charge.disputed,
  };

  const { error: chargeError } = await supabaseAdmin
    .from('charges')
    .insert(chargeData);

  if (chargeError) {
    console.error('Error inserting charge data:', chargeError.message);
    throw new Error('Failed to insert charge data.');
  }

  console.log('Charge data inserted successfully.');
}

// Handle 'charge.updated' event
export async function handleChargeUpdated(charge: Stripe.Charge) {
  console.log(`Processing charge update in ${isTestMode ? 'test' : 'live'} mode:`, charge.id);

  const { data: existingCharge, error: fetchChargeError } = await supabaseAdmin
    .from('charges')
    .select('*')
    .eq('stripe_charge_id', charge.id)
    .single();

  if (fetchChargeError) {
    if (fetchChargeError.code === 'PGRST116') {
      console.warn(`Charge record not found for Stripe Charge ID: ${charge.id}`);
      return;
    } else {
      console.error('Error fetching charge record:', fetchChargeError.message);
      throw new Error('Failed to fetch charge record.');
    }
  }

  const { error: updateError } = await supabaseAdmin
    .from('charges')
    .update({
      status: charge.status,
      refunded: charge.refunded,
      disputed: charge.disputed,
    })
    .eq('id', existingCharge.id);

  if (updateError) {
    console.error('Error updating charge record:', updateError.message);
    throw new Error('Failed to update charge record.');
  }

  console.log('Charge record updated successfully.');
}

// Helper function to get customer UUID from Stripe Customer ID
async function getCustomerUUID(stripeCustomerId: string): Promise<string | null> {
  const { data: customerRecord, error: customerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  if (customerError) {
    if (customerError.code === 'PGRST116') {
      console.warn(`No customer found with Stripe Customer ID: ${stripeCustomerId}`);
      return null;
    } else {
      console.error('Error fetching customer record:', customerError.message);
      throw new Error('Failed to fetch customer record.');
    }
  }

  return customerRecord.id;
}
