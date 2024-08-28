"use client";

import React, { useEffect, useState } from "react";
import { PricingGrid } from "@/components/marketing/PricingGrid";

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
      <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black">
        <section className="w-full flex flex-col items-center lg:px-16 mt-12 gap-6">
          <div className="text-center max-w-2xl">
            <h1 className="mb-4 font-bold text-[32px] leading-[40px] text-black dark:text-yellow-400">
              Buy a VPN for Enhanced Privacy: 2 Years for 2.19 €/mo
            </h1>
            <h5 className="text-gray-700 dark:text-yellow-400 text-lg">
              Offer Ends In {`${timeLeft.hours}Hrs:${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
            </h5>
          </div>
          <PricingGrid />
          <div className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
            *All amounts shown are in Euros. Taxes may apply based on your jurisdiction.
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Selected Subscriptions:</div>
            <div className="text-black dark:text-white font-bold text-sm">CyberGhost VPN - 2 Years + 2 Months FREE</div>
            <button className="bg-green-500 text-white font-bold py-2 px-8 rounded-lg text-sm">
              Continue to Checkout &rarr;
            </button>
          </div>
        </section>
        <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
          See What’s Included in All Plans
        </div>
      </main>
    </>
  );
}
