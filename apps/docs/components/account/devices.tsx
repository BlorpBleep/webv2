import React, { useEffect, useState } from "react";
import { FaChevronRight, FaMobileAlt, FaDownload, FaTrash } from "react-icons/fa"; // Import icons
import { supabase } from "@/utils/supabase"; // Import supabase client

export default function Devices() {
  const [devicesData, setDevicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
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

      // Fetch accounts associated with the user
      const { data: accountsData, error: accountsError } = await supabase
        .from("accounts")
        .select("account_number")
        .eq("user_id", userId);

      if (accountsError) {
        console.error("Error fetching accounts:", accountsError.message);
        setLoading(false);
        return;
      }

      // Extract the account numbers
      const accountNumbers = accountsData?.map(account => account.account_number);

      if (accountNumbers.length > 0) {
        // Fetch devices associated with the user's accounts
        const { data: devicesData, error: devicesError } = await supabase
          .from("devices")
          .select("id, name, ipv4_address, ipv6_address, last_active, event_type, account_number")
          .in("account_number", accountNumbers);

        if (devicesError) {
          console.error("Error fetching devices:", devicesError.message);
        } else {
          setDevicesData(devicesData || []); // Set the devices data
        }
      }

      setLoading(false);
    };

    fetchDevices();
  }, []);

  const handleDeleteDevice = async (deviceId: string) => {
    const { error } = await supabase
      .from('devices')
      .delete()
      .eq('id', deviceId);

    if (error) {
      console.error("Error deleting device:", error.message);
    } else {
      setDevicesData(prevDevices => prevDevices.filter(device => device.id !== deviceId));
    }
  };

  const deviceItems = [
    {
      text: "Devices",
      icon: FaMobileAlt,
      description: "Manage signed-in devices",
    },
    {
      text: "Mobile download devices",
      icon: FaDownload,
      description: `Using ${devicesData.length} of 6 download devices`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Devices</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Device details
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">

        {/* Display fetched devices */}
        <h2 className="text-xl font-medium mb-4">Registered Devices</h2>
        {loading ? (
          <p>Loading devices...</p>
        ) : devicesData.length > 0 ? (
          devicesData.map((device, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <FaMobileAlt className="w-6 h-6 text-gray-500 mr-4" />
                  <div>
                    <span>{device.name}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      IPv4: {device.ipv4_address}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      IPv6: {device.ipv6_address}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last Active: {device.last_active}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaTrash
                    className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDeleteDevice(device.id)}
                  />
                  <FaChevronRight className="w-5 h-5 text-gray-500 ml-4" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No devices found.</p>
        )}
      </div>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-medium mb-4">Mobile downloads</h2>
        {deviceItems.slice(1, 2).map((item, index) => (
          <div key={index} className="mb-4">
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
    </div>
  );
}
