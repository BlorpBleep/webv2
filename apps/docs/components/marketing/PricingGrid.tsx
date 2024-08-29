import React from "react";
import { Card, Checkbox, Badge } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";

export const PricingGrid = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Centered Offers Grid */}
      <div className="flex flex-col md:flex-row md:gap-4 mt-6 w-full max-w-[60%] mx-auto justify-center items-center">
         
         {/* 1 Month Plan */}
         <Card className="flex-1 md:flex-none bg-white dark:bg-gray-900 rounded-lg p-12 flex flex-col justify-between h-[25vh] w-full md:w-[60%]">
          <div className="flex flex-col items-center justify-between text-center">
            <h3 className="text-sm sm:text-lg font-bold text-black dark:text-yellow-400">1 Month</h3>
            <div className="flex items-center mt-2">
              <p className="text-sm sm:text-4xl font-bold text-black dark:text-yellow-400">11.99 €/mo</p>
              <Checkbox className="ml-2" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">Billed 11.99 € every month</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">14-day money-back guarantee</div>
        </Card>       
        
        {/* 2 Years + 2 Months Plan - Middle on larger screens, Top on small screens */}
        <Card className="flex-1 md:flex-none bg-blue-900 dark:bg-blue-800 rounded-lg p-12 flex flex-col justify-between h-[30vh] relative w-full md:w-[70%]">

          <div className="flex flex-col items-center justify-between text-center">
            <h3 className="text-sm sm:text-lg font-bold text-white">2 Years + 2 Months</h3>
            <div className="flex items-center mt-2">
              <p className="text-xl sm:text-4xl font-bold text-white">2.19 €/mo</p>
              <Checkbox className="ml-2" defaultSelected />
            </div>
            <div className="text-sm text-gray-400 mt-4">Billed 56.94 € first 2 years</div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="bg-gray-200 rounded-lg px-4 py-2 text-yellow-400 text-center text-sm font-semibold">
              45-day money-back guarantee
            </div>
          </div>
        </Card>

        {/* 6 Months Plan */}
        <Card className="flex-1 md:flex-none bg-white dark:bg-gray-900 rounded-lg p-8 flex flex-col justify-between h-[25vh] w-full md:w-[60%]">
          <div className="flex flex-col items-center justify-between text-center">
            <h3 className="text-sm sm:text-lg font-bold text-black dark:text-yellow-400">6 Months</h3>
            <div className="flex items-center mt-2">
              <p className="text-sm sm:text-4xl font-bold text-black dark:text-yellow-400">6.99 €/mo</p>
              <Checkbox className="ml-2" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">Billed 41.94 € every 6 months</div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">45-day money-back guarantee</div>
        </Card>
      </div>

      {/* New Locations Bar */}
      <div className="flex justify-between items-center w-full bg-white border border-gray-300 rounded-md shadow p-6 mt-12 max-w-[100%] mx-auto">
        <div className="flex flex-col space-y-2">
          <div className="inline-flex items-center">
            <span className="bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-sm mr-2">New locations added</span>
          </div>
          <div className="text-black font-semibold flex items-center">
            <AiOutlineGlobal size={20} /> {/* React icon used here */}
            <span className="ml-2">Include a Dedicated IP to your VPN</span>
          </div>
          <div className="text-gray-600 text-sm">
            Upgrade your VPN experience with an IP address exclusively assigned to you.
          </div>
          <div>
            <a href="#" className="text-blue-500 font-bold">See available locations</a>
          </div>
        </div>
        <div className="h-full border-r border-gray-300 mx-6"></div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <span className="bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-sm">SAVE 50%</span>
            <span className="line-through text-gray-400">5.00 €/mo</span>
            <span className="text-2xl font-bold text-black">2.50 €/mo</span>
          </div>
          <Checkbox className="ml-2" />
        </div>
      </div>
    </div>
  );
};
