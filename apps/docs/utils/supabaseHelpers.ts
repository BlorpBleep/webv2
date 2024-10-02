// File: /utils/supabaseHelpers.ts

import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { PostgrestError } from '@supabase/supabase-js'; // Importing the type for errors

// Define TypeScript interfaces as needed
export interface PaymentIntentRecord {
  id: string;
  stripe_payment_intent_id: string;
  status: string;
  amount: number;
  currency: string;
  customer_id: string | null;
  created_at: string;
  receipt_email: string | null;
}

export interface CustomerRecord {
  id: string;
}

// Helper function for SELECT
export async function selectFromTable<T>(
  table: string,
  select: string = '*',
  filters?: { field: string; value: any },
  single: boolean = false
): Promise<{ data: T | null; error: PostgrestError | null }> {
  try {
    console.log(`SELECT from ${table} where ${filters?.field} = ${filters?.value}`);

    let query = supabaseAdmin.from(table).select(select);
    if (filters) {
      query = query.eq(filters.field, filters.value);
    }
    if (single) {
      const { data, error } = await query.single();
      if (error) {
        console.error(`Error selecting from ${table}:`, error.message);
      } else {
        console.log(`SELECT successful:`, data);
      }
      return { data: data as T, error };
    } else {
      const { data, error } = await query;
      if (error) {
        console.error(`Error selecting from ${table}:`, error.message);
      } else {
        console.log(`SELECT successful:`, data);
      }
      return { data: data as T, error };
    }
  } catch (error) {
    console.error(`Unexpected error during SELECT from ${table}:`, error);
    const genericError: PostgrestError = {
      message: 'Unexpected error',
      code: 'UNKNOWN',
      details: 'No additional details provided.',
      hint: 'No hint provided.',
    };
    return { data: null, error: genericError };
  }
}

// Helper function for INSERT
export async function insertIntoTable<T>(
  table: string,
  data: T
): Promise<{ data: T | null; error: PostgrestError | null }> {
  try {
    console.log(`INSERT into ${table}:`, data);
    const { data: insertedData, error } = await supabaseAdmin.from(table).insert(data).select().single();
    if (error) {
      console.error(`Error inserting into ${table}:`, error.message);
    } else {
      console.log(`INSERT successful:`, insertedData);
    }
    return { data: insertedData as T, error };
  } catch (error) {
    console.error(`Unexpected error during INSERT into ${table}:`, error);
    const genericError: PostgrestError = {
      message: 'Unexpected error',
      code: 'UNKNOWN',
      details: 'No additional details provided.',
      hint: 'No hint provided.',
    };
    return { data: null, error: genericError };
  }
}

// Helper function for UPDATE
export async function updateTable<T>(
  table: string,
  data: Partial<T>,
  filterField: string,
  filterValue: any
): Promise<{ data: T | null; error: PostgrestError | null }> {
  try {
    console.log(`UPDATE ${table} set`, data, `where ${filterField} = ${filterValue}`);
    const { data: updatedData, error } = await supabaseAdmin.from(table).update(data).eq(filterField, filterValue).select().single();
    if (error) {
      console.error(`Error updating ${table}:`, error.message);
    } else {
      console.log(`UPDATE successful:`, updatedData);
    }
    return { data: updatedData as T, error };
  } catch (error) {
    console.error(`Unexpected error during UPDATE on ${table}:`, error);
    const genericError: PostgrestError = {
      message: 'Unexpected error',
      code: 'UNKNOWN',
      details: 'No additional details provided.',
      hint: 'No hint provided.',
    };
    return { data: null, error: genericError };
  }
}

// Helper function for DELETE
export async function deleteFromTable<T>(
  table: string,
  filterField: string,
  filterValue: any
): Promise<{ data: T | null; error: PostgrestError | null }> {
  try {
    console.log(`DELETE from ${table} where ${filterField} = ${filterValue}`);
    const { data, error } = await supabaseAdmin.from(table).delete().eq(filterField, filterValue).select().single();
    if (error) {
      console.error(`Error deleting from ${table}:`, error.message);
    } else {
      console.log(`DELETE successful:`, data);
    }
    return { data: data as T, error };
  } catch (error) {
    console.error(`Unexpected error during DELETE from ${table}:`, error);
    const genericError: PostgrestError = {
      message: 'Unexpected error',
      code: 'UNKNOWN',
      details: 'No additional details provided.',
      hint: 'No hint provided.',
    };
    return { data: null, error: genericError };
  }
}
