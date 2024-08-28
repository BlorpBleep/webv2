"use client";

import React from "react";
import { Card, Checkbox, Badge } from "@nextui-org/react";

export const PricingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-5xl mx-auto">
      <Card className="relative border-transparent bg-white dark:bg-gray-900 backdrop-blur-lg rounded-lg p-6 flex flex-col justify-between h-[250px]">
        <Checkbox className="absolute top-4 right-4" />
        <div className="text-center">
          <h3 className="text-lg font-bold text-black dark:text-yellow-400">1 Month</h3>
          <p className="text-2xl font-bold text-black dark:text-yellow-400">11.99 €/mo</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Billed 11.99 € every month</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">14-day money-back guarantee</p>
        </div>
      </Card>
      <Card className="relative border-2 border-yellow-500 bg-blue-900 dark:bg-blue-800 rounded-lg p-6 flex flex-col justify-between h-[250px]">
        <Checkbox className="absolute top-4 right-4" defaultSelected />
        <Badge 
          color="secondary" 
          variant="flat" 
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-3" 
          style={{ 
            backgroundColor: '#FF9F1C', // A bright yellow color to match the theme
            color: 'black', 
            padding: '4px 12px', 
            borderRadius: '999px', 
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
          BEST VALUE - SAVE 82%
        </Badge>
        <div className="text-center">
          <h3 className="text-lg font-bold text-white">2 Years + 2 Months</h3>
          <p className="text-2xl font-bold text-white">2.19 €/mo</p>
          <p className="text-sm text-gray-400 mt-2">Billed 56.94 € first 2 years</p>
          <p className="text-sm text-gray-400">45-day money-back guarantee</p>
        </div>
      </Card>
      <Card className="relative border-transparent bg-white dark:bg-gray-900 backdrop-blur-lg rounded-lg p-6 flex flex-col justify-between h-[250px]">
        <Checkbox className="absolute top-4 right-4" />
        <div className="text-center">
          <h3 className="text-lg font-bold text-black dark:text-yellow-400">6 Months</h3>
          <p className="text-2xl font-bold text-black dark:text-yellow-400">6.99 €/mo</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Billed 41.94 € every 6 months</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">45-day money-back guarantee</p>
        </div>
      </Card>
      {/* New locations added bar */}
      <div className="col-span-3 w-full mt-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-6 text-center rounded-md border-t border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <div>
          New locations added! <span className="font-bold">Include a Dedicated IP to your VPN</span>
          <span className="block mt-2 text-sm">
            Upgrade your VPN experience with an IP address exclusively assigned to you.
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 dark:text-gray-500 text-xs">Save 50%</span>
          <span className="text-yellow-400 font-bold ml-2 text-lg">- 2.50 €/mo</span>
        </div>
      </div>
    </div>
  );
};
