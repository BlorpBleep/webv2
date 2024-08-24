"use client";

import { usePathname } from "next/navigation";
import { getCurrentYear } from "@/utils/time";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export const Footer = () => {
  const pathname = usePathname();
  const pagePath = pathname.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  if (pathname.includes("/examples")) {
    return null;
  }

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 border-t border-gray-200 dark:border-gray-700">
      {/* Centered Container */}
      <div className="mx-auto max-w-3xl px-6">
        {/* Top Bar with Logo and Breadcrumb */}
        <div className="flex items-center py-2">
          {/* SVG Icon - Light/Dark Mode Compatible */}
          <img
            src="/images/Group191.svg"
            alt="Logo"
            className="w-6 h-6 dark:hidden" // For light mode
          />
          <img
            src="/images/Group178.svg"
            alt="Logo"
            className="w-6 h-6 hidden dark:block" // For dark mode
          />
          <FaChevronRight className="text-xs mx-2 text-gray-600 dark:text-gray-400" />
          <Link href={pathname}>
            <span className="text-gray-600 dark:text-gray-400">{pagePath}</span>
          </Link>
        </div>

        {/* New Divider Bar Below the Icon/Path */}
        <div className="w-full border-t border-gray-200 dark:border-gray-700 my-4"></div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Shop and Learn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">CicadaVPN</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Unblock everything!</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Cicada Features</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Cicada Security</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Cicada Family Friendly</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Account & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Manage Your ID</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Account Settings</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Devices</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Setup Guides</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Programs & Business</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Affiliate</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">YouTube Creators</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Student Discount</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Graduate Discount</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Business Solutions</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Partnerships</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Legal & Policies</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a></li>
              <li><a href="/docs/policies/general_terms" className="hover:text-primary-600 dark:hover:text-primary-400">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Warranty</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Sales and Refunds</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Site Map</a></li>
            </ul>
          </div>
        </div>

        {/* More Ways to Shop */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            More ways to shop: <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Find a CicadaVPN Store</a> or <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">other retailer</a> near you.
          </p>
        </div>
        
        {/* Legal and Policy Links */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col lg:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {getCurrentYear()} CicadaVPN. All rights reserved.
          </p>
          <div className="flex gap-4 pt-4 lg:pt-0 text-sm text-gray-600 dark:text-gray-400">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/docs/policies/general_terms" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Sales and Refunds</a>

          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">United States</p>
        </div>
      </div>
    </footer>
  );
};
