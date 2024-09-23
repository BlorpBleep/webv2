import React, { useState, useEffect } from "react";
import { FaChevronRight, FaUserShield, FaShareAlt, FaPlus, FaTrash } from "react-icons/fa"; 
import { supabase } from "@/utils/supabaseClient";

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

  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      console.log("Fetching accounts...");
      setLoading(true);

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

      const { data: accountsData, error: accountsError } = await supabase
        .from("accounts")
        .select("id, account_number, status, max_devices, created_at, expiry")
        .eq("user_id", userId);

      if (accountsError) {
        console.error("Error fetching accounts:", accountsError.message);
      } else {
        console.log("Accounts fetched:", accountsData);
        setAccounts(accountsData || []);
      }

      setLoading(false);
    };

    fetchAccounts();
  }, []);

  const addNewAccount = async () => {
    console.log("Adding new account...");
    setCreating(true);

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

    const accountNumber = `ACC-${Math.floor(Math.random() * 1000000)}`;
    console.log("Generated account number:", accountNumber);

    const { data: newAccount, error: createError } = await supabase
      .from("accounts")
      .insert([{ user_id: userId, account_number: accountNumber }])
      .single();

    if (createError) {
      console.error("Error creating new account:", createError.message);
    } else {
      console.log("New account created:", newAccount);
      setAccounts([...accounts, newAccount]);
    }

    setCreating(false);
  };

  const confirmDeleteAccount = (account: any) => {
    console.log("Confirm delete account:", account);
    setSelectedAccount(account);
  };

  const deleteAccount = async () => {
    if (!selectedAccount) return;

    console.log("Deleting account:", selectedAccount.account_number);
    setDeleting(true);

    const { error: deleteError } = await supabase
      .from("accounts")
      .update({
        status: 'inactive',
        marked_inactive_by_user: new Date().toISOString(),
      })
      .eq("id", selectedAccount.id);

    if (deleteError) {
      console.error("Error marking account as inactive:", deleteError.message);
    } else {
      console.log("Account marked as inactive:", selectedAccount.account_number);
      setAccounts(accounts.map(account => account.id === selectedAccount.id ? { ...account, status: 'inactive', marked_inactive_by_user: new Date().toISOString() } : account));
    }

    setDeleting(false);
    setSelectedAccount(null); // Close the modal after deletion
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
            account ? (
              <div key={index} className="mb-4 flex items-center justify-between">
                <button
                  className="flex-grow flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
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
                <button
                  className="ml-4 px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                  onClick={() => confirmDeleteAccount(account)}
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <p key={index} className="text-red-500">Invalid account data</p>
            )
          ))
        ) : (
          <p>No accounts found.</p>
        )}
      </div>

      {selectedAccount && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Confirm Delete</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Are you sure you want to mark the following account as inactive?
            </p>
            <div className="mb-4">
              <p><strong>Account:</strong> {selectedAccount.account_number}</p>
              <p><strong>Status:</strong> {selectedAccount.status}</p>
              <p><strong>Max Devices:</strong> {selectedAccount.max_devices}</p>
              <p><strong>Expiry:</strong> {selectedAccount.expiry ? new Date(selectedAccount.expiry).toLocaleString() : 'No expiry date'}</p>
            </div>
            <div className="flex justify-end">
              <button
                className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                onClick={() => setSelectedAccount(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                onClick={deleteAccount}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}