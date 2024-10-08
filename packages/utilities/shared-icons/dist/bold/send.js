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

// src/bold/send.tsx
var send_exports = {};
__export(send_exports, {
  SendFilledIcon: () => SendFilledIcon
});
module.exports = __toCommonJS(send_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var SendFilledIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    focusable: "false",
    height: "1em",
    role: "presentation",
    viewBox: "0 0 24 24",
    width: "1em",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { clipPath: "url(#clip0_2703_16)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "path",
        {
          clipRule: "evenodd",
          d: "M15.9518 16.8594L11.0969 19.2869C7.67397 20.9984 5.96247 21.8541 4.97025 21.5914C4.02634 21.3415 3.28914 20.6043 3.03925 19.6604C2.77657 18.6682 3.63232 16.9567 5.34381 13.5337C5.61861 12.9841 5.75602 12.7093 5.81297 12.4217C5.86816 12.143 5.86816 11.8561 5.81297 11.5774C5.75602 11.2898 5.61862 11.015 5.34381 10.4654C3.63232 7.0424 2.77657 5.3309 3.03925 4.33869C3.28914 3.39478 4.02635 2.65757 4.97025 2.40768C5.96247 2.145 7.67396 3.00075 11.097 4.71225L15.9518 7.13967C20.1929 9.26023 22.3135 10.3205 22.3135 11.9996C22.3135 13.6786 20.1929 14.7389 15.9518 16.8594ZM10.5157 11.9627C10.518 11.5485 10.8556 11.2146 11.2698 11.2169L17.1916 11.2497C17.6058 11.252 17.9397 11.5896 17.9374 12.0038C17.9351 12.418 17.5975 12.7519 17.1833 12.7497L11.2615 12.7168C10.8473 12.7145 10.5134 12.3769 10.5157 11.9627Z",
          fill: "currentColor",
          fillRule: "evenodd"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: "clip0_2703_16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { fill: "white", height: "24", width: "24" }) }) })
    ]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendFilledIcon
});
