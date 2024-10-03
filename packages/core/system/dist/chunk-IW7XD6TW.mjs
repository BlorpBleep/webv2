"use client";
import {
  ProviderContext
} from "./chunk-Q66YAGZJ.mjs";

// src/provider.tsx
import { I18nProvider } from "@react-aria/i18n";
import { RouterProvider } from "@react-aria/utils";
import { OverlayProvider } from "@react-aria/overlays";
import { useMemo } from "react";
import { MotionGlobalConfig } from "framer-motion";
var NextUIProvider = ({
  children,
  navigate,
  disableAnimation = false,
  disableRipple = false,
  skipFramerMotionAnimations = disableAnimation,
  validationBehavior = "aria",
  locale = "en-US",
  defaultDates,
  createCalendar,
  ...otherProps
}) => {
  let contents = children;
  if (navigate) {
    contents = <RouterProvider navigate={navigate}>{contents}</RouterProvider>;
  }
  const context = useMemo(() => {
    if (disableAnimation && skipFramerMotionAnimations) {
      MotionGlobalConfig.skipAnimations = true;
    }
    return {
      createCalendar,
      defaultDates,
      disableAnimation,
      disableRipple,
      validationBehavior
    };
  }, [
    createCalendar,
    defaultDates == null ? void 0 : defaultDates.maxDate,
    defaultDates == null ? void 0 : defaultDates.minDate,
    disableAnimation,
    disableRipple,
    validationBehavior
  ]);
  return <ProviderContext value={context}><I18nProvider locale={locale}><OverlayProvider {...otherProps}>{contents}</OverlayProvider></I18nProvider></ProviderContext>;
};

export {
  NextUIProvider
};
