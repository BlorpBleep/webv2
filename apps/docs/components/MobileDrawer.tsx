import React, { FC, useState, useEffect } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { NavbarItem, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components";

interface MobileDrawerProps {
  isMenuOpen: boolean;
  onClose: () => void;
  accountLinks: { href: string; label: string; icon: React.ReactNode }[];
  onSelect: (section: string) => void;
  onLogout: () => void; // Add onLogout prop here
}

export const MobileDrawer: FC<MobileDrawerProps> = ({
  isMenuOpen,
  onClose,
  accountLinks,
  onSelect,
  onLogout, // Destructure onLogout from props
}) => {
  const [user, setUser] = useState<{ email?: string; avatarUrl?: string } | null>(null);

  useEffect(() => {
    console.log("MobileDrawer Props:", { isMenuOpen, accountLinks, onSelect });
  }, [isMenuOpen, accountLinks, onSelect]);

  return (
    <div
      className={`fixed inset-0 z-[100000] transition-opacity ${
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-4/5 bg-gray-100 dark:bg-gray-900 z-[100001] transform transition-transform ease-in-out duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button and Theme Switch */}
        <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
          <ThemeSwitch />
          <FaTimes className="text-gray-900 dark:text-gray-200 w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col justify-between h-full">
          {/* User Info */}
          <div className="p-4 bg-gray-100 dark:bg-gray-900 flex flex-col flex-grow border-b border-gray-300 dark:border-gray-700">
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
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.email}</p>
                  </div>
                </>
              ) : (
                <>
                  <FaUserCircle className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">LOG-IN FOR MORE</p>
                  </div>
                </>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-3 mt-4">
              <NavbarItem>
                <NextLink href="/account" passHref legacyBehavior>
                  <Link className="text-sm font-semibold text-gray-900 dark:text-gray-200" onClick={onClose}>
                    My Account
                  </Link>
                </NextLink>
              </NavbarItem>

              <NavbarItem>
                <NextLink href="/pricing" passHref legacyBehavior>
                  <Link className="text-sm font-semibold text-gray-900 dark:text-gray-200" onClick={onClose}>
                    Pricing
                  </Link>
                </NextLink>
              </NavbarItem>

              <NavbarItem>
                <NextLink href="/docs/guides/iphone" passHref legacyBehavior>
                  <Link className="text-sm font-semibold text-gray-900 dark:text-gray-200" onClick={onClose}>
                    Help
                  </Link>
                </NextLink>
              </NavbarItem>

              <NavbarItem>
                <NextLink href="/downloads" passHref legacyBehavior>
                  <Link className="text-sm font-semibold text-gray-900 dark:text-gray-200" onClick={onClose}>
                    Downloads
                  </Link>
                </NextLink>
              </NavbarItem>

              <NavbarItem>
                <NextLink href="/blog" passHref legacyBehavior>
                  <Link className="text-sm font-semibold text-gray-900 dark:text-gray-200" onClick={onClose}>
                    Blog
                  </Link>
                </NextLink>
              </NavbarItem>

              <NavbarItem>
                <NextLink href="/teams" passHref legacyBehavior>
                  <Link className="text-sm font-semibold text-gray-900 dark:text-gray-200" onClick={onClose}>
                    Teams
                  </Link>
                </NextLink>
              </NavbarItem>

              {/* Logout Link */}
              <NavbarItem>
                <Link
                  className="text-sm font-semibold text-red-600 dark:text-red-400 cursor-pointer"
                  onClick={onLogout} // Call onLogout when clicked
                >
                  Logout
                </Link>
              </NavbarItem>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
            <NextLink href="/privacy" passHref legacyBehavior>
              <Link className="mr-4 text-gray-600 dark:text-gray-400">Privacy Policy</Link>
            </NextLink>
            <NextLink href="/terms" passHref legacyBehavior>
              <Link className="text-gray-600 dark:text-gray-400">Terms of Service</Link>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
};
