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
import { ArrowRightIcon, SearchLinearIcon } from "@nextui-org/shared-icons";
import { isAppleDevice } from "@react-aria/utils";
import { usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";

import { currentVersion } from "@/utils/version";
import { siteConfig } from "@/config/site";
import { Route } from "@/libs/docs/page";
import { LargeLogo, SmallLogo, ThemeSwitch } from "@/components";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { DocsSidebar } from "@/components/docs/sidebar";
import { useCmdkStore } from "@/components/cmdk";
import { trackEvent } from "@/utils/va";

export interface NavbarProps {
  routes: Route[];
  mobileRoutes?: Route[];
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ children, routes, mobileRoutes = [], slug, tag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [commandKey, setCommandKey] = useState<"ctrl" | "command">("command");

  const ref = useRef<HTMLElement>(null);
  const isMounted = useIsMounted();

  const pathname = usePathname();

  const cmdkStore = useCmdkStore();

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    setCommandKey(isAppleDevice() ? "command" : "ctrl");
  }, []);

  const handleOpenCmdk = () => {
    cmdkStore.onOpen();
    trackEvent("Navbar - Search", {
      name: "navbar - search",
      action: "press",
      category: "cmdk",
    });
  };

  const { pressProps } = usePress({
    onPress: handleOpenCmdk,
  });
  const { focusProps, isFocusVisible } = useFocusRing();

  const searchButton = (
    <Button
      aria-label="Quick search"
      className="text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
      endContent={
        <Kbd className="hidden py-0.5 px-2 lg:inline-block" keys={commandKey}>
          K
        </Kbd>
      }
      startContent={
        <SearchLinearIcon
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          size={18}
          strokeWidth={2}
        />
      }
      onPress={handleOpenCmdk}
    >
      Quick Search...
    </Button>
  );

  if (pathname.includes("/examples")) {
    return null;
  }

  const navLinkClasses = clsx(link({ color: "foreground" }), "data-[active=true]:text-primary");

  const handleVersionChange = (key: Key) => {
    if (key === "v1") {
      const newWindow = window.open("https://v1.nextui.org", "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  };

  const handlePressNavbarItem = (name: string, url: string) => {
    trackEvent("NavbarItem", {
      name,
      action: "press",
      category: "navbar",
      data: url,
    });
  };

  return (
    <>
      <NextUINavbar
        ref={ref}
        className={clsx({
          "z-[100001]": isMenuOpen,
          "bg-transparent": true,
          "hidden md:flex": true, // Hide navbar on small screens and show on medium and larger
        })}
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left section: Logo */}
        <NavbarContent className="basis-1/4 sm:basis-1/4 bg-transparent" justify="start">
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

        {/* Middle section: Navigation Links */}
        <NavbarContent className="basis-1/2 justify-center bg-transparent items-center" justify="center">
          <ul className="flex gap-4 justify-center items-center">
            <NavbarItem>
              <NextLink
                className={navLinkClasses}
                color="foreground"
                data-active={includes(pathname, "pricing")}
                href="/pricing"
                onClick={() => handlePressNavbarItem("Pricing", "/pricing")}
              >
                Pricing
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                className={navLinkClasses}
                color="foreground"
                data-active={includes(pathname, "downloads")}
                href="/downloads"
                onClick={() => handlePressNavbarItem("Downloads", "/downloads")}
              >
                Download
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                className={navLinkClasses}
                color="foreground"
                data-active={includes(pathname, "blog")}
                href="/blog"
                onClick={() => handlePressNavbarItem("Blog", "/blog")}
              >
                Blog
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                className={navLinkClasses}
                color="foreground"
                data-active={includes(pathname, "teams")}
                href="/teams"
                onClick={() => handlePressNavbarItem("Teams", "/teams")}
              >
                Teams
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <NextLink
                className={navLinkClasses}
                color="foreground"
                data-active={includes(pathname, "help")}
                href="/docs/faq/plans_orders"
                onClick={() => handlePressNavbarItem("Help", "/docs/faq/plans_orders")}
              >
                Help
              </NextLink>
            </NavbarItem>
          </ul>
        </NavbarContent>

        {/* Right section: My Account Link, Get CicadaVPN Button, and Theme Switch */}
        <NavbarContent className="basis-1/4 flex gap-4 bg-transparent items-center justify-end">
          <NavbarItem className="flex h-full items-center ml-auto">
            <ThemeSwitch className="flex items-center" />
          </NavbarItem>

          <NavbarItem className="flex h-full items-center">
            <NextLink href="/account" passHref legacyBehavior>
              <Link
                className={clsx(navLinkClasses, "flex items-center")}
                color="foreground"
                href="/account"
                onClick={() => handlePressNavbarItem("Account", "/account")}
              >
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
                  <ArrowRightIcon
                    className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
                    strokeWidth={2}
                  />
                }
                href="/pricing"
                radius="full"
                size="lg"
                onPress={() => {
                  trackEvent("Navbar - Get CicadaVPN", {
                    name: "Get CicadaVPN",
                    action: "click",
                    category: "navbar",
                    data: "/pricing",
                  });
                }}
              >
                Get 82% Off
              </Button>
            </NextLink>
          </NavbarItem>

          {/* Menu toggle: Visible on small screens, hidden on medium and larger */}
          <NavbarItem className="w-10 h-full flex md:hidden">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="w-full h-full pt-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Explicitly handle menu toggle
            />
          </NavbarItem>
        </NavbarContent>

        {/* Ensure the menu is correctly toggled */}
        <NavbarMenu className="md:hidden">
          <DocsSidebar
            className="mt-4 pt-8"
            routes={[...mobileRoutes, ...routes]}
            slug={slug}
            tag={tag}
          />
          {children}
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
