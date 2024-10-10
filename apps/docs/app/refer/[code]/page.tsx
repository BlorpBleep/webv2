// app/refer/[code]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { Card, CardBody, CardHeader, Divider, Button } from "@nextui-org/react";
import type { Referral, UserData, AccountData } from "@/types/supabase"; // Adjust the path as necessary.

const ReferPage: React.FC = () => {
  const params = useParams();
  const code = params.code; // Extract 'code' from URL parameters
  const [referrerName, setReferrerName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReferrer = async () => {
      if (!code) {
        setError("Invalid referral code.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetch the referral record along with the referrer's full name using relationships
        const { data: referralData, error: referralError } = await supabase
          .from<"referrals", Referral>("referrals")
          .select(`
            referrer_account_id,
            accounts:user_id (
              users:users(full_name)
            )
          `)
          .eq("referral_code", code)
          .single();

        if (referralError || !referralData) {
          console.error("Error fetching referral data:", referralError?.message || "No data found.");
          setError("Invalid or expired referral code.");
          setIsLoading(false);
          return;
        }

        const referrerFullName = referralData.accounts?.users?.full_name || "Unknown";
        setReferrerName(referrerFullName);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrer();
  }, [code]);

  const handleSignUp = () => {
    // Redirect to the sign-up page
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold">Welcome to CicaDaVPN!</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {isLoading ? (
            <p className="mb-4">Loading...</p>
          ) : error ? (
            <p className="mb-4 text-red-500">{error}</p>
          ) : (
            <p className="mb-4">
              You were referred by <span className="font-semibold">{referrerName}</span>.
            </p>
          )}
          <p className="mb-6">
            Join us today and enjoy premium VPN services with enhanced security and privacy.
          </p>
          <Button className="w-full" onPress={handleSignUp}>
            Sign Up Now
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReferPage;
