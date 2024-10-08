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

// src/date-range-picker-field.tsx
var date_range_picker_field_exports = {};
__export(date_range_picker_field_exports, {
  default: () => date_range_picker_field_default
});
module.exports = __toCommonJS(date_range_picker_field_exports);
var import_date = require("@internationalized/date");
var import_react = require("react");
var import_datepicker = require("@react-aria/datepicker");
var import_datepicker2 = require("@react-stately/datepicker");
var import_date_input = require("@nextui-org/date-input");
var import_react_utils = require("@nextui-org/react-utils");
var import_i18n = require("@react-aria/i18n");
var import_utils = require("@react-aria/utils");
var import_jsx_runtime = require("react/jsx-runtime");
function DateRangePickerField(props, ref) {
  const { as, slots, createCalendar: createCalendarProp, classNames, ...otherProps } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { locale } = (0, import_i18n.useLocale)();
  let state = (0, import_datepicker2.useDateFieldState)({
    ...otherProps,
    locale,
    createCalendar: !createCalendarProp || typeof createCalendarProp !== "function" ? import_date.createCalendar : createCalendarProp
  });
  const inputRef = (0, import_react.useRef)(null);
  const {
    fieldProps,
    inputProps,
    isInvalid: ariaIsInvalid
  } = (0, import_datepicker.useDateField)({ ...otherProps, inputRef }, state, domRef);
  const isInvalid = props.isInvalid || ariaIsInvalid;
  state.isInvalid = isInvalid;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...(0, import_utils.mergeProps)(fieldProps, (0, import_react_utils.filterDOMProps)(otherProps)), ref: domRef, children: [
    state.segments.map((segment, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_date_input.DateInputSegment,
      {
        classNames,
        segment,
        slots,
        state
      },
      i
    )),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...inputProps, ref: inputRef })
  ] });
}
DateRangePickerField.displayName = "NextUI.DateRangePickerField";
var date_range_picker_field_default = (0, import_react.forwardRef)(DateRangePickerField);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
