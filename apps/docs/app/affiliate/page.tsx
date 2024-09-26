"use client"; // Ensure client-side rendering

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Tooltip, Accordion, AccordionItem, Button } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function AffiliatesPage() {
  const [timeLeft, setTimeLeft] = useState({
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const jwtExpiryTime = new Date();
    jwtExpiryTime.setMinutes(jwtExpiryTime.getMinutes() + 60); // Set expiry time to 60 minutes from now

    const timer = setInterval(() => {
      const difference = +new Date(jwtExpiryTime) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          minutes: Math.floor(difference / 1000 / 60).toString().padStart(2, "0"),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
        });
      } else {
        setTimeLeft({ minutes: "00", seconds: "00" });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative container mx-auto w-full sm:w-[90%] lg:w-[90%] z-10 px-4 sm:px-6 sm:pt-6 lg:px-8 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow bg-white dark:bg-black pt-12">
      
      {/* Promotional Section */}
      <div className="flex flex-col justify-center items-center text-center md:leading-8 xs:mt-14 sm:mt-16 md:leading-10 mb-8 h-40">
        <h1 className={title({ color: "blue", size: "lg" })}>CicadaVPN Affiliates</h1>
        
        <div>
          <h1 className={title({ color: "green", size: "lg" })}>Join Our Affiliate Program</h1>
          <h1 className="text-default-500 dark:text-gray-400">Earn generous commissions by promoting CicadaVPN</h1>
        </div>

        {/* Countdown Timer (Optional) */}
        {/* <h1 className="text-xl sm:text-2xl mt-2 mb-4">
          <span className={title({ color: "pink", size: "sm" })}>Limited Time Offer Ends In </span>
          <span className={title({ color: "blue", size: "sm" })}>
            {`${timeLeft.minutes}Min:${timeLeft.seconds}Sec`}
          </span>
        </h1> */}
      </div>

      {/* Affiliate Program Overview */}
      <section className="w-full flex flex-col items-center lg:justify-center mt-4 md:mt-12 xs:mt-4 sm:mt-6 gap-6 sm:gap-4 mx-auto overflow-hidden">
        
        {/* Affiliate Program Card */}
        <Card 
          className="py-4 shadow-lg bg-white dark:bg-gray-800 rounded-lg w-full lg:w-[60%] border-2 border-gradient-to-r from-[#F54180] to-[#338EF7] cursor-pointer mx-auto"
          as="a" href="/signup-affiliate" // Update the link to your affiliate signup page
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large text-gray-900 dark:text-gray-200">Become a CicadaVPN Affiliate</h4>
            <small className="text-default-500 dark:text-gray-400">Promote CicadaVPN and earn up to 50% commission on each sale.</small>
            <p className="text-tiny mt-4 uppercase font-bold text-gray-900 dark:text-gray-200">Affiliate Benefits</p>
            <small className="mt-2 text-default-500 dark:text-gray-400">High commissions, real-time tracking, and dedicated support</small>
            <p className="text-default-500 text-sm mt-2 dark:text-gray-400">Competitive rates with potential for recurring earnings</p>
          </CardHeader>

          <CardBody className="relative py-2 px-4">
            <Image
              alt="Affiliate Program"
              className="object-cover rounded-xl"
              src="/images/affiliate.webp" // Replace with your affiliate program image
              width="100%"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-b-xl py-4 px-4 flex justify-between items-center">
              <Tooltip content="Join Now" placement="top" color="foreground">
                <p className="text-tiny text-default-500 cursor-pointer">Learn More</p>
              </Tooltip>
            </div>
          </CardBody>
        </Card>
      </section>

      {/* Commission Structure */}
      <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
        Commission Structure
      </div>

      <section className="mt-8 mx-auto w-full lg:w-[60%]">
        <Card className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Earn Up to 50% Commission</h3>
          <p className="text-default-500 dark:text-gray-400 mb-4">
            Our affiliate program offers one of the highest commission rates in the industry. Earn a significant percentage for every referral that subscribes to CicadaVPN.
          </p>
          <ul className="list-disc list-inside text-left text-default-500 dark:text-gray-400">
            <li>High commission rates with potential for recurring earnings</li>
            <li>Real-time tracking and reporting</li>
            <li>Access to a wide range of marketing materials</li>
            <li>Dedicated affiliate support team</li>
          </ul>
        </Card>
      </section>

      {/* Marketing Materials */}
      <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
        Marketing Materials
      </div>

      <section className="mt-8 mx-auto w-full lg:w-[60%]">
        <Card className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Comprehensive Marketing Support</h3>
          <p className="text-default-500 dark:text-gray-400 mb-4">
            We provide a variety of marketing materials to help you effectively promote CicadaVPN.
          </p>
          <ul className="list-disc list-inside text-left text-default-500 dark:text-gray-400">
            <li>Custom banners and graphics</li>
            <li>Affiliate links and tracking codes</li>
            <li>Email templates</li>
            <li>Content for blogs and social media</li>
          </ul>
        </Card>
      </section>

      {/* Testimonials */}
      <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
        What Our Affiliates Say
      </div>

      <section className="mt-8 mx-auto w-full lg:w-[60%]">
        <Accordion variant="shadow">
          <AccordionItem key="1" aria-label="Testimonial 1" title="KevinH">
            "Joining the CicadaVPN affiliate program has been incredibly rewarding. The high commissions and excellent support make it a standout choice."
          </AccordionItem>
          <AccordionItem key="2" aria-label="Testimonial 2" title="Pauline">
            "The marketing materials provided are top-notch and have helped me boost my referrals significantly. Highly recommend CicadaVPN's affiliate program!"
          </AccordionItem>
          <AccordionItem key="3" aria-label="Testimonial 2" title="Publib team">
            "The marketing materials provided are top-notch and have helped me boost my referrals significantly. Highly recommend CicadaVPN's affiliate program!"
          </AccordionItem>
        </Accordion>
      </section>

      {/* FAQs */}
      <div className="text-center text-black dark:text-white mt-12 text-2xl font-bold">
        Frequently Asked Questions
      </div>

      <section className="mt-8 mx-auto w-full lg:w-[60%]">
        <Accordion variant="shadow">
          <AccordionItem key="1" aria-label="FAQ 1" title="How do I join the affiliate program?">
            Simply click on the "Join Now" button, fill out the registration form, and start promoting CicadaVPN immediately after approval.
          </AccordionItem>
          <AccordionItem key="2" aria-label="FAQ 2" title="What commission rates do you offer?">
            We offer competitive commission rates up to 50% per sale, with opportunities for recurring commissions based on your performance.
          </AccordionItem>
          <AccordionItem key="3" aria-label="FAQ 3" title="How are my commissions paid?">
            Commissions are tracked in real-time and paid out monthly via your preferred payment method once you reach the minimum payout threshold.
          </AccordionItem>
          <AccordionItem key="4" aria-label="FAQ 4" title="Do you provide marketing materials?">
            Yes, we provide a wide range of marketing materials including banners, links, email templates, and more to help you effectively promote our services.
          </AccordionItem>
        </Accordion>
      </section>

      {/* Call to Action */}
      <div className="flex justify-center mt-12">
        <Button 
          size="lg" 
          color="primary" 
          
          as="a" 
          href="/signup-affiliate" // Update the link to your affiliate signup page
          className="px-8 py-4 rounded-full"
        >
          Join Our Affiliate Program
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10 text-sm">
        *All commissions are paid in Euros. Taxes and applicable fees may apply based on your jurisdiction.
      </div>
    </main>
  );
}
