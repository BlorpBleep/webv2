"use client";
import {
  useTooltip
} from "./chunk-WIMSVD55.mjs";

// src/tooltip.tsx
import { forwardRef } from "@nextui-org/system";
import { OverlayContainer } from "@react-aria/overlays";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { TRANSITION_VARIANTS } from "@nextui-org/framer-utils";
import { warn } from "@nextui-org/shared-utils";
import { Children, cloneElement, isValidElement } from "react";
import { getTransformOrigins } from "@nextui-org/aria-utils";
import { mergeProps } from "@react-aria/utils";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var Tooltip = forwardRef((props, ref) => {
  const {
    Component,
    children,
    content,
    isOpen,
    portalContainer,
    placement,
    disableAnimation,
    motionProps,
    getTriggerProps,
    getTooltipProps,
    getTooltipContentProps
  } = useTooltip({
    ...props,
    ref
  });
  let trigger;
  try {
    const childrenNum = Children.count(children);
    if (childrenNum !== 1)
      throw new Error();
    if (!isValidElement(children)) {
      trigger = /* @__PURE__ */ jsx("p", { ...getTriggerProps(), children });
    } else {
      const child = children;
      trigger = cloneElement(child, getTriggerProps(child.props, child.ref));
    }
  } catch (error) {
    trigger = /* @__PURE__ */ jsx("span", {});
    warn("Tooltip must have only one child node. Please, check your code.");
  }
  const { ref: tooltipRef, id, style, ...otherTooltipProps } = getTooltipProps();
  const animatedContent = /* @__PURE__ */ jsx("div", { ref: tooltipRef, id, style, children: /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(
    m.div,
    {
      animate: "enter",
      exit: "exit",
      initial: "exit",
      variants: TRANSITION_VARIANTS.scaleSpring,
      ...mergeProps(motionProps, otherTooltipProps),
      style: {
        ...getTransformOrigins(placement)
      },
      children: /* @__PURE__ */ jsx(Component, { ...getTooltipContentProps(), children: content })
    }
  ) }) });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    trigger,
    disableAnimation && isOpen ? /* @__PURE__ */ jsx(OverlayContainer, { portalContainer, children: /* @__PURE__ */ jsx("div", { ref: tooltipRef, id, style, ...otherTooltipProps, children: /* @__PURE__ */ jsx(Component, { ...getTooltipContentProps(), children: content }) }) }) : /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen ? /* @__PURE__ */ jsx(OverlayContainer, { portalContainer, children: animatedContent }) : null })
  ] });
});
Tooltip.displayName = "NextUI.Tooltip";
var tooltip_default = Tooltip;

export {
  tooltip_default
};
