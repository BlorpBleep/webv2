"use client";

import React, { FC, useState } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { NavbarItem, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components";

interface MobileDrawerProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: FC<MobileDrawerProps> = ({ isMenuOpen, onClose }) => {
  const [user, setUser] = useState<{ email?: string; avatarUrl?: string } | null>(null);

  return (
    <div
      className={`fixed inset-0 z-[100000] transition-opacity ${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 z-[100001] transform transition-transform ease-in-out duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-4/5`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="p-4 bg-white dark:bg-gray-800 flex justify-end items-center border-b border-gray-300 dark:border-gray-600">
          <FaTimes className="text-black dark:text-white w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 flex flex-col border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center mb-4">
            {user ? (
              <>
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">LOGGED IN AS</p>
                  <p className="text-sm font-semibold text-black dark:text-white">{user.email}</p>
                </div>
              </>
            ) : (
              <>
                <FaUserCircle className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-black dark:text-white">LOG-IN FOR MORE</p>
                </div>
              </>
            )}
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Links are now inside the LOG-IN FOR MORE container */}
          <div className="flex flex-col gap-4 mt-4 bg-white dark:bg-gray-800">
            <NavbarItem>
              <NextLink href="/pricing" passHref legacyBehavior>
                <Link className="text-lg font-semibold text-black dark:text-gray-200" onClick={onClose}>
                  Pricing
                </Link>
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <NextLink href="/docs/guides/iphone" passHref legacyBehavior>
                <Link className="text-lg font-semibold text-black dark:text-gray-200" onClick={onClose}>
                  Help
                </Link>
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <NextLink href="/downloads" passHref legacyBehavior>
                <Link className="text-lg font-semibold text-black dark:text-gray-200" onClick={onClose}>
                  Downloads
                </Link>
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <NextLink href="/blog" passHref legacyBehavior>
                <Link className="text-lg font-semibold text-black dark:text-gray-200" onClick={onClose}>
                  Blog
                </Link>
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <NextLink href="/teams" passHref legacyBehavior>
                <Link className="text-lg font-semibold text-black dark:text-gray-200" onClick={onClose}>
                  Teams
                </Link>
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <div className="flex items-center">
                <ThemeSwitch />
                <span className="ml-3 text-lg font-semibold text-black dark:text-gray-200">Theme</span>
              </div>
            </NavbarItem>
          </div>
        </div>

        <div className="p-4 border-t bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400 text-left">
          <NextLink href="/privacy" passHref legacyBehavior>
            <Link className="mr-4">Privacy Policy</Link>
          </NextLink>
          <NextLink href="/terms" passHref legacyBehavior>
            <Link>Terms of Service</Link>
          </NextLink>
        </div>
      </div>
    </div>
  );
};
