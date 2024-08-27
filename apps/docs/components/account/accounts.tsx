import React, { useState, useEffect } from "react";
import { FaChevronRight, FaUserShield, FaShareAlt } from "react-icons/fa"; // Import icons from react-icons
import { supabase } from "@/utils/supabase"; // Ensure you have supabase client setup in your project

export default function Accounts() {
  const parentalControls = [
    {
      text: "Adjust parental controls",
      icon: FaUserShield,
      description: "Set maturity ratings, block titles",
    },
    {
      text: "Transfer a profile",
      icon: FaShareAlt,
      description: "Copy a profile to another account",
    },
  ];

  // State to store accounts data fetched from Supabase
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);

      // Get the current user's session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError.message);
        setLoading(false);
        return;
      }

      const userId = sessionData?.session?.user?.id;

      if (!userId) {
        console.error("User ID not found in session.");
        setLoading(false);
        return;
      }

      // Fetch accounts data from Supabase where user_id matches the logged-in user's ID
      const { data: accountsData, error: accountsError } = await supabase
        .from("accounts")
        .select("account_number, status, max_devices, created_at")
        .eq("user_id", userId);

      if (accountsError) {
        console.error("Error fetching accounts:", accountsError.message);
      } else {
        setAccounts(accountsData || []); // Set the accounts data
      }

      setLoading(false);
    };

    fetchAccounts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Accounts</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Manage account
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
        <h2 className="text-xl font-medium mb-4">Parental controls and permissions</h2>
        {parentalControls.map((item, index) => (
          <div key={index} className="mb-4">
            {index > 0 && (
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
            )}
            <button
              className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
              style={{ boxShadow: "none", border: "none" }}
              onClick={() => console.log(`${item.text} clicked`)}
            >
              <div className="flex items-center">
                <item.icon className="w-6 h-6 text-gray-500 mr-4" />
                <div>
                  <span>{item.text}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
              <FaChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Account list
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        
        <h2 className="text-xl font-medium mb-4">Account list</h2>
        {loading ? (
          <p>Loading accounts...</p>
        ) : accounts.length > 0 ? (
          accounts.map((account, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
                style={{ boxShadow: "none", border: "none" }}
                onClick={() => console.log(`Account ${account.account_number} clicked`)}
              >
                <div className="flex items-center">
                  <span>{`Account: ${account.account_number}`}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                    Status: {account.status}, Max Devices: {account.max_devices}
                  </p>
                </div>
                <FaChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))
        ) : (
          <p>No accounts found.</p>
        )}
      </div>
    </div>
  );
}
