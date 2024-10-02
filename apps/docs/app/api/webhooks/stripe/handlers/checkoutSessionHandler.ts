import { supabaseAdmin, getUserByEmail, getUserAccount, Account } from '@/utils/supabaseAdmin';
import { sendEmailNotification } from '../utils/emailUtils';
import { createOrUpdateVoucher } from '../utils/voucherUtils';
import { generateAccountNumber } from '@/utils/accountNumberGenerator';
import { calculateNewExpiry } from '@/utils/expiryDateCalculator';
import { insertSubscription } from './subscriptionUtils';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import logSupabaseQuery from '@/utils/supabaseLogger';

// Type Definitions
interface User {
  id: string;
  email: string;
}

interface PaymentIntentRecord {
  id: string;
  stripe_payment_intent_id: string;
  status: string;
  amount: number;
  currency: string;
  customer_id: string;
  created_at: string;
  receipt_email: string | null;
}

interface Customer {
  id: string;
}

interface SupabaseSelectResponse<T> {
  data: T | null;
  error: any | null;
}

// Handle 'checkout.session.completed' event
export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout Session completed:', session.id);

  const customerEmail = session.customer_email || session.customer_details?.email;

  if (!customerEmail) {
    console.error('Customer email is required but not found.');
    throw new Error('Customer email is missing.');
  }

  // Check if the user exists
  let user = await getUserByEmail(customerEmail);

  if (!user) {
    console.log('User not found. Creating a new user:', customerEmail);
    const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email: customerEmail,
      email_confirm: true,
    });

    if (createUserError) {
      if (createUserError.message.includes('already been registered')) {
        console.warn('User already exists during creation attempt:', customerEmail);
        user = await getUserByEmail(customerEmail);
        if (!user) {
          throw new Error('Failed to retrieve user after creation conflict.');
        }
      } else {
        console.error('Error creating user:', createUserError.message);
        throw new Error('Failed to create user.');
      }
    } else {
      user = newUser?.user;
      if (!user || !user.id) throw new Error('New user could not be created or has no ID');
      console.log('User created successfully:', user.id);

      // Create corresponding customer entry
      const customerInsertQuery = {
        table: 'customers',
        method: 'insert' as const,
        queryParams: {
          data: {
            id: user.id,
            stripe_customer_id: session.customer as string,
          },
        },
      };
      const { error: customerError } = await logSupabaseQuery(customerInsertQuery);

      if (customerError) {
        if (customerError.message.includes('duplicate key value violates unique constraint')) {
          console.warn('Customer entry already exists:', user.id);
        } else {
          console.error('Error creating customer entry:', customerError.message);
          throw new Error('Failed to create customer entry.');
        }
      } else {
        console.log('Customer entry created successfully.');
      }
    }
  } else {
    console.log('User already exists:', user.id);

    // Ensure customer entry exists
    const customerQuery = {
      table: 'customers',
      method: 'select' as const,
      queryParams: {
        eq: { field: 'id', value: user.id },
        single: true,
      },
    };

    const { data: existingCustomer, error: fetchCustomerError } = await logSupabaseQuery<SupabaseSelectResponse<Customer>>(customerQuery);

    if (fetchCustomerError) {
      if (fetchCustomerError.code === 'PGRST116') {
        console.log('Customer entry not found. Creating a new customer entry.');
        const customerInsertQuery = {
          table: 'customers',
          method: 'insert' as const,
          queryParams: {
            data: {
              id: user.id,
              stripe_customer_id: session.customer as string,
            },
          },
        };

        const { error: customerError } = await logSupabaseQuery(customerInsertQuery);

        if (customerError) {
          if (customerError.message.includes('duplicate key value violates unique constraint')) {
            console.warn('Customer entry already exists:', user.id);
          } else {
            console.error('Error creating customer entry:', customerError.message);
            throw new Error('Failed to create customer entry.');
          }
        } else {
          console.log('Customer entry created successfully.');
        }
      } else {
        console.error('Error fetching customer entry:', fetchCustomerError.message);
        throw new Error('Failed to fetch customer entry.');
      }
    } else {
      console.log('Customer entry already exists:', existingCustomer?.data?.id);
    }
  }

  // Retrieve or create account for the user
  let account: Account | null = await getUserAccount(user.id);

  // Check if account exists, if null create a new one
  if (!account) {
    console.log(`Account not found for user ID ${user.id}. Creating a new account.`);
    const accountNumber = generateAccountNumber();
    const newExpiryDate = calculateNewExpiry(null, 1);

    const accountInsertQuery = {
      table: 'accounts',
      method: 'insert' as const,
      queryParams: {
        data: {
          account_number: accountNumber,
          user_id: user.id,
          expiry: newExpiryDate.toISOString(),
        },
      },
    };

    const { data: newAccount, error: createAccountError } = await logSupabaseQuery<SupabaseSelectResponse<Account>>(accountInsertQuery);

    if (createAccountError) {
      console.error('Error creating account:', createAccountError.message);
      throw new Error('Failed to create account.');
    }
    account = newAccount?.data;
    if (!account?.id) throw new Error('Failed to retrieve account ID after creation.');
    console.log('Account created successfully:', account.id);
  } else {
    console.log('Account retrieved successfully:', account.id);

    // Update account expiry date
    const newExpiryDate = calculateNewExpiry(new Date(account.expiry), 1);
    const accountUpdateQuery = {
      table: 'accounts',
      method: 'update' as const,
      queryParams: {
        data: { expiry: newExpiryDate.toISOString() },
        eq: { field: 'id', value: account.id },
      },
    };

    const { error: updateExpiryError } = await logSupabaseQuery(accountUpdateQuery);

    if (updateExpiryError) {
      console.error('Error updating account expiry:', updateExpiryError.message);
      throw new Error('Failed to update account expiry.');
    }
    console.log('Account expiry updated successfully.');
  }

  const accountNumber = account!.account_number; // Use non-null assertion after null check
  const paymentIntentId: string | undefined = session.payment_intent as string | undefined;

  if (paymentIntentId) {
    const paymentIntent = await new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' }).paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      console.log('Payment Intent retrieved and succeeded:', paymentIntent.id);

      const paymentIntentQuery = {
        table: 'payment_intents',
        method: 'select' as const,
        queryParams: {
          eq: { field: 'stripe_payment_intent_id', value: paymentIntent.id },
          single: true,
        },
      };

      const { data: existingPaymentIntent, error: fetchPiError } = await logSupabaseQuery<SupabaseSelectResponse<PaymentIntentRecord>>(paymentIntentQuery);

      if (fetchPiError) {
        if (fetchPiError.code === 'PGRST116') {
          const paymentIntentRecord: PaymentIntentRecord = {
            id: uuidv4(),
            stripe_payment_intent_id: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            customer_id: user.id,
            created_at: new Date(paymentIntent.created * 1000).toISOString(),
            receipt_email: paymentIntent.receipt_email || null,
          };

          const paymentIntentInsertQuery = {
            table: 'payment_intents',
            method: 'insert' as const,
            queryParams: {
              data: paymentIntentRecord,
            },
          };

          const { error: insertPiError } = await logSupabaseQuery<PaymentIntentRecord>(paymentIntentInsertQuery);

          if (insertPiError) {
            console.error('Error inserting Payment Intent:', insertPiError.message);
            throw new Error('Failed to insert Payment Intent.');
          }

          console.log('Payment Intent inserted successfully:', paymentIntent.id);
        } else {
          console.error('Error fetching Payment Intent:', fetchPiError.message);
          throw new Error('Failed to fetch Payment Intent.');
        }
      } else {
        console.log('Payment Intent already exists:', existingPaymentIntent?.data?.id);
      }

      const internalPaymentIntentQuery = {
        table: 'payment_intents',
        method: 'select' as const,
        queryParams: {
          select: 'id',
          eq: { field: 'stripe_payment_intent_id', value: paymentIntent.id },
          single: true,
        },
      };

      const { data: internalPaymentIntent, error: internalPiError } = await logSupabaseQuery<SupabaseSelectResponse<PaymentIntentRecord>>(internalPaymentIntentQuery);

      if (internalPiError) {
        console.error('Error retrieving internal Payment Intent:', internalPiError.message);
        throw new Error('Failed to retrieve internal Payment Intent.');
      }

      const internalPaymentIntentId = internalPaymentIntent?.data?.id!;
      await createOrUpdateVoucher(accountNumber, 1, internalPaymentIntentId);

      const stripeSubscriptionId = session.subscription as string | null;

      if (stripeSubscriptionId !== null) {
        await insertSubscription(stripeSubscriptionId, user.id, accountNumber, internalPaymentIntentId, false);
      } else {
        await insertSubscription(null, user.id, accountNumber, internalPaymentIntentId, true);
      }

      await sendEmailNotification(customerEmail, session.id);
    } else {
      console.warn('Payment Intent is not succeeded:', paymentIntent.status);
    }
  } else {
    console.error('No payment intent ID found in session.');
    throw new Error('Payment intent ID is missing.');
  }
}
