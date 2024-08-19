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
import { jsx } from "react/jsx-runtime";
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
    contents = /* @__PURE__ */ jsx(RouterProvider, { navigate, children: contents });
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
  return /* @__PURE__ */ jsx(ProviderContext, { value: context, children: /* @__PURE__ */ jsx(I18nProvider, { locale, children: /* @__PURE__ */ jsx(OverlayProvider, { ...otherProps, children: contents }) }) });
};

export {
  NextUIProvider
};