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

// src/button-group-context.ts
var button_group_context_exports = {};
__export(button_group_context_exports, {
  ButtonGroupProvider: () => ButtonGroupProvider,
  useButtonGroupContext: () => useButtonGroupContext
});
module.exports = __toCommonJS(button_group_context_exports);
var import_react_utils = require("@nextui-org/react-utils");
var [ButtonGroupProvider, useButtonGroupContext] = (0, import_react_utils.createContext)({
  name: "ButtonGroupContext",
  strict: false
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ButtonGroupProvider,
  useButtonGroupContext
});
