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
    <main className="relative container mx-auto w-full sm:w-[90%] lg:w-[90%] z-10 px-4 sm:px-6  sm:pt-6 lg:px-8 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black pt-12">
      {/* Promotional Section */}
      <div className="flex flex-col justify-center items-center text-center md:leading-8 xs:mt-14 sm:mt-16 md:leading-10 mb-8 h-40">
        <h1 className={title({ color: "violet", size: "lg" })}>Get 83% Off CicadaVPN</h1>
        <h1 className={title({ color: "violet", size: "lg" })}></h1>
        <div>
          <h1 className={title({ color: "green", size: "lg" })}>+ 4 Months Free</h1>
          <h1 className="text-default-500 dark:text-gray-400">Our 2 Year plan just 2.03 €/mo</h1>
        </div>

        {/* Countdown Timer */}
        <h1 className="text-xl sm:text-2xl mt-2 mb-4">
          <span className={title({ color: "pink", size: "sm" })}>Offer Ends In </span>
          <span className={title({ color: "blue", size: "sm" })}>
            {`${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
          </span>
        </h1>
      </div>




      <section className="w-full flex flex-col lg:flex-row lg:justify-between mt-4 md:mt-12 xs:mt-4 sm:mt-6 gap-6 sm:gap-4 mx-auto overflow-hidden">
  {/* Best Value Offer (Order: First on mobile, middle on desktop screens, 10% bigger, with badge and border) */}
  <Card 
    className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[33%] lg:min-h-[350px] lg:max-h-[620px] border-2 border-gradient-to-r from-[#F54180] to-[#338EF7] cursor-pointer relative sm:order-1 md:order-1 lg:order-2"
    as="a" href="---https://buy.stripe.com/3cs3cOgCi0Z784obIN"
  >
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold text-gray-900 dark:text-gray-200">Best Value</p>
      <small className="text-default-500 dark:text-gray-400">+ 4 Extra Months Free</small>
      <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - 2 Years Plan</h4>
      <p className="text-default-500 text-sm mt-2 dark:text-gray-400">2.03 €/mo for enhanced privacy and global access.</p>
    </CardHeader>

    <CardBody className="relative py-2 px-4">
      <Image
        alt="Best Value Offer"
        className="object-cover rounded-xl"
        src="/images/first.webp"
        width="100%"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
        <Tooltip content="Best Deal" placement="top" color="foreground">
          <p className="text-tiny text-default-500 cursor-pointer">More Info</p>
        </Tooltip>
      </div>
    </CardBody>
  </Card>

  {/* First Card (Standard Offer) */}
  <Card 
    className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[30%] lg:min-h-[300px] lg:max-h-[600px] cursor-pointer md:order-3  lg:order-1"
    as="a" href="---https://buy.stripe.com/5kA28K1HobDL5WgbIP"
  >
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold text-gray-900 dark:text-gray-200">Special Offer</p>
      <small className="text-default-500 dark:text-gray-400">Great for Casual use!</small>
      <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - 1 Month Plan</h4>
      <p className="text-default-500 text-sm mt-2 dark:text-gray-400">11.99 €/mo for 1 month of secure VPN access.</p>
    </CardHeader>

    <CardBody className="relative py-2 px-4">
      <Image
        alt="Standard Offer"
        className="object-cover rounded-xl"
        src="/images/second.webp"
        width="100%"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
        <Tooltip content="Available soon" placement="top" color="foreground">
          <p className="text-tiny text-default-500 cursor-pointer">More Info</p>
        </Tooltip>
      </div>
    </CardBody>
  </Card>

  {/* Third Card (Basic Offer) */}
  <Card 
    className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[30%] lg:min-h-[400px] lg:max-h-[600px] cursor-pointer md:order-2 lg:order-3"
    as="a" href="---https://buy.stripe.com/6oE7t485MgY5doI3ci"
  >
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold text-gray-900 dark:text-gray-200">Basic Offer</p>
      <small className="text-default-500 dark:text-gray-400">6 Months Protection</small>
      <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Cicada VPN - 6 Months Plan</h4>
      <p className="text-default-500 text-sm mt-2 dark:text-gray-400">6.99 €/mo for 6 months of VPN protection.</p>
    </CardHeader>

    <CardBody className="relative py-2 px-4">
      <Image
        alt="Basic Offer"
        className="object-cover rounded-xl"
        src="/images/third.webp"
        width="100%"
      />
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
<div className="mt-8 mx-auto w-full lg:w-[50%]">
  <Accordion variant="shadow">

    <AccordionItem key="1" aria-label="Accordion 1" title="Plan Benefits">
      All CicadaVPN plans come with unlimited bandwidth, DNS filtering options for family-safe browsing, ad-blocking, and our AI-powered active monitoring system which ensures continuous access to streaming platforms and services.
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="Privacy Protection">
      CicadaVPN prioritizes privacy with no-logging policies, strong encryption, and a transparent commitment to shutting down or relocating rather than violating user privacy. AI-driven tools ensure no data collection.
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title="Global Access">
      Access a global network of high-speed servers in multiple countries, bypassing geo-blocks on streaming services, social media, and websites. Optimized gateways ensure stable connections even under heavy usage.
    </AccordionItem>
    <AccordionItem key="4" aria-label="Accordion 4" title="Built-in AI Features">
      With AI content selection, CicadaVPN partners help you decide what to watch based on your preferences and unlocks the best regions for accessing content. Our AI also monitors performance and offers automatic relay adjustments.
    </AccordionItem>
    <AccordionItem key="5" aria-label="Accordion 5" title="Family-Friendly Features">
      Enable family filtering on any plan to block inappropriate content and provide a safer internet experience. This is ideal for parents looking to protect their household.
    </AccordionItem>
    <AccordionItem key="6" aria-label="Accordion 6" title="Security Features">
      Built on the WireGuard® protocol for fast, secure connections, CicadaVPN provides essential encryption to safeguard your data without sacrificing speed. We also offer high-reliability gateways with 99.999% uptime.
    </AccordionItem>
  </Accordion>
</div>

{/* FAQ Section */}
<div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
  Frequently Asked Questions
</div>

<div className="mt-8 mx-auto w-full lg:w-[50%]">
  <Accordion variant="shadow">
    <AccordionItem key="1" aria-label="Accordion FAQ 1" title="Is it legal to use a VPN?">
      Yes, VPNs are legal in most countries. However, some countries restrict or regulate their use. Always check local laws before using a VPN abroad.
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion FAQ 2" title="Why should I pay for a VPN?">
      Paid VPNs like CicadaVPN offer better security, faster speeds, and access to premium features such as reliable privacy protection, no-logging policies, and high-speed global servers, which free services may not provide.
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion FAQ 3" title="Can I use CicadaVPN while traveling abroad?">
      Yes, CicadaVPN works globally, allowing you to access your usual websites and streaming services while traveling abroad by bypassing geo-blocks and censorship.
    </AccordionItem>
    <AccordionItem key="4" aria-label="Accordion FAQ 4" title="Which devices are supported?">
      CicadaVPN supports multiple platforms, including Windows, macOS, Android, iOS, Linux, and routers, making it compatible with most desktops, laptops, smartphones, and tablets.
    </AccordionItem>
    <AccordionItem key="5" aria-label="Accordion FAQ 5" title="How do I contact customer support?">
      You can contact CicadaVPN’s customer support via email or live chat directly from our website, where our AI-driven assistant is available 24/7 to help with your inquiries.
    </AccordionItem>
    <AccordionItem key="6" aria-label="Accordion FAQ 6" title="Is there a money-back guarantee?">
      Yes, CicadaVPN offers a 30-day money-back guarantee. If you're not satisfied with our service, you can request a full refund within 30 days of purchase.
    </AccordionItem>
    <AccordionItem key="7" aria-label="Accordion FAQ 7" title="Can I use CicadaVPN on my mobile?">
      Absolutely! CicadaVPN works seamlessly on both iOS and Android devices, providing full functionality across smartphones and tablets.
    </AccordionItem>
    <AccordionItem key="8" aria-label="Accordion FAQ 8" title="Does a VPN drain my battery?">
      VPNs can use more battery power due to encryption, but CicadaVPN is optimized to minimize battery drain, especially on mobile devices.
    </AccordionItem>
    <AccordionItem key="9" aria-label="Accordion FAQ 9" title="Can I be tracked if I use a VPN?">
      With CicadaVPN’s strict no-logging policy and encryption, it is nearly impossible for anyone to track your online activity while you're using the VPN.
    </AccordionItem>
    <AccordionItem key="10" aria-label="Accordion FAQ 10" title="Is it safe to use a VPN for online banking?">
      Yes, CicadaVPN enhances your online security, making it safe to use for online banking by encrypting your connection and protecting you from potential cyber threats.
    </AccordionItem>
    <AccordionItem key="11" aria-label="Accordion FAQ 11" title="Should I leave my VPN on all the time?">
      It’s a good idea to keep your VPN on all the time, especially when you're on public Wi-Fi, to ensure constant protection of your data and privacy.
    </AccordionItem>
  </Accordion>
</div>

    </main>
  );
}