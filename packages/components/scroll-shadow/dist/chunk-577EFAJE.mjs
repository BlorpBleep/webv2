"use client";
import {
  useScrollShadow
} from "./chunk-NGBOO6ON.mjs";

// src/scroll-shadow.tsx
import { forwardRef } from "@nextui-org/system";
var ScrollShadow = forwardRef((props, ref) => {
  const { Component, children, getBaseProps } = useScrollShadow({ ...props, ref });
  return <Component {...getBaseProps()}>{children}</Component>;
});
ScrollShadow.displayName = "NextUI.ScrollShadow";
var scroll_shadow_default = ScrollShadow;

export {
  scroll_shadow_default
};
