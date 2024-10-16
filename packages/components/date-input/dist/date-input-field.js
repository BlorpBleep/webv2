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

// src/date-input-field.tsx
var date_input_field_exports = {};
__export(date_input_field_exports, {
  DateInputField: () => DateInputField
});
module.exports = __toCommonJS(date_input_field_exports);
var import_react2 = require("react");

// src/date-input-segment.tsx
var import_datepicker = require("@react-aria/datepicker");
var import_utils = require("@react-aria/utils");
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_jsx_runtime = require("react/jsx-runtime");
var DateInputSegment = ({
  state,
  segment,
  slots,
  classNames,
  ...otherProps
}) => {
  const ref = (0, import_react.useRef)(null);
  let { segmentProps } = (0, import_datepicker.useDateSegment)(segment, state, ref);
  delete segmentProps.autoCapitalize;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ...(0, import_utils.mergeProps)(segmentProps, otherProps),
      ref,
      className: slots.segment({
        class: classNames == null ? void 0 : classNames.segment
      }),
      "data-editable": (0, import_shared_utils.dataAttr)(segment.isEditable),
      "data-invalid": (0, import_shared_utils.dataAttr)(state.isInvalid),
      "data-placeholder": (0, import_shared_utils.dataAttr)(segment.isPlaceholder),
      "data-slot": "segment",
      "data-type": segment.type,
      style: {
        ...segmentProps.style
      },
      children: segment.text
    }
  );
};

// src/date-input-field.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var DateInputField = (0, import_react2.forwardRef)((props, ref) => {
  const { as, state, slots, inputProps, classNames, ...otherProps } = props;
  const Component = as || "div";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Component, { ...otherProps, ref, children: [
    state.segments.map((segment, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      DateInputSegment,
      {
        classNames,
        segment,
        slots,
        state
      },
      i
    )),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { ...inputProps })
  ] });
});
DateInputField.displayName = "NextUI.DateInputField";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateInputField
});
