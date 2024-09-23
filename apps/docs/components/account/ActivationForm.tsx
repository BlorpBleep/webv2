"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

// Define the structure of successData
interface SuccessData {
  accountNumber: string;
  email: string;
  voucherCode: string;
  durationMonths: number;
}

export default function ActivationForm({ onClose }) {
  const [activationKey, setActivationKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const router = useRouter();

  // Generate random 16-digit account number
  const generateAccountNumber = () => {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(); // Random 16-digit number
  };

  // Format the key with dashes (every 4 digits)
  const handleInputChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedInput = "";

    // Insert dash after every 4 characters
    for (let i = 0; i < input.length; i += 4) {
      if (formattedInput) formattedInput += "-";
      formattedInput += input.substring(i, i + 4);
    }

    setActivationKey(formattedInput);
  };

  const generateUniqueAccountNumber = async () => {
    let accountNumber;
    let isUnique = false;

    // Keep generating account numbers until we find a unique one
    while (!isUnique) {
      accountNumber = generateAccountNumber();

      const { data: existingAccount, error: checkError } = await supabase
        .from("accounts")
        .select("id")
        .eq("account_number", accountNumber)
        .single();

      if (!existingAccount) {
        isUnique = true;
      } else if (checkError) {
        throw new Error("Error checking account number uniqueness.");
      }
    }

    return accountNumber;
  };

  // Clean the key (remove dashes) before sending it to Supabase
  const handleActivation = async () => {
    const cleanedKey = activationKey.replace(/-/g, ""); // Remove all dashes
    if (cleanedKey.length !== 16) {
      setError("The activation key must be 16 digits long.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Check if the voucher exists and is unused
      const { data: voucher, error } = await supabase
        .from("vouchers")
        .select("*")
        .eq("code", cleanedKey)
        .eq("is_used", false)
        .single();

      if (error || !voucher) {
        setError("Invalid activation key or already used. Please try again.");
        setIsLoading(false);
        return;
      }

      // Step 2: Get the user details from the session (JWT)
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.session) {
        setError("Failed to retrieve user session. Please log in again.");
        setIsLoading(false);
        return;
      }

      const user = session.session.user;
      const userId = user.id;
      const userEmail = user.email;

      // Step 3: Generate a unique 16-digit account number
      const accountNumber = await generateUniqueAccountNumber();

      // Step 4: Create a new account for the user
      const { data: newAccount, error: accountError } = await supabase
        .from("accounts")
        .insert([
          {
            user_id: userId, // Link the account to the logged-in user
            account_number: accountNumber, // Set the unique 16-digit account number
            expiry: new Date(), // Set the initial expiry date
          },
        ])
        .select()
        .single();

      if (accountError || !newAccount) {
        setError("Error creating a new account. Please try again later.");
        setIsLoading(false);
        return;
      }

      // Step 5: Associate the new account with the voucher and mark it as used
      const { error: voucherUpdateError } = await supabase
        .from("vouchers")
        .update({
          is_used: true,
          used_at: new Date().toISOString(),
          associated_account: newAccount.account_number, // Associate the new account with the voucher
          status: "redeemed",
        })
        .eq("id", voucher.id);

      if (voucherUpdateError) {
        setError("Error associating the voucher with the account. Please try again later.");
        setIsLoading(false);
        return;
      }

      // Step 6: Store success data in the state to display in the modal
      setSuccessData({
        accountNumber: newAccount.account_number,
        email: userEmail ?? "", // Provide a fallback empty string if it's undefined

        voucherCode: voucher.code,
        durationMonths: voucher.duration_months,
      });

    } catch (err) {
      setError("Unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

// Function to close the modal and reload the page to fetch updated data
    const handleCloseModal = () => {
      setSuccessData(null);
      window.location.reload(); // Reload the page to update the state
    };


  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6 mt-4">
      <h2 className="text-xl font-bold mb-2">Enter Activation Key</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={activationKey}
          onChange={handleInputChange}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          maxLength={19} // 16 digits + 3 dashes
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleActivation}
            className={`bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Activating..." : "Activate"}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 max-w-lg mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Activation Successful!</h3>
            <p className="mb-4">Your account has been successfully activated with the following details:</p>
            <ul className="text-left space-y-2">
              <li><strong>Account Number:</strong> {successData.accountNumber}</li>
              <li><strong>Email:</strong> {successData.email}</li>
              <li><strong>Voucher Code:</strong> {successData.voucherCode}</li>
              <li><strong>Voucher Duration:</strong> {successData.durationMonths} months</li>
            </ul>
            <div className="mt-6">
              <button onClick={handleCloseModal} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
