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

// src/constants.ts
var constants_exports = {};
__export(constants_exports, {
  keyCodes: () => keyCodes,
  pointerMap: () => pointerMap
});
module.exports = __toCommonJS(constants_exports);
var keyCodes = {
  Enter: 13,
  " ": 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40
};
var pointerMap = [
  { name: "MouseLeft", pointerType: "mouse", button: "primary", height: 1, width: 1, pressure: 0.5 },
  { name: "MouseRight", pointerType: "mouse", button: "secondary" },
  { name: "MouseMiddle", pointerType: "mouse", button: "auxiliary" },
  { name: "TouchA", pointerType: "touch", height: 1, width: 1 },
  { name: "TouchB", pointerType: "touch" },
  { name: "TouchC", pointerType: "touch" }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  keyCodes,
  pointerMap
});
