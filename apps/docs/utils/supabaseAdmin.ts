// utils/superbaseAdmin.ts

import { createClient, User } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Debug logs (Remove or comment out in production)
console.log("Supabase URL:", supabaseUrl ? "Loaded" : "Missing");
console.log("Supabase Service Role Key:", supabaseServiceRoleKey ? "Loaded" : "Missing");

// Validate server-side environment variables
if (!supabaseServiceRoleKey) {
  throw new Error("Missing Supabase Service Role Key.");
}

// Initialize Supabase client with Service Role Key
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

// Define the Account interface
export interface Account {
  id: string;
  account_number: string;
  expiry: string; // ISO string
}

// Function to get user by email by listing users and filtering
export async function getUserByEmail(email: string): Promise<User | null> {
  const pageSize = 100; // Adjust based on your needs
  let currentPage = 1;
  let foundUser: User | null = null;

  while (!foundUser) {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page: currentPage,
        perPage: pageSize,
      });

      if (error) {
        console.error(`Error listing users on page ${currentPage}:`, error.message);
        throw new Error("Failed to list users.");
      }

      if (data && data.users.length > 0) {
        foundUser = data.users.find((user) => user.email === email) || null;
        if (foundUser) break;
        currentPage++;
      } else {
        break; // No more users
      }
    } catch (err) {
      console.error(`Exception while listing users on page ${currentPage}:`, err);
      throw err;
    }
  }

  return foundUser;
}

// Function to create a new user in auth.users via Supabase Admin API
export async function createUser(email: string, password: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm email
    });

    if (error) {
      console.error(`Error creating user: ${email}`, error.message);
      throw new Error(`Error creating user: ${error.message}`);
    }

    return data?.user ?? null;
  } catch (err) {
    console.error(`Exception while creating user: ${email}`, err);
    throw err;
  }
}

// Function to get user account by userId
export async function getUserAccount(userId: string): Promise<Account | null> {
  const { data, error } = await supabaseAdmin
    .from('accounts') // Ensure the correct table name
    .select('id, account_number, expiry')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // Row not found
      return null;
    }
    console.error('Error retrieving account:', error.message);
    throw new Error('Failed to retrieve account.');
  }

  return data as Account;
}