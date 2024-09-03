"use client";

import { useState, FC, useEffect } from "react";
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
import { LargeLogo, SmallLogo, ThemeSwitch } from "@/components";
import { MobileDrawer } from "@/components/MobileDrawer";
import { FaBars, FaArrowRight } from "react-icons/fa";
import { trackEvent } from "@/utils/va";

export const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

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
              <SmallLogo className="w-6 h-6 md:hidden" />
              <LargeLogo className="h-5 md:h-6" />
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
                Get 82% Off
              </Button>
            </NextLink>
          </NavbarItem>

          {/* Menu toggle: Visible on small screens, hidden on medium and larger */}
          <NavbarItem className="ml-auto w-10 h-full flex justify-end items-center md:hidden">
            <NavbarMenuToggle
              aria-label="Open menu"
              className="w-full h-full pt-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              icon={<FaBars />}  // Always display the hamburger icon
            />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Drawer */}
        <MobileDrawer isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </NextUINavbar>
    </>
  );
};
