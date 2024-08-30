import React, { useState, useEffect } from "react";
import { FaChevronRight, FaUserShield, FaShareAlt, FaPlus } from "react-icons/fa"; // Import icons including FaPlus for adding new account
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
  const [creating, setCreating] = useState(false);

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
        .select("id, account_number, status, max_devices, created_at, expiry")
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

  const addNewAccount = async () => {
    setCreating(true);

    // Get the current user's session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error fetching session:", sessionError.message);
      setCreating(false);
      return;
    }

    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      console.error("User ID not found in session.");
      setCreating(false);
      return;
    }

    // Generate a unique account number (you can customize this logic)
    const accountNumber = `ACC-${Math.floor(Math.random() * 1000000)}`;

    // Create a new account for the user
    const { data: newAccount, error: createError } = await supabase
      .from("accounts")
      .insert([{ user_id: userId, account_number: accountNumber }])
      .single();

    if (createError) {
      console.error("Error creating new account:", createError.message);
    } else {
      // Update the accounts state to include the new account
      setAccounts([...accounts, newAccount]);
    }

    setCreating(false);
  };

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
            account ? ( // Add a null check for account
              <div key={index} className="mb-4">
                <button
                  className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
                  style={{ boxShadow: "none", border: "none" }}
                  onClick={() => console.log(`Account ${account.account_number || 'Unknown'} clicked`)}
                >
                  <div className="flex flex-col items-start">
                    <span>{`Account: ${account.account_number || 'Unknown'}`}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status: {account.status || 'Unknown'}, Max Devices: {account.max_devices || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Expiry: {account.expiry ? new Date(account.expiry).toLocaleString() : 'No expiry date'}
                    </p>
                  </div>
                  <FaChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ) : (
              <p key={index} className="text-red-500">Invalid account data</p> // Handle the case where account is null
            )
          ))
        ) : (
          <p>No accounts found.</p>
        )}
        {/* Add New Account Button */}
        <div className="mt-4">
          <button
            className="w-full flex justify-between items-center px-2 py-3 text-lg font-semibold rounded-md text-white bg-primary-600 hover:bg-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
            onClick={addNewAccount}
            disabled={creating}
          >
            <div className="flex items-center">
              <FaPlus className="w-5 h-5 text-white mr-2" />
              <span>{creating ? "Creating Account..." : "Add New Account"}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
