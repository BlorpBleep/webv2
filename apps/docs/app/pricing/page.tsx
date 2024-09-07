"use client"; // Ensure client-side rendering

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Tooltip, Badge, Accordion, AccordionItem } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function PricingPage() {
  const [timeLeft, setTimeLeft] = useState({
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const jwtExpiryTime = new Date();
    jwtExpiryTime.setMinutes(jwtExpiryTime.getMinutes() + 60); // Set expiry time to 60 minutes from now

    const timer = setInterval(() => {
      setTimeLeft({
        minutes: Math.floor((+new Date(jwtExpiryTime) - +new Date()) / 1000 / 60).toString().padStart(2, "0"),
        seconds: Math.floor((+new Date(jwtExpiryTime) - +new Date()) / 1000 % 60).toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <main className="relative container mx-auto w-full sm:w-[90%] lg:w-[70%] z-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black pt-8">
      {/* Promotional Section */}
      <div className="flex flex-col justify-center items-center text-center leading-8 md:leading-10 mb-8 h-40">
        <h1 className={title({ color: "violet", size: "lg" })}>Get 83% Off</h1>
        <div>
          <h1 className={title({ size: "lg" })}>CicadaVPN&nbsp;</h1>
          <h1 className={title({ color: "green", size: "lg" })}>+ 4 Months Free</h1>
        </div>

        {/* Countdown Timer */}
        <h1 className="text-xl sm:text-2xl mt-2">
          <span className={title({ color: "pink", size: "sm" })}>Offer Ends In </span>
          <span className={title({ color: "blue", size: "sm" })}>
            {`${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
          </span>
        </h1>
      </div>

      <section className="w-full flex flex-col lg:flex-row lg:justify-between mt-4 sm:mt-6 gap-6 sm:gap-8 mx-auto">

        {/* Best Value Offer (Order: First on mobile, middle on desktop screens, 10% bigger, with badge and border) */}
        <Card 
          className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[33%] lg:h-[500px] border-2 border-gradient-to-r from-[#F54180] to-[#338EF7] cursor-pointer relative order-1 lg:order-2"
          as="a" href="https://buy.stripe.com/3cs3cOgCi0Z784obIN"
        >
          {/* Badge */}
          <Badge 
            className="absolute top-3 right-3 z-50 bg-blue-600 text-white rounded-full px-4 py-2"
            style={{ fontSize: '1rem', zIndex: 10 }}
          >
            Most Popular
          </Badge>

          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-gray-900 dark:text-gray-200">Best Value</p>
            <small className="text-default-500 dark:text-gray-400">+ 4 Extra Months Free</small>
            <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - 2 Years Plan</h4>
            <p className="text-default-500 text-sm mt-2 dark:text-gray-400">2.03 €/mo for enhanced privacy and global access.</p>
          </CardHeader>

          {/* Image Section with More Info */}
          <CardBody className="relative py-2 px-4">
            <Image
              alt="Best Value Offer"
              className="object-cover rounded-xl"
              src="/images/first.webp"
              width="100%"
            />
            {/* Transparent Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
              <Tooltip content="Best Deal" placement="top" color="foreground">
                <p className="text-tiny text-default-500 cursor-pointer">More Info</p>
              </Tooltip>
            </div>
          </CardBody>
        </Card>

        {/* First Card (Standard Offer) */}
        <Card 
          className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[30%] lg:h-[450px] cursor-pointer lg:order-1"
          as="a" href="https://buy.stripe.com/5kA28K1HobDL5WgbIP"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-gray-900 dark:text-gray-200">Special Offer</p>
            <small className="text-default-500 dark:text-gray-400">3 Months Free</small>
            <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - 1 Month Plan</h4>
            <p className="text-default-500 text-sm mt-2 dark:text-gray-400">11.99 €/mo for 1 year of secure VPN access.</p>
          </CardHeader>

          {/* Image Section with More Info */}
          <CardBody className="relative py-2 px-4">
            <Image
              alt="Standard Offer"
              className="object-cover rounded-xl"
              src="/images/second.webp"
              width="100%"
            />
            {/* Transparent Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
              <Tooltip content="Available soon" placement="top" color="foreground">
                <p className="text-tiny text-default-500 cursor-pointer">More Info</p>
              </Tooltip>
            </div>
          </CardBody>
        </Card>

        {/* Third Card (Basic Offer) */}
        <Card 
          className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[30%] lg:h-[450px] cursor-pointer lg:order-3"
          as="a" href="https://buy.stripe.com/6oE7t485MgY5doI3ci"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-gray-900 dark:text-gray-200">Basic Offer</p>
            <small className="text-default-500 dark:text-gray-400">6 Months Protection</small>
            <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - 6 Months Plan</h4>
            <p className="text-default-500 text-sm mt-2 dark:text-gray-400">6.99 €/mo for 6 months of VPN protection.</p>
          </CardHeader>

          {/* Image Section with More Info */}
          <CardBody className="relative py-2 px-4">
            <Image
              alt="Basic Offer"
              className="object-cover rounded-xl"
              src="/images/third.webp"
              width="100%"
            />
            {/* Transparent Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
              <Tooltip content="Available soon" placement="top" color="foreground">
                <p className="text-tiny text-default-500 cursor-pointer">More Info</p>
              </Tooltip>
            </div>
          </CardBody>
        </Card>

      </section>

      <div className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm">
        *All amounts shown are in Euros. Taxes may apply based on your jurisdiction.
      </div>

      <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
        See What’s Included in All Plans
      </div>

      {/* Accordion Section */}
      <div className="mt-8">
        <Accordion variant="shadow">
          <AccordionItem key="1" aria-label="Accordion 1" title="Plan Benefits">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Privacy Protection">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Global Access">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}