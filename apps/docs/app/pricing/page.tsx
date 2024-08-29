"use client";

import React, { useEffect, useState } from "react";
import { PricingGrid } from "@/components/marketing/PricingGrid";
import { Checkbox } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";  // Importing the icon

// Function to calculate time remaining
const calculateTimeLeft = (expiryTime: Date): { hours: string; minutes: string; seconds: string } => {
  const difference = +new Date(expiryTime) - +new Date();
  let timeLeft = {
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, "0"),
      minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
      seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
    };
  }

  return timeLeft;
};

export default function PricingPage() {
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string }>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const jwtExpiryTime = new Date();
    jwtExpiryTime.setMinutes(jwtExpiryTime.getMinutes() + 60); // Set expiry time to 60 minutes from now

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(jwtExpiryTime));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <main className="relative container mx-auto w-full sm:w-[90%] lg:w-[70%] z-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black">
        <section className="w-full flex flex-col items-center mt-12 gap-6 mx-auto">
          <div className="text-center w-full">
            <h1 className="mb-4 font-bold text-[28px] sm:text-[32px] leading-[34px] sm:leading-[40px] text-black dark:text-yellow-400">
              Buy a VPN for Enhanced Privacy: 2 Years for 2.19 €/mo
            </h1>
            <h5 className="text-gray-700 dark:text-yellow-400 text-base sm:text-lg">
              Offer Ends In {`${timeLeft.hours}Hrs:${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
            </h5>
          </div>
          
          <PricingGrid />
          
          {/* Restyled New Locations Bar */}
          <div className="flex justify-between items-center w-full lg:max-w-[65%] xl:max-w-[60%] bg-white border border-gray-300 rounded-md shadow p-6 mt-4 mx-auto">
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

          <div className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
            *All amounts shown are in Euros. Taxes may apply based on your jurisdiction.
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <button className="bg-yellow-500 text-white font-bold py-2 px-8 rounded-lg text-sm">
              Get plan
            </button>
          </div>
        </section>
        <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
          See What’s Included in All Plans
        </div>
        <div className="flex justify-between items-center mt-8 px-8 py-4 bg-gray-100 dark:bg-gray-900">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Selected Subscriptions:
          </div>
          <div className="text-black dark:text-white font-bold text-sm">
            CyberGhost VPN - 2 Years + 2 Months FREE
          </div>
          <button className="bg-green-500 text-white font-bold py-2 px-8 rounded-lg text-sm">
            Continue to Checkout →
          </button>
        </div>
      </main>
    </>
  );
}
