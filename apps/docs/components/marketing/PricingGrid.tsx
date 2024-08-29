"use client";

import React from "react";
import { Card, Checkbox, Badge } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";

export const PricingGrid = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Centered Offers Grid */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-6 w-full max-w-[60%] mx-auto justify-center items-center">
        {/* 2 Years + 2 Months Plan - Middle on larger screens, Top on small screens */}
        <Card className="order-2 md:order-2 flex-1 md:flex-none bg-blue-900 dark:bg-blue-800 rounded-lg p-6 flex flex-col justify-between h-[30vh] relative">
          <Badge 
            color="secondary" 
            variant="flat" 
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-3 sm:-translate-y-4" 
            style={{ 
              backgroundColor: '#FF9F1C', 
              color: 'black', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
            BEST VALUE - SAVE 82%
          </Badge>
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-lg font-bold text-white">2 Years + 2 Months</h3>
            <div className="flex items-center">
              <p className="text-sm sm:text-2xl font-bold text-white">2.19 €/mo</p>
              <Checkbox className="ml-2" defaultSelected />
            </div>
          </div>
          {/* Hidden on small screens */}
          <div className="hidden sm:block">
            <p className="text-sm text-gray-400 mt-2">Billed 56.94 € first 2 years</p>
            <p className="text-sm text-gray-400">45-day money-back guarantee</p>
          </div>
        </Card>

        {/* 1 Month Plan */}
        <Card className="order-1 md:order-1 flex-1 md:flex-none bg-white dark:bg-gray-900 rounded-lg p-6 flex flex-col justify-between h-[25vh]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-lg font-bold text-black dark:text-yellow-400">1 Month</h3>
            <div className="flex items-center">
              <p className="text-sm sm:text-2xl font-bold text-black dark:text-yellow-400">11.99 €/mo</p>
              <Checkbox className="ml-2" />
            </div>
          </div>
          {/* Hidden on small screens */}
          <div className="hidden sm:block">
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Billed 11.99 € every month</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">14-day money-back guarantee</p>
          </div>
        </Card>

        {/* 6 Months Plan */}
        <Card className="order-3 md:order-3 flex-1 md:flex-none bg-white dark:bg-gray-900 rounded-lg p-6 flex flex-col justify-between h-[25vh]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-lg font-bold text-black dark:text-yellow-400">6 Months</h3>
            <div className="flex items-center">
              <p className="text-sm sm:text-2xl font-bold text-black dark:text-yellow-400">6.99 €/mo</p>
              <Checkbox className="ml-2" />
            </div>
          </div>
          {/* Hidden on small screens */}
          <div className="hidden sm:block">
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Billed 41.94 € every 6 months</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">45-day money-back guarantee</p>
          </div>
        </Card>
      </div>

      {/* New Locations Bar */}
      <div className="flex justify-between items-center w-full bg-white border border-gray-300 rounded-md shadow p-6 mt-4 max-w-[60%] mx-auto">
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
