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

// src/use-date-input.ts
var use_date_input_exports = {};
__export(use_date_input_exports, {
  useDateInput: () => useDateInput
});
module.exports = __toCommonJS(use_date_input_exports);
var import_i18n = require("@react-aria/i18n");
var import_date = require("@internationalized/date");
var import_utils = require("@react-aria/utils");
var import_system = require("@nextui-org/system");
var import_system2 = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_datepicker = require("@react-aria/datepicker");
var import_datepicker2 = require("@react-stately/datepicker");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_theme = require("@nextui-org/theme");
var import_react = require("react");
function useDateInput(originalProps) {
  var _a, _b, _c, _d, _e, _f, _g;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system2.mapPropsVariants)(originalProps, import_theme.dateInput.variantKeys);
  const { locale } = (0, import_i18n.useLocale)();
  const calendarProp = (0, import_date.createCalendar)(new import_date.DateFormatter(locale).resolvedOptions().calendar);
  const gregorianYearOffset = (0, import_shared_utils.getGregorianYearOffset)(calendarProp.identifier);
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
    validationState,
    groupProps = {},
    labelProps: labelPropsProp,
    fieldProps: fieldPropsProp,
    innerWrapperProps: innerWrapperPropsProp,
    errorMessageProps: errorMessagePropsProp,
    descriptionProps: descriptionPropsProp,
    validationBehavior = (_a = globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _a : "aria",
    shouldForceLeadingZeros = true,
    minValue = (_c = (_b = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _b.minDate) != null ? _c : new import_date.CalendarDate(calendarProp, 1900 + gregorianYearOffset, 1, 1),
    maxValue = (_e = (_d = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _d.maxDate) != null ? _e : new import_date.CalendarDate(calendarProp, 2099 + gregorianYearOffset, 12, 31),
    createCalendar: createCalendarProp = (_f = globalContext == null ? void 0 : globalContext.createCalendar) != null ? _f : null,
    isInvalid: isInvalidProp = validationState ? validationState === "invalid" : false,
    errorMessage
  } = props;
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const inputRef = (0, import_react_utils.useDOMRef)(inputRefProp);
  const disableAnimation = (_g = originalProps.disableAnimation) != null ? _g : globalContext == null ? void 0 : globalContext.disableAnimation;
  const state = (0, import_datepicker2.useDateFieldState)({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
    shouldForceLeadingZeros,
    createCalendar: !createCalendarProp || typeof createCalendarProp !== "function" ? import_date.createCalendar : createCalendarProp
  });
  const {
    labelProps,
    fieldProps,
    inputProps,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps,
    isInvalid: ariaIsInvalid
  } = (0, import_datepicker.useDateField)({ ...originalProps, label, validationBehavior, inputRef }, state, domRef);
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const isInvalid = isInvalidProp || ariaIsInvalid;
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
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation, labelPlacement, className]
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
      "data-slot": "input-field",
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
    const innerWrapperProps = (0, import_utils.mergeProps)(innerWrapperPropsProp, props2);
    return {
      ...innerWrapperProps,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: (0, import_theme.cn)(classNames == null ? void 0 : classNames.innerWrapper, innerWrapperProps == null ? void 0 : innerWrapperProps.className)
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
  useDateInput
});
