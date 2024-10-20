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

// src/selector.tsx
var selector_exports = {};
__export(selector_exports, {
  SelectorIcon: () => SelectorIcon
});
module.exports = __toCommonJS(selector_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var SelectorIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
    strokeWidth: "1.5",
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0h24v24H0z", fill: "none", stroke: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 9l4 -4l4 4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 15l-4 4l-4 -4" })
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SelectorIcon
});
