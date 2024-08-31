import React, { useState, useEffect } from "react";
import { FaChevronRight, FaPlus, FaTrash, FaUser, FaCheckCircle, FaDesktop, FaCalendarAlt } from "react-icons/fa";
import { supabase } from "@/utils/supabase";

export default function Accounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    console.log("Fetching active accounts...");
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
      .eq("user_id", userId)
      .eq("status", "active");

    if (accountsError) {
      console.error("Error fetching accounts:", accountsError.message);
    } else {
      console.log("Active accounts fetched:", accountsData);
      setAccounts(accountsData || []);
    }

    setLoading(false);
  };

  const generateUniqueAccountNumber = async () => {
    let isUnique = false;
    let accountNumber = "";

    while (!isUnique) {
      accountNumber = `${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
      console.log("Generated account number:", accountNumber);

      const { data: existingAccount } = await supabase
        .from("accounts")
        .select("id")
        .eq("account_number", accountNumber)
        .single();

      if (!existingAccount) {
        isUnique = true;
      } else {
        console.log("Account number already exists, generating a new one...");
      }
    }

    return accountNumber;
  };

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

    const accountNumber = await generateUniqueAccountNumber();

    const { data: newAccount, error: createError } = await supabase
      .from("accounts")
      .insert([{ user_id: userId, account_number: accountNumber }])
      .single();

    if (createError) {
      console.error("Error creating new account:", createError.message);
    } else {
      console.log("New account created:", newAccount);
      await fetchAccounts();  // Reload the accounts after adding a new one
      setShowAccountDetails(true);
      setSelectedAccount(newAccount);
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
      await fetchAccounts(); // Reload the accounts after deletion
    }

    setDeleting(false);
    setSelectedAccount(null); // Close the modal after deletion
  };

  const viewAccountDetails = (account: any) => {
    setSelectedAccount(account);
    setShowAccountDetails(true);
  };

  const closeAccountDetailsModal = () => {
    setShowAccountDetails(false);
    setSelectedAccount(null);
  };

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Accounts</h1>
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
              <div key={index} className="mb-4">
                <div className="flex items-center mb-4">
                  <FaUser className="text-gray-500 dark:text-gray-400 w-6 h-6 mr-4" />
                  <span className="text-lg font-semibold text-gray-700 dark:text-white">{`Account: ${account.account_number || 'Unknown'}`}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <FaCheckCircle className="mr-2" />
                  <span>Status: {account.status || 'Unknown'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <FaDesktop className="mr-2" />
                  <span>Max Devices: {account.max_devices || 'Unknown'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>Expiry: {account.expiry ? new Date(account.expiry).toLocaleString() : 'No expiry date'}</span>
                </div>
                <button
                  className="w-full flex justify-between items-center px-2 py-2 text-sm font-semibold rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors"
                  style={{ boxShadow: "none", border: "none" }}
                  onClick={() => viewAccountDetails(account)}
                >
                  View Details
                  <FaChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
              </div>
            ) : (
              <p key={index} className="text-red-500">Invalid account data</p>
            )
          ))
        ) : (
          <p>No accounts found.</p>
        )}
{/*         <div className="mt-4">
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
        </div> */}
      </div>

      {selectedAccount && showAccountDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Account Details</h2>
            <div className="mb-4">
              <p><strong>Account:</strong> {selectedAccount.account_number}</p>
              <p><strong>Status:</strong> {selectedAccount.status}</p>
              <p><strong>Max Devices:</strong> {selectedAccount.max_devices}</p>
              <p><strong>Expiry:</strong> {selectedAccount.expiry ? new Date(selectedAccount.expiry).toLocaleString() : 'No expiry date'}</p>
              <p><strong>Created At:</strong> {new Date(selectedAccount.created_at).toLocaleString()}</p>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
                onClick={closeAccountDetailsModal}
              >
                Close
              </button>
              <button
                className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                onClick={() => confirmDeleteAccount(selectedAccount)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAccount && !showAccountDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
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
