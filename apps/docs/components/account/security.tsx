import React, { useState, useEffect } from "react";
import { FaChevronRight, FaLock, FaEnvelope, FaMobileAlt } from "react-icons/fa"; // Import icons
import { supabase } from "@/utils/supabase"; // Import supabase client

export default function Security() {
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    const fetchEmail = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user email:", error.message);
      } else {
        setEmail(data.user?.email || "Needs verification");
      }
    };

    fetchEmail();
  }, []);

  const securityItems = [
    { text: "Password", icon: FaLock },
    { text: "Email", icon: FaEnvelope, description: email || "Needs verification" },
    { text: "Mobile phone", icon: FaMobileAlt, description: "021 510 168" },
  ];

  const privacyItems = [
    { text: "Access and devices", description: "Manage signed-in devices" },
    { text: "Profile transfer", description: "On", new: true },
    { text: "Personal info access", description: "Request a copy of your personal info" },
    { text: "Feature testing", description: "On" },
  ];

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Security</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">Security details</h2>
      
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
        <h2 className="text-xl font-medium mb-4">Account Details</h2>
        {securityItems.map((item, index) => (
          <div key={index} className="mb-4">
            {index > 0 && (
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
            )}
            <button
              className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-left text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
              style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
              onClick={() => console.log(`${item.text} clicked`)}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 text-gray-500 mr-2" />
                <span>{item.text}</span>
              </div>
              {item.description && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                  {item.description}
                </span>
              )}
              <FaChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
        <h2 className="text-xl font-medium mb-4">Access and privacy</h2>
        {privacyItems.map((item, index) => (
          <div key={index} className="mb-4">
            {index > 0 && (
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
            )}
            <button
              className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-left text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
              style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
              onClick={() => console.log(`${item.text} clicked`)}
            >
              <div className="flex items-center">
                <span>{item.text}</span>
              </div>
              {item.new && (
                <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">New</span>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">{item.description}</span>
              <FaChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => console.log("Delete account clicked")}
          className="w-full py-3 text-lg font-semibold text-red-600 border border-red-600 rounded-md bg-transparent hover:bg-red-50 transition-colors"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}
