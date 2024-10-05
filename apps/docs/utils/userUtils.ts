// File: utils/userUtils.ts

import { supabaseAdmin } from '@/utils/supabaseAdmin';
import { Database } from '@/types/supabase';

/**
 * Syncs user data to the public.users table in Supabase.
 * @param userId - The ID of the user.
 * @param email - The user's email.
 * @param fullName - The user's full name.
 * @param profilePicUrl - The URL to the user's profile picture (optional).
 */
export async function syncPublicUser(
  userId: string,
  email: string | null,
  fullName: string | null,
  profilePicUrl: string | null = null
) {
  if (!email) {
    console.warn(`Cannot sync public user without email for user ID: ${userId}`);
    return;
  }

  try {
    console.log(`>>> Upserting user profile in 'users' table for user ID: ${userId}`);
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert(
        { id: userId, email: email, full_name: fullName, avatar_url: profilePicUrl },
        { onConflict: 'id' }
      );

    if (error) {
      console.error(`Failed to sync user profile for user ID ${userId}:`, error.message);
    } else {
      console.log(`User profile synced successfully for user ID: ${userId}.`);
    }
  } catch (error) {
    console.error(`Error in syncPublicUser for user ID ${userId}:`, error);
  }
}