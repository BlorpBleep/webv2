"use client";

import NextLink from "next/link";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import Image from "next/image"; // Import Next.js Image
import { FaWindows, FaAmazon, FaAndroid, FaApple, FaGamepad, FaChrome, FaFirefox, FaLinux, FaTv, FaShieldAlt } from 'react-icons/fa';
import { SiAppletv, SiAndroid } from 'react-icons/si';
import { MdOutlineDesktopMac } from 'react-icons/md';
import { title, subtitle } from "@/components/primitives";
import { trackEvent } from "@/utils/va";
import { DownloadButton } from "@/components/marketing/downloads/download-button";
import { Button } from "@nextui-org/react";

// Array of paths for different platforms
const downloadPaths = {
  windows: "/downloads/windows.msi",
  macos: "/downloads/macos.pkg",
  linux: "/downloads/linux.tar.gz",
  ios: "https://apps.apple.com/us/app/cicadavpn/id6499138575", // Updated Apple Store link
  android: "https://play.google.com/store/apps/details?id=com.vpn.client",
  amazon: "https://www.amazon.com/dp/B00XXXXXXXX",
  androidTV: "https://play.google.com/store/apps/details?id=com.vpn.client",
  appleTV: "https://apps.apple.com/us/app/apple-tv/idXXXXXXXXXX",
  chrome: "/docs/guides/chrome",
  firefox: "docs/guides/firefox",
};

export const DownloadsGrid = () => {

  return (
    <>
      <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap translate-y-[-5%] justify-between items-center h-[calc(80vh_-_64px)] 2xl:h-[calc(64vh_-_44px)]">
        <div className="flex relative z-20 flex-col gap-4 w-full lg:w-1/2 xl:mt-10">
          <div className="text-center leading-8 md:leading-10 md:text-left">
            <div>
              <h1 className={title({  size: "lg" })}>Download VPN&nbsp;</h1>
              <h1 className={title({ color: "green", size: "lg" })}>for All Your Devices</h1>
            </div>
          </div>
          <h2 className={subtitle({ fullWidth: true, class: "text-center md:text-left" })}>
            CicadaVPN works with all major operating systems and all your favorite devices.
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
            >
              Get the Deal | 83% Off
            </Button>
            
            <DownloadButton /> 
            
          </div>

          <div className="flex items-center justify-center md:justify-start text-lg mt-2">
            <FaShieldAlt className="text-primary-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300">45-Day Money-Back Guarantee</span>
          </div>
        </div>

        {/* Right-hand side image */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center items-center hidden md:flex">
          <Image
          
            src="/images/cicada-downloader.png" // Updated image source
            alt="CicadaVPN Downloader"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section className="flex flex-col items-center pb-8 -mt-16">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Download for:</h3>
        <div className="grid grid-cols-4 gap-6 mt-4 md:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
          {[
            { icon: MdOutlineDesktopMac, label: "macOS", href: downloadPaths.macos },
            { icon: FaApple, label: "iOS", href: downloadPaths.ios },
            { icon: FaWindows, label: "Windows", href: downloadPaths.windows },
            { icon: FaAndroid, label: "Android", href: downloadPaths.android },
            { icon: FaAmazon, label: "Amazon Fire TV", href: downloadPaths.amazon },
            { icon: SiAndroid, label: "Android TV", href: downloadPaths.androidTV },
            { icon: SiAppletv, label: "Apple TV", href: downloadPaths.appleTV },
            { icon: FaGamepad, label: "Console", href: downloadPaths.windows },
            { icon: FaChrome, label: "Chrome", href: downloadPaths.chrome },
            { icon: FaFirefox, label: "Firefox", href: downloadPaths.firefox },
            { icon: FaLinux, label: "Linux", href: downloadPaths.linux },
            { icon: FaTv, label: "Smart TVs", href: downloadPaths.amazon },
          ].map((platform, index) => (
            <div key={index} className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
              <a href={platform.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
                <platform.icon className="w-8 h-8 md:w-10 md:h-10" />
                <span className="mt-2 text-xs md:text-sm">{platform.label}</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      
    </>
  );
};
