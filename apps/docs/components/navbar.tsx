"use client";

import NextLink from "next/link";
import { Button, Chip } from "@nextui-org/react";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import dynamic from "next/dynamic";
import { title, subtitle } from "@/components/primitives";
import { trackEvent } from "@/utils/va";
import Image from "next/image";
import { FaWindows, FaAmazon, FaAndroid, FaApple, FaGamepad, FaChrome, FaFirefox, FaLinux, FaTv, FaShieldAlt } from 'react-icons/fa';
import { SiAppletv, SiAndroid } from 'react-icons/si';
import { MdOutlineDesktopMac } from 'react-icons/md';

const BgLooper = dynamic(() => import("./bg-looper").then((mod) => mod.BgLooper), {
  ssr: false,
});

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
      <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(60vh_-_64px)] 2xl:h-[calc(64vh_-_44px)]">
        <div className="flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10">
          <div className="w-full flex justify-center md:hidden">
            <Chip
              as={NextLink}
              className="bg-default-100/50 hover:bg-default-100 border-default-200/80 dark:border-default-100/80 transition-colors cursor-pointer"
              color="default"
              href="/blog/v2.3.0"
              variant="dot"
              onClick={() => handlePressAnnouncement("New version v2.4.0", "/blog/v2.4.0")}
            >
              New version v2.4.0&nbsp;
              <span aria-label="emoji" role="img">
                🚀
              </span>
            </Chip>
          </div>

          <div className="text-center leading-8 md:leading-10 md:text-left mt-5 md:mt-0">
            <div className="inline-block">
              <h1 className={title()}>Get 63% off&nbsp;</h1>
              <h1 className={title({ color: "violet" })}>CicadaVPN </h1>
            </div>
            <h1 className={title({ color: "blue" })}> + 3 months free for a friend</h1>
          </div>
          <h2 className={subtitle({ fullWidth: true, class: "text-center md:text-left" })}>
            Choose a 2-year plan, gift your friend 3 months CicadaVPN protection free.
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-0">
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
              Get the Deal | 82% Off
            </Button>
          </div>
          <div className="flex items-center justify-center md:justify-start text-lg mt-2">
            <FaShieldAlt className="text-primary-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">45-Day Money-Back Guarantee</span>
          </div>
        </div>

        {/* Right-hand side image, hidden on small screens */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center hidden md:flex">
          <Image
            src="/images/cicada.png"
            alt="CicadaVPN"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <BgLooper />
      </section>

      {/* Supported Platforms Section */}
      <section className="flex flex-col items-center pb-8 -mt-12">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Supported on:</h3>
        <div className="grid grid-cols-4 gap-6 mt-4 md:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaWindows className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Windows</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaAmazon className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Amazon Fire TV</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaAndroid className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Android</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <SiAndroid className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Android TV</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <SiAppletv className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Apple TV</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaGamepad className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Console</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaChrome className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Chrome</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaFirefox className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Firefox</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaApple className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">iOS</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaLinux className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Linux</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <MdOutlineDesktopMac className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">macOS</span>
          </div>
          <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
            <FaTv className="w-8 h-8 md:w-10 md:h-10" />
            <span className="mt-2 text-xs md:text-sm">Smart TVs</span>
          </div>
        </div>
      </section>
    </>
  );
};
