"use client";

import { useState, FC, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "@nextui-org/shared-utils";
import { ThemeSwitch } from "@/components";
import { MobileDrawer } from "@/components/MobileDrawer";
import { FaBars, FaArrowRight, FaUserCircle, FaRegCreditCard, FaLock, FaMobileAlt, FaUserFriends, FaTicketAlt } from "react-icons/fa";
import { trackEvent } from "@/utils/va";

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Track theme state
  const pathname = usePathname();

  // Detect system theme and update state
  useEffect(() => {
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    // Check the initial theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes in theme preference
    mediaQuery.addEventListener('change', handleThemeChange);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  // Close the menu when the pathname changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }
    window.location.href = '/auth';
  };

  const handleSelect = (section: string) => {
    console.log(`Selected section: ${section}`);
  };

  const accountLinks = [
    { href: "/account", label: "Account", icon: <FaUserCircle /> },
    { href: "/membership", label: "Membership", icon: <FaRegCreditCard /> },
    { href: "/security", label: "Security", icon: <FaLock /> },
    { href: "/devices", label: "Devices", icon: <FaMobileAlt /> },
    { href: "/accounts", label: "Accounts", icon: <FaUserFriends /> },
    { href: "/vouchers", label: "Vouchers", icon: <FaTicketAlt /> },
  ];

  const navLinkClasses = clsx("text-foreground", "data-[active=true]:text-primary");

  return (
    <>
      <NextUINavbar
        className={clsx({
          "z-[100001]": isMenuOpen,
          "bg-transparent": true,
        })}
        maxWidth="full"
        position="sticky"
      >
        {/* Left section: Logo */}
        <NavbarContent className="basis-1/4 bg-transparent" justify="start">
          <NavbarBrand as="li" className="gap-3">
            <NextLink
              aria-label="Home"
              className="flex justify-start items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50"
              href="/"
              onClick={() => trackEvent("NavbarItem", { name: "Home", action: "press", category: "navbar" })}
            >
              {/* Conditionally render based on theme */}
              {isDarkMode ? (
                <svg className="dark-logo h-8 md:h-10" fill="currentColor" viewBox="0 0 200 46">
                  {/* Dark mode SVG paths */}
                  <path d="...Dark Mode Path..." fill="white" />
                </svg>
              ) : (
                <svg className="light-logo h-8 md:h-10" fill="currentColor" viewBox="0 0 200 46">
                  {/* Light mode SVG paths */}
                  <path d="...Light Mode Path..." fill="black" />
                </svg>
              )}
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Middle section: Navigation Links */}
        <NavbarContent className="basis-1/2 justify-center bg-transparent items-center hidden md:flex !justify-center">
          <ul className="flex gap-4 justify-center items-center">
            <NavbarItem>
              <NextLink href="/pricing" passHref legacyBehavior>
                <Link className={navLinkClasses} onClick={() => trackEvent("NavbarItem", { name: "Pricing", action: "press", category: "navbar" })}>
                  Pricing
                </Link>
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/downloads" passHref legacyBehavior>
                <Link className={navLinkClasses} onClick={() => trackEvent("NavbarItem", { name: "Downloads", action: "press", category: "navbar" })}>
                  Downloads
                </Link>
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/blog" passHref legacyBehavior>
                <Link className={navLinkClasses} onClick={() => trackEvent("NavbarItem", { name: "Blog", action: "press", category: "navbar" })}>
                  Blog
                </Link>
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/teams" passHref legacyBehavior>
                <Link className={navLinkClasses} onClick={() => trackEvent("NavbarItem", { name: "Teams", action: "press", category: "navbar" })}>
                  Teams
                </Link>
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href="/docs/faq/plans_orders" passHref legacyBehavior>
                <Link className={navLinkClasses} onClick={() => trackEvent("NavbarItem", { name: "Help", action: "press", category: "navbar" })}>
                  Help
                </Link>
              </NextLink>
            </NavbarItem>
          </ul>
        </NavbarContent>

        {/* Right section: My Account Link, Get CicadaVPN Button, and Theme Switch */}
        <NavbarContent className="basis-1/4 flex gap-4 bg-transparent items-center justify-end">
          <NavbarItem className="flex h-full items-center ml-auto hidden md:flex">
            <ThemeSwitch className="flex items-center" />
          </NavbarItem>

          <NavbarItem className="flex h-full items-center hidden md:flex">
            <NextLink href="/account" passHref legacyBehavior>
              <Link className={clsx(navLinkClasses, "flex items-center")} color="foreground">
                My Account
              </Link>
            </NextLink>
          </NavbarItem>

          {/* Button: Hidden on small screens, visible on medium and larger */}
          <NavbarItem className="hidden md:flex h-full items-center">
            <NextLink href="/pricing" passHref legacyBehavior>
              <Button
                as={NextLink}
                className="w-full md:h-11 md:w-auto font-bold flex items-center"
                color="primary"
                endContent={
                  <FaArrowRight
                    className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
                    strokeWidth={2}
                  />
                }
                href="/pricing"
                radius="full"
                size="lg"
              >
                Get 83% Off
              </Button>
            </NextLink>
          </NavbarItem>

          {/* Menu toggle: Visible on small screens, hidden on medium and larger */}
          <NavbarItem className="ml-auto w-10 h-full flex justify-end items-center md:hidden">
            <NavbarMenuToggle
              aria-label="Open menu"
              className="w-full h-full pt-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={<FaBars />}
            />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Drawer */}
        <MobileDrawer
          isMenuOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onLogout={handleLogout}
          accountLinks={accountLinks}
          onSelect={handleSelect}
        />
      </NextUINavbar>
    </>
  );
};
