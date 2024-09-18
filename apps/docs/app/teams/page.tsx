"use client"; // Ensure client-side rendering

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Tooltip, Accordion, AccordionItem } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function TeamsPage() {
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

  return (
    <main className="relative container mx-auto w-full sm:w-[90%] lg:w-[90%] z-10 px-4 sm:px-6 sm:pt-6 lg:px-8 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black pt-12">
      {/* Promotional Section */}
      <div className="flex flex-col justify-center items-center text-center md:leading-8 xs:mt-14 sm:mt-16 md:leading-10 mb-8 h-40">
        <h1 className={title({ color: "blue", size: "lg" })}>CicadaVPN Teams</h1>
        
        <div>
          <h1 className={title({ color: "green", size: "lg" })}>+ 4 Months Free</h1>
          <h1 className="text-default-500 dark:text-gray-400">Centralized Management for Team Administrators</h1>
        </div>

        {/* Countdown Timer */}
        <h1 className="text-xl sm:text-2xl mt-2 mb-4">
          <span className={title({ color: "pink", size: "sm" })}>Offer Ends In </span>
          <span className={title({ color: "blue", size: "sm" })}>
            {`${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
          </span>
        </h1>
      </div>

      {/* Pricing Cards */}
      <section className="w-full flex flex-col items-center lg:justify-center mt-4 md:mt-12 xs:mt-4 sm:mt-6 gap-6 sm:gap-4 mx-auto overflow-hidden">
  {/* Teams Plan Card */}
  <Card 
    className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[50%] lg:min-h-[350px] lg:max-h-[820px] border-2 border-gradient-to-r from-[#F54180] to-[#338EF7] cursor-pointer mx-auto"
    as="a" href="---https://buy.stripe.com/teamoffer"
  >
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
    <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - Teams Plan</h4>
    
      <small className="text-default-500 dark:text-gray-400">Easily manage team subscriptions and allocate VPN access for your team members.</small>
      <p className="text-tiny mt-4 uppercase font-bold text-gray-900 dark:text-gray-200">Teams Offer</p>
      <small className="mt-2 text-default-500 dark:text-gray-400">2 Years Plan + 4 Extra Months Free</small>
      <p className="text-default-500 text-sm mt-2 dark:text-gray-400">2.03 €/mo enhanced privacy, global access</p>
    </CardHeader>

    <CardBody className="relative py-2 px-4">
      <Image
        alt="Teams Offer"
        className="object-cover rounded-xl"
        src="/images/teams.webp"
        width="100%"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
        <Tooltip content="Best Deal for Teams" placement="top" color="foreground">
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
      <div className="mt-8 mx-auto w-full lg:w-[50%]">
        <Accordion variant="shadow">
          <AccordionItem key="1" aria-label="Accordion 1" title="Plan Benefits">
            All CicadaVPN plans come with unlimited bandwidth, DNS filtering options for family-safe browsing, ad-blocking, and our AI-powered active monitoring system which ensures continuous access to streaming platforms and services.
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Teams Management">
            CicadaVPN Teams allows administrators to easily manage multiple users, add or remove team members, and centrally control billing. Members can be added with a simple email invitation, and administrators can allocate subscription time for all team members.
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Privacy Protection">
            CicadaVPN prioritizes privacy with no-logging policies, strong encryption, and a transparent commitment to shutting down or relocating rather than violating user privacy. AI-driven tools ensure no data collection.
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 4" title="Global Access">
            Access a global network of high-speed servers in multiple countries, bypassing geo-blocks on streaming services, social media, and websites. Optimized gateways ensure stable connections even under heavy usage.
          </AccordionItem>
          <AccordionItem key="5" aria-label="Accordion 5" title="Built-in AI Features">
            With AI content selection, CicadaVPN partners help you decide what to watch based on your preferences and unlocks the best regions for accessing content. Our AI also monitors performance and offers automatic relay adjustments.
          </AccordionItem>
          <AccordionItem key="6" aria-label="Accordion 6" title="Family-Friendly Features">
            Enable family filtering on any plan to block inappropriate content and provide a safer internet experience. This is ideal for parents looking to protect their household.
          </AccordionItem>
          <AccordionItem key="7" aria-label="Accordion 7" title="Security Features">
            Built on the WireGuard® protocol for fast, secure connections, CicadaVPN provides essential encryption to safeguard your data without sacrificing speed. We also offer high-reliability gateways with 99.999% uptime.
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}