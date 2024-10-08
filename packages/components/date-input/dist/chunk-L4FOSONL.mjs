"use client";
import {
  DateInputSegment
} from "./chunk-FZDKYON4.mjs";

// src/date-input-field.tsx
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var DateInputField = forwardRef((props, ref) => {
  const { as, state, slots, inputProps, classNames, ...otherProps } = props;
  const Component = as || "div";
  return /* @__PURE__ */ jsxs(Component, { ...otherProps, ref, children: [
    state.segments.map((segment, i) => /* @__PURE__ */ jsx(
      DateInputSegment,
      {
        classNames,
        segment,
        slots,
        state
      },
      i
    )),
    /* @__PURE__ */ jsx("input", { ...inputProps })
  ] });
});
DateInputField.displayName = "NextUI.DateInputField";

export {
  DateInputField
};
