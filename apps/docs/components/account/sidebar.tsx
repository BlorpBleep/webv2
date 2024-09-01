import React from "react";
import { FaRegCreditCard, FaLock, FaMobileAlt, FaUserFriends, FaRegUserCircle } from "react-icons/fa"; 

interface SidebarProps {
  onSelect: (section: string) => void;
  selected: string;
  onLogout: () => void;  // Add this to handle logout
}

export default function Sidebar({ onSelect, selected, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 shadow-md min-h-screen">
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
          onClick={() => onSelect("accounts")}
          className={`flex items-center gap-2 block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selected === "accounts" ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""
          }`}
        >
          <FaUserFriends size={20} />
          Accounts
        </button>
        <hr className="my-4 border-gray-300 dark:border-gray-700" />
        <button
          onClick={onLogout}
          className="flex items-center gap-2 block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 transition-colors"
        >
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
