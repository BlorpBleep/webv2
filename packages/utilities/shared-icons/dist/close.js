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

// src/close.tsx
var close_exports = {};
__export(close_exports, {
  CloseIcon: () => CloseIcon
});
module.exports = __toCommonJS(close_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var CloseIcon = (props) => {
  const { isSelected, isIndeterminate, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      "aria-hidden": "true",
      fill: "none",
      focusable: "false",
      height: "1em",
      role: "presentation",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      width: "1em",
      ...otherProps,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6L6 18M6 6l12 12" })
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CloseIcon
});
