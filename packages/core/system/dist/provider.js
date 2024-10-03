"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/provider.tsx
var provider_exports = {};
__export(provider_exports, {
  NextUIProvider: () => NextUIProvider
});
module.exports = __toCommonJS(provider_exports);
var import_i18n = require("@react-aria/i18n");
var import_utils = require("@react-aria/utils");
var import_overlays = require("@react-aria/overlays");
var import_react = require("react");
var import_framer_motion = require("framer-motion");

// src/provider-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [ProviderContext, useProviderContext] = (0, import_react_utils.createContext)({
  name: "ProviderContext",
  strict: false
});

// src/provider.tsx
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
    contents = <import_utils.RouterProvider navigate={navigate}>{contents}</import_utils.RouterProvider>;
  }
  const context = (0, import_react.useMemo)(() => {
    if (disableAnimation && skipFramerMotionAnimations) {
      import_framer_motion.MotionGlobalConfig.skipAnimations = true;
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
  return <ProviderContext value={context}><import_i18n.I18nProvider locale={locale}><import_overlays.OverlayProvider {...otherProps}>{contents}</import_overlays.OverlayProvider></import_i18n.I18nProvider></ProviderContext>;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NextUIProvider
});
