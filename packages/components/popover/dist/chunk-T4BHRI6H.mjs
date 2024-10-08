"use client";
import {
  PopoverProvider
} from "./chunk-SQ3I4X62.mjs";
import {
  usePopover
} from "./chunk-GXO5HV26.mjs";

// src/popover.tsx
import { Children } from "react";
import { forwardRef } from "@nextui-org/system";
import { Overlay } from "@react-aria/overlays";
import { AnimatePresence } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
var Popover = forwardRef((props, ref) => {
  const { children, ...otherProps } = props;
  const context = usePopover({ ...otherProps, ref });
  const [trigger, content] = Children.toArray(children);
  const overlay = /* @__PURE__ */ jsx(Overlay, { portalContainer: context.portalContainer, children: content });
  return /* @__PURE__ */ jsxs(PopoverProvider, { value: context, children: [
    trigger,
    context.disableAnimation && context.isOpen ? overlay : /* @__PURE__ */ jsx(AnimatePresence, { children: context.isOpen ? overlay : null })
  ] });
});
Popover.displayName = "NextUI.Popover";
var popover_default = Popover;

export {
  popover_default
};
