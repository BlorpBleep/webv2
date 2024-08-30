import React, { useState, useEffect } from "react";
import { FaChevronRight, FaTicketAlt } from "react-icons/fa";
import { supabase } from "@/utils/supabase"; // Ensure you have supabase client setup in your project

export default function Vouchers() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [redeeming, setRedeeming] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchersAndAccounts = async () => {
      setLoading(true);

      console.log("Fetching user session...");
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        setLoading(false);
        return;
      }

      const userId = sessionData?.session?.user?.id;
      console.log("User ID:", userId);

      if (!userId) {
        console.error("User ID not found in session.");
        setLoading(false);
        return;
      }

      console.log("Fetching accounts associated with the user...");
      const { data: accountsData, error: accountsError } = await supabase
        .from("accounts")
        .select("id, account_number, expiry")
        .eq("user_id", userId);

      if (accountsError || !accountsData) {
        console.error("Error fetching accounts:", accountsError?.message || "No accounts found.");
        setLoading(false);
        return;
      }

      console.log("Accounts fetched:", accountsData);
      setAccounts(accountsData);

      const accountNumbers = accountsData.map(account => account.account_number);
      console.log("Fetching vouchers associated with these accounts...", accountNumbers);
      const { data: vouchersData, error: vouchersError } = await supabase
        .from("vouchers")
        .select("id, code, duration_months, is_used, associated_account, created_at, used_at, status")
        .in("associated_account", accountNumbers);

      if (vouchersError) {
        console.error("Error fetching vouchers:", vouchersError.message);
      } else {
        console.log("Vouchers fetched:", vouchersData);
        setVouchers(vouchersData || []);
      }

      setLoading(false);
    };

    fetchVouchersAndAccounts();
  }, []);

  const handleVoucherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedInput = '';

    // Insert dash after every 4 characters
    for (let i = 0; i < input.length; i += 4) {
      if (formattedInput) formattedInput += '-';
      formattedInput += input.substring(i, i + 4);
    }

    setVoucherCode(formattedInput);
  };

  const redeemVoucher = async () => {
    if (voucherCode.length !== 19) return; // 16 characters + 3 dashes = 19

    setRedeeming(true);

    const cleanedVoucherCode = voucherCode.replace(/-/g, '');
    console.log("Attempting to redeem voucher with code:", cleanedVoucherCode);

    console.log("Fetching voucher details...");
    const { data: voucher, error: redeemError } = await supabase
      .from("vouchers")
      .select("id, duration_months")
      .eq("code", cleanedVoucherCode)
      .eq("is_used", false)
      .single();

    if (redeemError || !voucher) {
      console.error("Error redeeming voucher:", redeemError?.message || "Voucher not found or already used.");
      setRedeeming(false);
      return;
    }

    console.log("Voucher details fetched:", voucher);
    const { duration_months } = voucher;
    const currentDate = new Date();

    console.log("Updating expiry dates for all associated accounts...");
    const updatedAccounts = accounts.map(async account => {
      const currentExpiry = new Date(account.expiry || currentDate);
      const newExpiry = new Date(currentExpiry.setMonth(currentExpiry.getMonth() + duration_months));
      console.log(`Updating account ${account.account_number} with new expiry date:`, newExpiry);

      const { error: updateError } = await supabase
        .from("accounts")
        .update({ expiry: newExpiry.toISOString() })
        .eq("id", account.id);

      if (updateError) {
        console.error(`Error updating account ${account.account_number}:`, updateError.message);
      } else {
        console.log(`Account ${account.account_number} updated successfully.`);
      }
    });

    await Promise.all(updatedAccounts);

    console.log("Marking voucher as redeemed...");
    const { error: voucherUpdateError } = await supabase
      .from("vouchers")
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
        status: 'redeemed',
      })
      .eq("id", voucher.id);

    if (voucherUpdateError) {
      console.error("Error marking voucher as redeemed:", voucherUpdateError.message);
    } else {
      console.log("Voucher marked as redeemed successfully.");
      setVouchers(vouchers.map(v => v.id === voucher.id ? { ...v, is_used: true, used_at: new Date() } : v));
      setVoucherCode(""); // Clear the input field
    }

    setRedeeming(false);
  };

  // Determine button styles based on the state
  const isButtonActive = voucherCode.replace(/-/g, '').length === 16 && !redeeming;
  const buttonStyles = isButtonActive
    ? "bg-primary-600 hover:bg-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600 text-white"
    : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed";

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Vouchers</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Redeem a Voucher
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
        <div className="flex">
          <input
            type="text"
            value={voucherCode}
            onChange={handleVoucherInputChange}
            placeholder="Enter your voucher code"
            className="w-full px-4 py-2 text-lg border rounded-md dark:bg-gray-700 dark:text-white"
            maxLength={19} // Allow for 16 digits + 3 dashes
          />
          <button
            onClick={redeemVoucher}
            className={`ml-4 px-6 py-2 text-lg font-semibold rounded-md transition-colors ${buttonStyles}`}
            disabled={!isButtonActive}
          >
            {redeeming ? "Redeeming..." : "Redeem"}
          </button>
        </div>
      </div>

      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Your Vouchers
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        {loading ? (
          <p>Loading vouchers...</p>
        ) : vouchers.length > 0 ? (
          vouchers.map((voucher, index) => (
            <div key={index} className="mb-4">
              <div className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors">
                <div className="flex flex-col items-start">
                  <span>{`Voucher Code: ${voucher.code}`}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status: {voucher.status || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Associated Account: {voucher.associated_account || "None"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created At: {new Date(voucher.created_at).toLocaleString()}
                  </p>
                  {voucher.is_used && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Used At: {new Date(voucher.used_at).toLocaleString()}
                    </p>
                  )}
                </div>
                <FaChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ))
        ) : (
          <p>No vouchers found.</p>
        )}
      </div>
    </div>
  );
}
