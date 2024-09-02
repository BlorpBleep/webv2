import React from "react";
import {
  FaMobileAlt,
  FaUserFriends,
  FaTicketAlt,
  FaExchangeAlt,
  FaCreditCard,
  FaUserPlus,
  FaKey,
  FaShareAlt,
  FaLock,
  FaCogs,
  FaChevronRight,
} from "react-icons/fa";

interface QuickLinksProps {
  onSelectSection: (section: string) => void;
}

export default function QuickLinks({ onSelectSection }: QuickLinksProps) {
  console.log("QuickLinks rendered with onSelectSection:", onSelectSection);

  const links = [
    { text: "Devices", icon: FaMobileAlt, section: "devices" },
    { text: "Accounts", icon: FaUserFriends, section: "accounts" },
    { text: "Vouchers", icon: FaTicketAlt, section: "vouchers" },
    { text: "Change plan", icon: FaExchangeAlt },
    { text: "Payment method", icon: FaCreditCard },
    { text: "Buy extra", icon: FaUserPlus, new: true },
    { text: "Password", icon: FaKey },
    { text: "Transfer", icon: FaShareAlt },
    { text: "Controls", icon: FaLock },
    { text: "Settings", icon: FaCogs },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
        Quick links
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        {links.map((link, index) => (
          <div key={index} className="mb-4">
            {index > 0 && (
              <hr className="my-1 border-gray-200 dark:border-gray-700" />
            )}
            <button
              className="w-full flex justify-between items-center px-2 py-3 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
              style={{ boxShadow: 'none', border: 'none' }}
              onClick={() => {
                console.log("Button clicked for section:", link.section);
                if (link.section) {
                  onSelectSection(link.section);
                } else {
                  console.log(`${link.text} clicked`);
                }
              }}
            >
              <div className="flex items-center">
                <link.icon className="w-5 h-5 text-gray-500 mr-2" />
                <span>{link.text}</span>
                {link.new && (
                  <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">
                    New
                  </span>
                )}
              </div>
              <FaChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
