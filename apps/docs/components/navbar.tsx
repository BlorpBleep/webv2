"use client";

import { useRef, useState, FC, ReactNode, Key } from "react";
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
import { dataFocusVisibleClasses } from "@nextui-org/theme";
import { ChevronDownIcon, LinkIcon } from "@nextui-org/shared-icons";
import { isAppleDevice } from "@react-aria/utils";
import { clsx } from "@nextui-org/shared-utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { includes } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";

import { currentVersion } from "@/utils/version";
import { siteConfig } from "@/config/site";
import { Route } from "@/libs/docs/page";
import { LargeLogo, SmallLogo, ThemeSwitch } from "@/components";
import { TwitterIcon, GithubIcon, HelpIcon, SearchLinearIcon, BugIcon } from "@/components/icons";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { DocsSidebar } from "@/components/docs/sidebar";
import { useCmdkStore } from "@/components/cmdk";
import { FbRoadmapLink } from "@/components/featurebase/fb-roadmap-link";
import { trackEvent } from "@/utils/va";
import arrowRightUpIcon from "@iconify/icons-solar/arrow-right-up-linear";
import { Icon } from "@iconify/react/dist/offline";

export interface NavbarProps {
  routes: Route[];
  mobileRoutes?: Route[];
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ children, routes, mobileRoutes = [], slug, tag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
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

  const docsPaths = [
    "/docs/guide/introduction",
    "/docs/guide/installation",
    "/docs/guide/upgrade-to-v2",
  ];

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
    <NextUINavbar
      ref={ref}
      className={clsx({
        "z-[100001]": isMenuOpen,
        "bg-transparent": true, // Ensure the navbar is transparent
      })}
      isMenuOpen={isMenuOpen}
      maxWidth="full" 
      
      
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Left section: Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full bg-transparent" justify="start">
        <NavbarBrand as="li" className="gap-3 ">
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
      <NavbarContent className="basis-full justify-center bg-transparent" justify="center">
        <ul className="hidden lg:flex gap-4 justify-start items-center">
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
              data-active={includes(pathname, "figma")}
              href="/figma"
              onClick={() => handlePressNavbarItem("Figma", "/figma")}
            >
              <div className={clsx("relative")}>
                Roadmap
                <Icon
                  className="absolute right-[-10px] top-0 outline-none transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]"
                  icon={arrowRightUpIcon}
                  width={10}
                />
              </div>
            </NextLink>
          </NavbarItem>
        </ul>
      </NavbarContent>

      {/* Right section: Theme Switch and Search */}
      <NavbarContent className="flex w-full gap-2 sm:hidden bg-transparent" justify="end">
        <NavbarItem className="flex h-full items-center">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex h-full items-center">
          <button
            className={clsx(
              "transition-opacity p-1 hover:opacity-80 rounded-full cursor-pointer outline-none",
              // focus ring
              ...dataFocusVisibleClasses,
            )}
            data-focus-visible={isFocusVisible}
            {...focusProps}
            {...pressProps}
          >
            <SearchLinearIcon className="mt-px text-default-600 dark:text-default-500" size={20} />
          </button>
        </NavbarItem>
        <NavbarItem className="w-10 h-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="w-full h-full pt-1"
          />
        </NavbarItem>
      </NavbarContent>

      {/* Responsive Menu */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full justify-end bg-transparent">
        <NavbarItem className="hidden sm:flex">
          <Link
            className="p-1"
            aria-label="Help"
            color="foreground"
            data-active={includes(pathname, "components")}
            href="docs/faq/plans_orders"
            onPress={() => handlePressNavbarItem("Components", "docs/faq/plans_orders")}
          >
            <HelpIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <Link
            color="foreground"
            aria-label="auth"
            className="p-1"
            href="/auth"
            onPress={() => handlePressNavbarItem("Auth", "/auth")}
          >
            <BugIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden sm:flex lg:hidden ml-4"
        />
      </NavbarContent>

      <NavbarMenu>
        <DocsSidebar
          className="mt-4 pt-8"
          routes={[...mobileRoutes, ...routes]}
          slug={slug}
          tag={tag}
        />
        {children}
      </NavbarMenu>
    </NextUINavbar>
  );
};
