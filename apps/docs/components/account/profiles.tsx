import React from "react";
import { FaChevronRight, FaUserShield, FaShareAlt } from "react-icons/fa"; // Import icons from react-icons

export default function Profiles() {
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

  const profiles = [
    { name: "Loading...", avatar: "avatars/avatar-1.png" },
    { name: "Director ejecutivo de la casa", avatar: "/avatars/avatar-2.png" },
    { name: "Parásito uno", avatar: "avatars/avatar-3.png" },
    { name: "Parásito dos", avatar: "avatars/avatar-4.png" },
    { name: "Dummy", avatar: "avatars/avatar-5.png" },
  ];

  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Profiles</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
      Profile details
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

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-xl font-medium mb-4">Profile settings</h2>
        {profiles.map((profile, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
              style={{ boxShadow: "none", border: "none" }}
              onClick={() => console.log(`${profile.name} clicked`)}
            >
              <div className="flex items-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <span>{profile.name}</span>
              </div>
              <FaChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
