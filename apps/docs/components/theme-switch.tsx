"use client";

import { FC, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { clsx } from "@nextui-org/shared-utils";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { trackEvent } from "@/utils/va";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Ensure client-side rendering

  // Delay rendering until the client is mounted
  useEffect(() => {
    setMounted(true);
    console.log("Component mounted, current theme:", theme); // Log initial theme
  }, [theme]);

  const onChange = () => {
    console.log("Current theme:", theme);
    theme === "light" ? setTheme("dark") : setTheme("light");

    console.log("Theme switched to:", theme === "light" ? "dark" : "light");

    trackEvent("ThemeChange", {
      action: "click",
      category: "theme",
      data: theme === "light" ? "dark" : "light",
    });
  };

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === "dark",
    "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    onChange,
  });

  if (!mounted) {
    return null; // Prevents rendering until the client has mounted
  }

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "p-1 w-8 h-8 transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-600 dark:!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {theme === "dark" ? <MoonFilledIcon size={22} /> : <SunFilledIcon size={22} />}
      </div>
    </Component>
  );
};
