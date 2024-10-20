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

// src/use-checkbox-group.ts
var use_checkbox_group_exports = {};
__export(use_checkbox_group_exports, {
  useCheckboxGroup: () => useCheckboxGroup
});
module.exports = __toCommonJS(use_checkbox_group_exports);
var import_system = require("@nextui-org/system");
var import_react = require("react");
var import_utils = require("@react-aria/utils");
var import_theme = require("@nextui-org/theme");
var import_checkbox = require("@react-aria/checkbox");
var import_checkbox2 = require("@react-stately/checkbox");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
function useCheckboxGroup(props) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const {
    as,
    ref,
    classNames,
    children,
    label,
    radius,
    value,
    name,
    defaultValue,
    isInvalid: isInvalidProp,
    validationState,
    size = "md",
    color = "primary",
    orientation = "vertical",
    lineThrough = false,
    isDisabled = false,
    validationBehavior = (_a = globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _a : "aria",
    disableAnimation = (_b = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false,
    isReadOnly,
    isRequired,
    onValueChange,
    description,
    errorMessage,
    className,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const checkboxGroupProps = (0, import_react.useMemo)(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": (0, import_shared_utils.safeAriaLabel)(otherProps["aria-label"], label),
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      validationBehavior,
      isInvalid: validationState === "invalid" || isInvalidProp,
      onChange: (0, import_utils.chain)(props.onChange, onValueChange)
    };
  }, [
    value,
    name,
    label,
    defaultValue,
    isRequired,
    isReadOnly,
    orientation,
    onValueChange,
    isInvalidProp,
    validationState,
    validationBehavior,
    otherProps["aria-label"],
    otherProps
  ]);
  const groupState = (0, import_checkbox2.useCheckboxGroupState)(checkboxGroupProps);
  const {
    labelProps,
    groupProps,
    descriptionProps,
    errorMessageProps,
    validationErrors,
    validationDetails
  } = (0, import_checkbox.useCheckboxGroup)(checkboxGroupProps, groupState);
  const context = (0, import_react.useMemo)(
    () => ({
      size,
      color,
      radius,
      lineThrough,
      isInvalid: groupState.isInvalid,
      isDisabled,
      disableAnimation,
      validationBehavior,
      groupState
    }),
    [
      size,
      color,
      radius,
      lineThrough,
      isDisabled,
      disableAnimation,
      validationBehavior,
      groupState.value,
      groupState.isDisabled,
      groupState.isReadOnly,
      groupState.isInvalid,
      groupState.isSelected
    ]
  );
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.checkboxGroup)({ isRequired, isInvalid: groupState.isInvalid, disableAnimation }),
    [isRequired, groupState.isInvalid, , disableAnimation]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = (0, import_react.useCallback)(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils.mergeProps)(
        groupProps,
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        })
      )
    };
  }, [slots, domRef, baseStyles, groupProps, otherProps]);
  const getLabelProps = (0, import_react.useCallback)(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = (0, import_react.useCallback)(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, orientation, classNames == null ? void 0 : classNames.wrapper]);
  const getDescriptionProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, descriptionProps, classNames == null ? void 0 : classNames.description]
  );
  const getErrorMessageProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, errorMessageProps, classNames == null ? void 0 : classNames.errorMessage]
  );
  return {
    Component,
    children,
    label,
    context,
    description,
    isInvalid: groupState.isInvalid,
    errorMessage: typeof errorMessage === "function" ? errorMessage({ isInvalid: groupState.isInvalid, validationErrors, validationDetails }) : errorMessage || (validationErrors == null ? void 0 : validationErrors.join(" ")),
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCheckboxGroup
});
