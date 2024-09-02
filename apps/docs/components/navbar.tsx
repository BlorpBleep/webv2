"use client";

import { useRef, useState, FC, ReactNode, Key, useEffect } from "react";
import {
  link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Link,
  Button,
  Kbd,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Chip,
} from "@nextui-org/react";
import { clsx } from "@nextui-org/shared-utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { includes } from "lodash";
import { ArrowRightIcon } from "@nextui-org/shared-icons";

import { LargeLogo, SmallLogo, ThemeSwitch } from "@/components";

export interface NavbarProps {
  routes: any[]; // Replace with appropriate type
  mobileRoutes?: any[]; // Replace with appropriate type
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ children, routes, mobileRoutes = [], slug, tag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      console.log("Menu closed due to route change");
    }
  }, [pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    console.log(`Menu toggled: ${isMenuOpen ? "Closed" : "Open"}`);
  };

  const handlePressNavbarItem = (name: string, url: string) => {
    console.log(`Navbar item pressed: ${name}`);
    trackEvent("NavbarItem", {
      name,
      action: "press",
      category: "navbar",
      data: url,
    });
  };

  const navLinkClasses = clsx(link({ color: "foreground" }), "data-[active=true]:text-primary");

  return (
    <>
      <NextUINavbar
        className={clsx({
          "z-[100001]": isMenuOpen,
          "bg-transparent": true,
        })}
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        position="sticky"
        onMenuOpenChange={(open) => {
          setIsMenuOpen(open);
          console.log(`Menu state changed: ${open ? "Open" : "Closed"}`);
        }}
      >
        {/* Left section: Logo */}
        <NavbarContent className="basis-1/2 md:basis-1/4 bg-transparent" justify="start">
          <NavbarBrand as="li" className="gap-3">
            <NextLink
              aria-label="Home"
              className="flex justify-start items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50"
              href="/"
              onClick={() => handlePressNavbarItem("Home", "/")}
            >
              <SmallLogo className="w-6 h-6 md:hidden" />
              <LargeLogo className="h-5 md:h-6" />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        {/* Right section: Hamburger and Menu Toggle */}
        <NavbarContent className="basis-1/2 md:basis-1/4 flex justify-end items-center">
          {/* Menu toggle: Visible on small screens, hidden on medium and larger */}
          <NavbarItem className="w-10 h-full flex md:hidden">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="w-full h-full pt-1"
              onClick={handleMenuToggle} // Use onClick for the menu toggle
            />
          </NavbarItem>
        </NavbarContent>

        {/* Menu Items */}
        <NavbarMenu className="md:hidden">
          <NavbarItem>
            <NextLink href="/pricing">
              <Link onClick={() => handlePressNavbarItem("Pricing", "/pricing")}>Pricing</Link>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/downloads">
              <Link onClick={() => handlePressNavbarItem("Downloads", "/downloads")}>Downloads</Link>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/blog">
              <Link onClick={() => handlePressNavbarItem("Blog", "/blog")}>Blog</Link>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/teams">
              <Link onClick={() => handlePressNavbarItem("Teams", "/teams")}>Teams</Link>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/docs/faq/plans_orders">
              <Link onClick={() => handlePressNavbarItem("Help", "/docs/faq/plans_orders")}>Help</Link>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href="/account">
              <Link onClick={() => handlePressNavbarItem("Account", "/account")}>My Account</Link>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
