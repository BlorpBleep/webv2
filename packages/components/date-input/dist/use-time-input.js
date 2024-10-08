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

// src/use-time-input.ts
var use_time_input_exports = {};
__export(use_time_input_exports, {
  useTimeInput: () => useTimeInput
});
module.exports = __toCommonJS(use_time_input_exports);
var import_i18n = require("@react-aria/i18n");
var import_utils = require("@react-aria/utils");
var import_system = require("@nextui-org/system");
var import_system2 = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_datepicker = require("@react-aria/datepicker");
var import_datepicker2 = require("@react-stately/datepicker");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_theme = require("@nextui-org/theme");
var import_react = require("react");
function useTimeInput(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system2.mapPropsVariants)(originalProps, import_theme.dateInput.variantKeys);
  const {
    ref,
    as,
    label,
    inputRef: inputRefProp,
    description,
    startContent,
    endContent,
    className,
    classNames,
    groupProps = {},
    labelProps: labelPropsProp,
    fieldProps: fieldPropsProp,
    errorMessageProps: errorMessagePropsProp,
    descriptionProps: descriptionPropsProp,
    validationBehavior = (_a = globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _a : "aria",
    shouldForceLeadingZeros = true,
    minValue,
    maxValue,
    isInvalid: isInvalidProp,
    errorMessage
  } = props;
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const inputRef = (0, import_react_utils.useDOMRef)(inputRefProp);
  const { locale } = (0, import_i18n.useLocale)();
  const disableAnimation = (_b = originalProps.disableAnimation) != null ? _b : globalContext == null ? void 0 : globalContext.disableAnimation;
  const state = (0, import_datepicker2.useTimeFieldState)({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
    isInvalid: isInvalidProp,
    shouldForceLeadingZeros
  });
  const {
    labelProps,
    fieldProps,
    inputProps,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
    isInvalid
  } = (0, import_datepicker.useTimeField)({ ...originalProps, label, validationBehavior, inputRef }, state, domRef);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const labelPlacement = (0, import_react.useMemo)(() => {
    var _a2;
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !props.label) {
      return "outside";
    }
    return (_a2 = originalProps.labelPlacement) != null ? _a2 : "inside";
  }, [originalProps.labelPlacement, props.label]);
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.dateInput)({
      ...variantProps,
      disableAnimation,
      labelPlacement,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), labelPlacement, disableAnimation, className]
  );
  const getLabelProps = (props2) => {
    return {
      ...(0, import_utils.mergeProps)(labelProps, labelPropsProp, props2),
      "data-slot": "label",
      className: slots.label({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.label, props2 == null ? void 0 : props2.className)
      })
    };
  };
  const getInputProps = (props2) => {
    return {
      ...props2,
      ...inputProps,
      ref: inputRef
    };
  };
  const getFieldProps = (props2 = {}) => {
    return {
      ref: domRef,
      "data-slot": "input",
      ...(0, import_utils.mergeProps)(fieldProps, fieldPropsProp, props2),
      className: slots.input({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.input, props2 == null ? void 0 : props2.className)
      })
    };
  };
  const getInputWrapperProps = (props2 = {}) => {
    return {
      ...props2,
      ...groupProps,
      "data-slot": "input-wrapper",
      className: slots.inputWrapper({
        class: classNames == null ? void 0 : classNames.inputWrapper
      }),
      onClick: fieldProps.onClick
    };
  };
  const getInnerWrapperProps = (props2) => {
    return {
      ...props2,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: classNames == null ? void 0 : classNames.innerWrapper
      })
    };
  };
  const getHelperWrapperProps = (props2) => {
    return {
      ...props2,
      "data-slot": "helper-wrapper",
      className: slots.helperWrapper({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.helperWrapper, props2 == null ? void 0 : props2.className)
      })
    };
  };
  const getErrorMessageProps = (props2 = {}) => {
    return {
      ...(0, import_utils.mergeProps)(errorMessageProps, errorMessagePropsProp, props2),
      "data-slot": "error-message",
      className: slots.errorMessage({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
    };
  };
  const getDescriptionProps = (props2 = {}) => {
    return {
      ...(0, import_utils.mergeProps)(descriptionProps, descriptionPropsProp, props2),
      "data-slot": "description",
      className: slots.description({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
    };
  };
  const getBaseGroupProps = () => {
    return {
      as,
      label,
      description,
      endContent,
      errorMessage,
      isInvalid,
      startContent,
      validationDetails,
      validationErrors,
      shouldLabelBeOutside,
      "data-slot": "base",
      "data-required": (0, import_shared_utils.dataAttr)(originalProps.isRequired),
      "data-disabled": (0, import_shared_utils.dataAttr)(originalProps.isDisabled),
      "data-readonly": (0, import_shared_utils.dataAttr)(originalProps.isReadOnly),
      "data-invalid": (0, import_shared_utils.dataAttr)(isInvalid),
      "data-has-start-content": (0, import_shared_utils.dataAttr)(!!startContent),
      "data-has-end-content": (0, import_shared_utils.dataAttr)(!!endContent),
      descriptionProps: getDescriptionProps(),
      errorMessageProps: getErrorMessageProps(),
      groupProps: getInputWrapperProps(),
      helperWrapperProps: getHelperWrapperProps(),
      labelProps: getLabelProps(),
      wrapperProps: getInnerWrapperProps(),
      className: slots.base({ class: baseStyles })
    };
  };
  return {
    state,
    domRef,
    slots,
    classNames,
    labelPlacement,
    getBaseGroupProps,
    getFieldProps,
    getInputProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTimeInput
});
