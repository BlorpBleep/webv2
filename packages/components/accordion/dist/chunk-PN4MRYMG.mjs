"use client";
import {
  accordion_item_default
} from "./chunk-HYTFRFNK.mjs";
import {
  useAccordion
} from "./chunk-PNGZVYML.mjs";

// src/accordion.tsx
import { forwardRef } from "@nextui-org/system";
import { LayoutGroup } from "framer-motion";
import { Divider } from "@nextui-org/divider";
import { Fragment, useCallback, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var AccordionGroup = forwardRef((props, ref) => {
  const {
    Component,
    values,
    state,
    isSplitted,
    showDivider,
    getBaseProps,
    disableAnimation,
    handleFocusChanged: handleFocusChangedProps,
    itemClasses,
    dividerProps
  } = useAccordion({
    ...props,
    ref
  });
  const handleFocusChanged = useCallback(
    (isFocused, key) => handleFocusChangedProps(isFocused, key),
    [handleFocusChangedProps]
  );
  const content = useMemo(() => {
    return [...state.collection].map((item, index) => {
      const classNames = { ...itemClasses, ...item.props.classNames || {} };
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          accordion_item_default,
          {
            item,
            variant: props.variant,
            onFocusChange: handleFocusChanged,
            ...values,
            ...item.props,
            classNames
          }
        ),
        !item.props.hidden && !isSplitted && showDivider && index < state.collection.size - 1 && /* @__PURE__ */ jsx(Divider, { ...dividerProps })
      ] }, item.key);
    });
  }, [values, itemClasses, handleFocusChanged, isSplitted, showDivider, state.collection]);
  return /* @__PURE__ */ jsx(Component, { ...getBaseProps(), children: disableAnimation ? content : /* @__PURE__ */ jsx(LayoutGroup, { children: content }) });
});
AccordionGroup.displayName = "NextUI.Accordion";
var accordion_default = AccordionGroup;

export {
  accordion_default
};
