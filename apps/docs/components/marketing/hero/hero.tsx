"use client";

import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import Image from "next/image"; // Import Next.js Image
import { FaWindows, FaAmazon, FaAndroid, FaApple, FaGamepad, FaChrome, FaFirefox, FaLinux, FaTv, FaShieldAlt } from 'react-icons/fa';
import { SiAppletv, SiAndroid } from 'react-icons/si';
import { MdOutlineDesktopMac } from 'react-icons/md';
import { title, subtitle } from "@/components/primitives";
import { trackEvent } from "@/utils/va";

export const Hero = () => {
  const handlePressAnnouncement = (name: string, url: string) => {
    trackEvent("NavbarItem", {
      name,
      action: "press",
      category: "home - hero",
      data: url,
    });
  };

  return (
    <>
      <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap translate-y-[-5%] justify-between items-center h-[calc(80vh_-_64px)] 2xl:h-[calc(64vh_-_44px)]">
        <div className="flex relative z-20 flex-col gap-4 w-full lg:w-1/2 xl:mt-10">
          <div className="text-center leading-8 md:leading-10 md:text-left">
            <h1 className={title({ color: "violet", size: "lg" })}>Get 83% Off</h1>
            <div>
              <h1 className={title({  size: "lg" })}>CicadaVPN&nbsp;</h1>
              <h1 className={title({ color: "green", size: "lg" })}>+ 4 Months Free</h1>
            </div>
          </div>
          <h2 className={subtitle({ fullWidth: true, class: "text-center md:text-left" })}>
            Choose a 2-year plan, get an extra 4 months CicadaVPN protection for free.
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 md:mb-0">
            <Button
              as={NextLink}
              className="w-full md:h-11 md:w-auto font-bold"
              color="primary"
              endContent={
                <ArrowRightIcon
                  className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
                  strokeWidth={2}
                />
              }
              href="/pricing"
              radius="full"
              size="lg"
              onPress={() => {
                trackEvent("Hero - Get Started", {
                  name: "Get Started",
                  action: "click",
                  category: "landing-page",
                  data: "/pricing",
                });
              }}
            >
              Get The Deal | 2.03€/mo
            </Button>
          </div>
          <div className="flex items-center justify-center md:justify-start text-lg mt-2">
            <FaShieldAlt className="text-primary-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">45-Day Money-Back Guarantee</span>
          </div>
        </div>

        {/* Right-hand side image */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center hidden md:flex">
          <Image
          
            src="/images/cicada.png"
            alt="CicadaVPN"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section className="flex flex-col items-center pb-8 -mt-16">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Supported on:</h3>
        <div className="grid grid-cols-4 gap-6 mt-4 md:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
          {[ 
            { icon: FaWindows, label: "Windows" },
            { icon: FaAmazon, label: "Amazon Fire TV" },
            { icon: FaAndroid, label: "Android" },
            { icon: SiAndroid, label: "Android TV" },
            { icon: SiAppletv, label: "Apple TV" },
            { icon: FaGamepad, label: "Console" },
            { icon: FaChrome, label: "Chrome" },
            { icon: FaFirefox, label: "Firefox" },
            { icon: FaApple, label: "iOS" },
            { icon: FaLinux, label: "Linux" },
            { icon: MdOutlineDesktopMac, label: "macOS" },
            { icon: FaTv, label: "Smart TVs" }
          ].map((platform, index) => (
            <div key={index} className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
              <platform.icon className="w-8 h-8 md:w-10 md:h-10" />
              <span className="mt-2 text-xs md:text-sm">{platform.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
