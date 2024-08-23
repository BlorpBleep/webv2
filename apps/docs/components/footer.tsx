"use client";

import { usePathname } from "next/navigation";
import { FaWindows, FaApple, FaLinux, FaAndroid, FaChrome, FaFirefox, FaEdge } from 'react-icons/fa';
import { SiAppletv, SiAmazonfiretv } from 'react-icons/si';

import { getCurrentYear } from "@/utils/time";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <footer className="container mx-auto max-w-7xl pb-12 px-6 lg:px-12">
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Footer Links Section */}
        <div className="w-full flex flex-wrap justify-between text-sm text-default-400 dark:text-gray-400">
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">Products</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">CicadaVPN</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Alternative ID</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Cicada Alert</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Cicada Antivirus</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Cicada Search</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Incogni</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">CicadaVPN</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">What is a VPN?</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">VPN features</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">VPN use cases</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">VPN servers</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Dedicated IP</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Reviews</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">VPN download</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">VPN free trial</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">Solution</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">VPN for teams</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">Programs</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Affiliate</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">YouTube creators</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Student discount</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Graduate discount</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">Resources</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">About us</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Media center</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Career</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Blog</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Blog newsletter</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Warrant canary</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">Tools</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">What is my IP</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">DNS leak test</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">WebRTC leak test</a></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-auto mb-6">
            <h3 className="font-bold text-default-500 dark:text-white">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Help center</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400">Setup guides</a></li>
            </ul>
          </div>
        </div>
        {/* Footer Icons Section */}
        <div className="flex flex-wrap justify-center gap-6 w-full text-default-400 dark:text-gray-400 py-4">
          <FaWindows size={24} />
          <FaApple size={24} />
          <FaLinux size={24} />
          <FaAndroid size={24} />
          <FaChrome size={24} />
          <FaFirefox size={24} />
          <FaEdge size={24} />
          <SiAppletv size={24} />
          <SiAmazonfiretv size={24} />
        </div>
        {/* Footer Bottom Section */}
        <p className="text-sm text-default-400 dark:text-gray-400">
          © {getCurrentYear()} CicadaVPN. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a href="/privacy" className="text-sm text-default-400 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">Privacy policy</a>
          <a href="/docs/policies/general_terms" className="text-sm text-default-400 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">Terms & conditions</a>
        </div>
      </div>
    </footer>
  );
};
