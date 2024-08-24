"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { TeamsGrid } from "@/components/marketing/TeamsGrid";

// Define the interfaces for your data structures
interface User {
  id: string;
  full_name: string;
  avatar_url?: string; // Optional
}

interface Account {
  account_number: string;
  status: string;
  max_devices: string;
  expiry: string;
}

interface Subscription {
  status: string;
  current_period_end: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null); // State to store the JWT
  const [decodedJWT, setDecodedJWT] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Get the currently authenticated user and log the JWT
        const session = await supabase.auth.getSession();

        if (session.error) {
          setError("Failed to fetch user details.");
          setLoading(false);
          return;
        }

        // Log the JWT to the console
        const token = session.data.session?.access_token;
        if (token) {
          setJwtToken(token); // Set the JWT to state

          // Decode the JWT
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          );
          setDecodedJWT(JSON.parse(jsonPayload));
        }

        if (user) {
          // Fetch user details
          const { data: userDetails, error: userDetailsError } = await supabase
            .from('users')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .single();

          if (userDetailsError) {
            setError("Failed to fetch user details from the database.");
            setLoading(false);
            return;
          }

          // Fetch account details
          const { data: accountDetails, error: accountError } = await supabase
            .from('accounts')
            .select('*')
            .eq('id', user.id) // Assuming the user ID is used as the account ID, adjust if different
            .single();

          if (accountError) {
            setError("Failed to fetch account details.");
            setLoading(false);
            return;
          }

          // Fetch subscription details
          const { data: subscriptionDetails, error: subscriptionError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (subscriptionError) {
            setError("Failed to fetch subscription details.");
            setLoading(false);
            return;
          }

          setUser(userDetails as User);
          setAccount(accountDetails as Account);
          setSubscription(subscriptionDetails as Subscription);
        }
      } catch (err) {
        console.error("Unexpected error fetching details:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
      <section className="w-full flex flex-col items-center lg:px-16 mt-12 gap-6">
        <div className="text-center max-w-xl">
          <h1 className="mb-4 font-bold text-4xl">Welcome to Your Account, {decodedJWT.user_metadata?.full_name || "User"}!</h1>
          {decodedJWT && (
            <div className="mb-6">
              {decodedJWT.user_metadata?.avatar_url && (
                <div className="mb-4">
                  <img
                    src={decodedJWT.user_metadata.avatar_url}
                    alt="Avatar"
                    className="rounded-full mx-auto"
                    style={{ width: '120px', height: '120px' }}
                  />
                </div>
              )}
              <p className="text-default-500 text-lg">
                <strong>Full Name:</strong> {decodedJWT.user_metadata?.full_name || "No Full Name Provided"}
              </p>
              <p className="text-default-500 text-lg">
                <strong>Email:</strong> {decodedJWT.email || "No Email Provided"}
              </p>
              <p className="text-default-500 text-lg">
                <strong>Phone:</strong> {decodedJWT.phone || "No Phone Provided"}
              </p>
              <p className="text-default-500 text-lg">
                <strong>UUID:</strong> {decodedJWT.sub || "No UUID Provided"}
              </p>
              <p className="text-default-500 text-lg">
                <strong>Account Number:</strong> {account?.account_number || "No Account Number Provided"}
              </p>
            </div>
          )}
        </div>

        {decodedJWT && (
          <div className="mt-12 w-full max-w-2xl mx-auto p-4 bg-gray-800 text-white rounded-lg">
            <h3 className="text-xl font-bold mb-4">Decoded JWT Data</h3>
            <pre className="text-sm whitespace-pre-wrap break-words">
              {JSON.stringify(decodedJWT, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}
