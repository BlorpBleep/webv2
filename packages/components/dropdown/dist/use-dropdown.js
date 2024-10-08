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

// src/use-dropdown.ts
var use_dropdown_exports = {};
__export(use_dropdown_exports, {
  useDropdown: () => useDropdown
});
module.exports = __toCommonJS(use_dropdown_exports);
var import_system = require("@nextui-org/system");
var import_menu = require("@react-stately/menu");
var import_menu2 = require("@react-aria/menu");
var import_theme = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_aria_utils = require("@nextui-org/aria-utils");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
function useDropdown(props) {
  var _a;
  const globalContext = (0, import_system.useProviderContext)();
  const {
    as,
    triggerRef: triggerRefProp,
    isOpen,
    defaultOpen,
    onOpenChange,
    isDisabled,
    type = "menu",
    trigger = "press",
    placement = "bottom",
    closeOnSelect = true,
    shouldBlockScroll = true,
    classNames: classNamesProp,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    onClose,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const triggerRef = (0, import_react.useRef)(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = (0, import_react.useRef)(null);
  const popoverRef = (0, import_react.useRef)(null);
  const state = (0, import_menu.useMenuTriggerState)({
    trigger,
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen2) => {
      onOpenChange == null ? void 0 : onOpenChange(isOpen2);
      if (!isOpen2) {
        onClose == null ? void 0 : onClose();
      }
    }
  });
  const { menuTriggerProps, menuProps } = (0, import_menu2.useMenuTrigger)(
    { type, trigger, isDisabled },
    state,
    menuTriggerRef
  );
  const classNames = (0, import_react.useMemo)(
    () => (0, import_theme.dropdown)({
      className
    }),
    [className]
  );
  const onMenuAction = (menuCloseOnSelect) => {
    if (menuCloseOnSelect !== void 0 && !menuCloseOnSelect) {
      return;
    }
    if (closeOnSelect) {
      state.close();
    }
  };
  const getPopoverProps = (props2 = {}) => {
    const popoverProps = (0, import_utils.mergeProps)(otherProps, props2);
    return {
      state,
      placement,
      ref: popoverRef,
      disableAnimation,
      shouldBlockScroll,
      scrollRef: menuRef,
      triggerRef: menuTriggerRef,
      ...popoverProps,
      classNames: {
        ...classNamesProp,
        ...props2.classNames,
        content: (0, import_shared_utils.clsx)(classNames, classNamesProp == null ? void 0 : classNamesProp.content, props2.className)
      },
      shouldCloseOnInteractOutside: (popoverProps == null ? void 0 : popoverProps.shouldCloseOnInteractOutside) ? popoverProps.shouldCloseOnInteractOutside : (element) => (0, import_aria_utils.ariaShouldCloseOnInteractOutside)(element, triggerRef, state)
    };
  };
  const getMenuTriggerProps = (originalProps = {}, _ref = null) => {
    const { onPress, onPressStart, ...otherMenuTriggerProps } = menuTriggerProps;
    return {
      ...(0, import_utils.mergeProps)(otherMenuTriggerProps, { isDisabled }, originalProps),
      ref: (0, import_react_utils.mergeRefs)(_ref, triggerRef)
    };
  };
  const getMenuProps = (props2, _ref = null) => {
    return {
      ref: (0, import_react_utils.mergeRefs)(_ref, menuRef),
      menuProps,
      closeOnSelect,
      ...(0, import_utils.mergeProps)(props2, {
        onAction: (key) => {
          var _a2, _b;
          const item = (_a2 = props2 == null ? void 0 : props2.children) == null ? void 0 : _a2.find((item2) => item2.key === key);
          if (((_b = item == null ? void 0 : item.props) == null ? void 0 : _b.closeOnSelect) === false) {
            onMenuAction(false);
            return;
          }
          onMenuAction(props2 == null ? void 0 : props2.closeOnSelect);
        },
        onClose: state.close
      })
    };
  };
  return {
    Component,
    menuRef,
    menuProps,
    classNames,
    closeOnSelect,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    disableAnimation,
    getPopoverProps,
    getMenuProps,
    getMenuTriggerProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDropdown
});
