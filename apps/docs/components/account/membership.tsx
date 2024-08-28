import React from "react";
import { FaChevronRight } from "react-icons/fa"; // Import ChevronRight icon

export default function Membership() {
  return (
    <div className="max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Membership</h1>
      <h2 className="text-l font-medium mb-4 text-gray-700 dark:text-gray-400">
      Membership details
      </h2>
      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 mb-6">
        <h2 className="text-2xl font-semibold mb-2">Premium plan</h2>
        <p className="text-gray-500 dark:text-gray-400">
          4K video resolution with spatial audio, ad-free watching and more.
        </p>

        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <div className="mt-4">
          <button
            onClick={() => console.log("Change plan clicked")}
            className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
            style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
          >
            <span>Change plan</span>
            <FaChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => console.log("Buy an extra member slot clicked")}
            className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
            style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
          >
            <span>Add more time</span>
            <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">New</span>
            <FaChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Payment info</h2>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Next payment: 5 September 2024
        </p>
        <div className="flex items-center mb-4">
          <p className="text-gray-900 dark:text-white">VISA •••• 4485</p>
        </div>

        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <div className="mt-4">
          <button
            onClick={() => console.log("Manage payment method clicked")}
            className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
            style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
          >
            <span>Manage payment method</span>
            <FaChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => console.log("Redeem gift or promo code clicked")}
            className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
            style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
          >
            <span>Redeem gift or promo code</span>
            <FaChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => console.log("View payment history clicked")}
            className="w-full flex justify-between items-center px-1 py-2 text-lg font-semibold rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
            style={{ boxShadow: 'none', border: 'none' }} // Remove shadow and border
          >
            <span>View payment history</span>
            <FaChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => console.log("Cancel membership clicked")}
          className="w-full py-3 text-lg font-semibold text-red-600 border border-red-600 rounded-md bg-transparent hover:bg-red-50 transition-colors"
        >
          Cancel membership
        </button>
      </div>
    </div>
  );
}
