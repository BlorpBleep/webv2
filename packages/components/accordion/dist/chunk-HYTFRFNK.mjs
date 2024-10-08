"use client";
import {
  useAccordionItem
} from "./chunk-XGGOPONM.mjs";

// src/accordion-item.tsx
import { forwardRef } from "@nextui-org/system";
import { useMemo } from "react";
import { ChevronIcon } from "@nextui-org/shared-icons";
import { AnimatePresence, LazyMotion, domAnimation, m, useWillChange } from "framer-motion";
import { TRANSITION_VARIANTS } from "@nextui-org/framer-utils";
import { jsx, jsxs } from "react/jsx-runtime";
var AccordionItem = forwardRef((props, ref) => {
  const {
    Component,
    HeadingComponent,
    classNames,
    slots,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getTitleProps,
    getSubtitleProps,
    getContentProps,
    getIndicatorProps
  } = useAccordionItem({ ...props, ref });
  const willChange = useWillChange();
  const indicatorContent = useMemo(() => {
    if (typeof indicator === "function") {
      return indicator({ indicator: /* @__PURE__ */ jsx(ChevronIcon, {}), isOpen, isDisabled });
    }
    if (indicator)
      return indicator;
    return null;
  }, [indicator, isOpen, isDisabled]);
  const indicatorComponent = indicatorContent || /* @__PURE__ */ jsx(ChevronIcon, {});
  const content = useMemo(() => {
    if (disableAnimation) {
      return /* @__PURE__ */ jsx("div", { ...getContentProps(), children });
    }
    const transitionVariants = {
      exit: { ...TRANSITION_VARIANTS.collapse.exit, overflowY: "hidden" },
      enter: { ...TRANSITION_VARIANTS.collapse.enter, overflowY: "unset" }
    };
    return keepContentMounted ? /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(
      m.section,
      {
        animate: isOpen ? "enter" : "exit",
        exit: "exit",
        initial: "exit",
        style: { willChange },
        variants: transitionVariants,
        onKeyDown: (e) => {
          e.stopPropagation();
        },
        ...motionProps,
        children: /* @__PURE__ */ jsx("div", { ...getContentProps(), children })
      },
      "accordion-content"
    ) }) : /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(
      m.section,
      {
        animate: "enter",
        exit: "exit",
        initial: "exit",
        style: { willChange },
        variants: transitionVariants,
        onKeyDown: (e) => {
          e.stopPropagation();
        },
        ...motionProps,
        children: /* @__PURE__ */ jsx("div", { ...getContentProps(), children })
      },
      "accordion-content"
    ) }) });
  }, [isOpen, disableAnimation, keepContentMounted, children, motionProps]);
  return /* @__PURE__ */ jsxs(Component, { ...getBaseProps(), children: [
    /* @__PURE__ */ jsx(HeadingComponent, { ...getHeadingProps(), children: /* @__PURE__ */ jsxs("button", { ...getButtonProps(), children: [
      startContent && /* @__PURE__ */ jsx("div", { className: slots.startContent({ class: classNames == null ? void 0 : classNames.startContent }), children: startContent }),
      /* @__PURE__ */ jsxs("div", { className: slots.titleWrapper({ class: classNames == null ? void 0 : classNames.titleWrapper }), children: [
        title && /* @__PURE__ */ jsx("span", { ...getTitleProps(), children: title }),
        subtitle && /* @__PURE__ */ jsx("span", { ...getSubtitleProps(), children: subtitle })
      ] }),
      !hideIndicator && indicatorComponent && /* @__PURE__ */ jsx("span", { ...getIndicatorProps(), children: indicatorComponent })
    ] }) }),
    content
  ] });
});
AccordionItem.displayName = "NextUI.AccordionItem";
var accordion_item_default = AccordionItem;

export {
  accordion_item_default
};
