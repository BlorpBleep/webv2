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

// src/arrow-left.tsx
var arrow_left_exports = {};
__export(arrow_left_exports, {
  ArrowLeftIcon: () => ArrowLeftIcon
});
module.exports = __toCommonJS(arrow_left_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var ArrowLeftIcon = ({ strokeWidth = 1.5, ...otherProps }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    viewBox: "0 0 24 24",
    width: "1em",
    ...otherProps,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M9.57 5.92993L3.5 11.9999L9.57 18.0699",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "10",
          strokeWidth
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          d: "M20.5 12H3.67004",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "10",
          strokeWidth
        }
      )
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrowLeftIcon
});