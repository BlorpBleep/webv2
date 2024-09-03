"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";

// Function to calculate time remaining
const calculateTimeLeft = (expiryTime: Date) => {
  const difference = +new Date(expiryTime) - +new Date();
  let timeLeft = {
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
      seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
    };
  }

  return timeLeft;
};

export default function PricingPage() {
  const [timeLeft, setTimeLeft] = useState({
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
      <main className="relative container mx-auto w-full sm:w-[90%] lg:w-[70%] z-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black pt-8">
        <section className="w-full flex flex-col items-center mt-4 sm:mt-6 gap-6 sm:gap-8 mx-auto">
          <div className="text-center w-full mb-4 sm:mb-8">
            <h1 className="mb-4 font-bold text-[28px] sm:text-[36px] leading-[34px] sm:leading-[40px] text-black dark:text-white">
              Buy a VPN <span className="text-blue-600">to Unblock the Web</span>:{" "}
              <span className="text-green-600">2 Years for 2.19 €/mo</span>
            </h1>
            <h2 className="text-white text-xl sm:text-2xl">
  Offer Ends In{" "}
  <span className="text-red-600">
    {`${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
  </span>
</h2>

          </div>

          {/* Offer Boxes */}
          <div className="flex flex-wrap justify-center gap-6 items-start">
            {/* Best Value Offer - Displayed first on small screens */}
            <div className="order-1 sm:order-2 border border-green-600 p-6 rounded-lg bg-gradient-to-br from-green-500 to-green-700 max-w-md flex flex-col justify-between shadow-lg relative sm:min-h-[400px] min-h-[300px] sm:self-center">
              <div className="absolute top-0 left-0 bg-green-700 text-white px-4 py-1 text-xs font-bold rounded-tl-lg rounded-br-lg">
                Best Value
              </div>
              <AiOutlineGlobal size={50} className="text-white mb-6" />
              <h3 className="text-xl font-bold text-white">
                Cicada VPN - 2 Years + 2 Months FREE
              </h3>
              <p className="text-gray-200 mt-2 flex-grow">
                2.19 €/mo for enhanced privacy and global access.
              </p>
              <a
                href="https://buy.stripe.com/28oaFgeuafU1acwbIM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-8 rounded-lg text-sm flex items-center mt-4 w-[60%] mx-auto justify-center"
              >
                Checkout →
              </a>
            </div>

            {/* Standard Offer */}
            <div className="order-2 sm:order-1 border border-gray-300 dark:border-gray-600 p-6 rounded-lg bg-gray-50 dark:bg-gray-900 max-w-sm flex flex-col justify-between shadow-md sm:min-h-[300px] min-h-[300px] sm:self-center">
              <AiOutlineGlobal size={40} className="text-gray-600 mb-4" />
              <h3 className="text-lg font-bold text-black dark:text-white">
                Cicada VPN - 1 Year Plan
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2 flex-grow">
                3.49 €/mo for 1 year of secure VPN access.
              </p>
              <a
                href="https://buy.stripe.com/28oaFgeuafU1acwbIM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-lg text-sm flex items-center mt-4 w-[60%] mx-auto justify-center"
              >
                Checkout →
              </a>
            </div>

            {/* Basic Offer */}
            <div className="order-3 border border-gray-300 dark:border-gray-600 p-6 rounded-lg bg-gray-50 dark:bg-gray-900 max-w-sm flex flex-col justify-between shadow-md sm:min-h-[300px] min-h-[300px] sm:self-center">
              <AiOutlineGlobal size={40} className="text-gray-600 mb-4" />
              <h3 className="text-lg font-bold text-black dark:text-white">
                Cicada VPN - 6 Months Plan
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2 flex-grow">
                5.99 €/mo for 6 months of VPN protection.
              </p>
              <a
                href="https://buy.stripe.com/28oaFgeuafU1acwbIM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-lg text-sm flex items-center mt-4 w-[60%] mx-auto justify-center"
              >
                Checkout →
              </a>
            </div>
          </div>

          <div className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm">
            *All amounts shown are in Euros. Taxes may apply based on your jurisdiction.
          </div>
        </section>

        {/* Full-width separator line */}
        {/* Separator line removed as per request */}
        <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
          See What’s Included in All Plans
        </div>
      </main>
    </>
  );
}
