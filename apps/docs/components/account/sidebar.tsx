"use client";

import React from "react";
import { FaRegCreditCard, FaLock, FaMobileAlt, FaUserFriends, FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  onSelect: (section: string) => void;
  selected: string;
  onLogout: () => void; // Added prop for logout functionality
}

export default function Sidebar({ onSelect, selected, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 shadow-md">
      <nav className="space-y-1 mt-4">
        <button
          onClick={() => onSelect("overview")}
          className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selected === "overview" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
          }`}
        >
          <FaRegUserCircle size={20} />
          Overview
        </button>
        <button
          onClick={() => onSelect("membership")}
          className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selected === "membership" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
          }`}
        >
          <FaRegCreditCard size={20} />
          Membership
        </button>
        <button
          onClick={() => onSelect("security")}
          className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selected === "security" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
          }`}
        >
          <FaLock size={20} />
          Security
        </button>
        <button
          onClick={() => onSelect("devices")}
          className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selected === "devices" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
          }`}
        >
          <FaMobileAlt size={20} />
          Devices
        </button>
        <button
          onClick={() => onSelect("profiles")}
          className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selected === "profiles" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
          }`}
        >
          <FaUserFriends size={20} />
          Profiles
        </button>
        {/* Logout button below Profiles */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-red-400"
        >
          <FaSignOutAlt size={20} />
          Logout
        </button>
      </nav>
    </div>
  );
}
