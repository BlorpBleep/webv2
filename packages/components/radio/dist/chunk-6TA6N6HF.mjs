"use client";
import {
  useRadio
} from "./chunk-GGIMQAGW.mjs";

// src/radio.tsx
import { forwardRef } from "@nextui-org/system";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { jsx, jsxs } from "react/jsx-runtime";
var Radio = forwardRef((props, ref) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
    getDescriptionProps
  } = useRadio({ ...props, ref });
  return /* @__PURE__ */ jsxs(Component, { ...getBaseProps(), children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { elementType: "span", children: /* @__PURE__ */ jsx("input", { ...getInputProps() }) }),
    /* @__PURE__ */ jsx("span", { ...getWrapperProps(), children: /* @__PURE__ */ jsx("span", { ...getControlProps() }) }),
    /* @__PURE__ */ jsxs("div", { ...getLabelWrapperProps(), children: [
      children && /* @__PURE__ */ jsx("span", { ...getLabelProps(), children }),
      description && /* @__PURE__ */ jsx("span", { ...getDescriptionProps(), children: description })
    ] })
  ] });
});
Radio.displayName = "NextUI.Radio";
var radio_default = Radio;

export {
  radio_default
};
