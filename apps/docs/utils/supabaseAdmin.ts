// File: apps/docs/utils/supabaseAdmin.ts

import { createClient, User } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Debug logs (Remove in production)
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

// Function to get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    // Add any required parameters if necessary
  });

  if (error) {
    console.error('Error listing users:', error.message);
    return null;
  }

  // Find the user with the matching email
  const user = data.users.find(user => user.email === email);
  return user || null;
}