"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, Divider, Button } from "@nextui-org/react";
import { getReferrerFromAccount } from "@/utils/supabaseCalls"; // Updated function import
import { FaCheckCircle } from "react-icons/fa"; // Using react-icons for the checkmark
import confetti from "canvas-confetti"; // Importing the confetti package

const ReferPage: React.FC = () => {
  const params = useParams();
  
  // Safely handle `params.code` by ensuring it's always a string
  const code = Array.isArray(params.code) ? params.code[0] : params.code;

  const [referrerName, setReferrerName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!code) {
        setError("Invalid referral code.");
        setIsLoading(false);
        return;
      }

      try {
        console.log(`Fetching referrer details for referralCode: ${code}`);
        const { referrerFullName } = await getReferrerFromAccount(code);

        if (!referrerFullName) {
          console.error(`Referral code ${code} not found.`);
          setError("Referral code not found.");
        } else {
          console.log(`Referral found for referralCode: ${code}`);
          setReferrerName(referrerFullName); // Store the referrer's name

          // Trigger confetti when the referral is found
          triggerConfetti();
        }
      } catch (err) {
        console.error(`Unexpected error fetching referral for code ${code}:`, err);
        setError("An unexpected error occurred while fetching the referral.");
      } finally {
        setIsLoading(false); // Mark loading complete after data is fetched
      }
    };

    fetchReferralData();
  }, [code]);

  // Confetti trigger function based on the "school pride" example
  const triggerConfetti = () => {
    var end = Date.now() + 15 * 1000; // Confetti for 15 seconds
    var colors = ['#00FF00', '#FFD700']; // You can adjust the colors to your preference

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 }, // Left side
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 }, // Right side
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {isLoading ? ( // Delay rendering of the card until data is fetched
        <p>Loading...</p>
      ) : (
        <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"> {/* Dark/Light mode compatible */}
          <CardHeader className="flex justify-center"> {/* Ensure header content is centered */}
            {/* Centered and bold referral text */}
            <h2 className="text-3xl font-bold mb-2 text-center w-full">
              <span className="font-semibold">{referrerName}'s</span> Referral Bonus Applied
            </h2>
          </CardHeader>
          <Divider />

          {/* Added green checkmark icon in the center using react-icons */}
          <div className="flex justify-center my-4">
            <FaCheckCircle className="w-12 h-12 text-green-500" />
          </div>

          <CardBody>
            {error ? (
              <p className="mb-4 text-red-500">{error}</p>
            ) : (
              <div className="mb-4">
                <p className="text-left text-lg font-semibold">
                  Order our 2 Year plan today:
                </p>
              </div>
            )}

            {/* Reformatted list with indentation and rounded bullets */}
            <ul className="list-disc pl-8 space-y-4 text-md font-medium">
  <li>
    Enjoy a Referral Bonus <span className="font-bold text-blue-600 dark:text-blue-400">free upgrade to our Premium Service</span> with enhanced security, privacy and high speed gateways.
  </li>
  <li>
    Get an extra Referral Bonus <span className="font-bold text-blue-600 dark:text-blue-400">3 Months free</span> for a total of 31 months!
  </li>
</ul>


            {/* Extra space after the list items */}
            <div className="my-6" />

            {/* Changed promotion text color to dark gray */}
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-6">
              Promotion is linked to your CicadaVPN account and cannot be transferred to another person or order. 
              Promotion subject to change or end at any time.
            </p>

            {/* Updated button with fully rounded style and bg-primary */}
            <Button 
              className="w-full rounded-full bg-primary text-white dark:bg-green-500" 
              size="lg"
              onPress={handleSignUp}
            >
              Sign Up Now
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ReferPage;
