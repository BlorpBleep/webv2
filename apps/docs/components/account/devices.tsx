import React from "react";
import { FaChevronRight, FaMobileAlt, FaDownload } from "react-icons/fa"; // Import icons

export default function Devices() {
  const deviceItems = [
    {
      text: "Access and devices",
      icon: FaMobileAlt,
      description: "Manage signed-in devices",
    },
    {
      text: "Mobile download devices",
      icon: FaDownload,
      description: "Using 0 of 6 download devices",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Devices</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
      Device details
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
        <h2 className="text-xl font-medium mb-4">Account access</h2>
        {deviceItems.slice(0, 1).map((item, index) => (
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
