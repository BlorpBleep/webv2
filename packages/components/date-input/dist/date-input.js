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

// src/date-input.tsx
var date_input_exports = {};
__export(date_input_exports, {
  default: () => date_input_default
});
module.exports = __toCommonJS(date_input_exports);
var import_system4 = require("@nextui-org/system");

// src/use-date-input.ts
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

// src/date-input-group.tsx
var import_react2 = require("react");
var import_system3 = require("@nextui-org/system");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_jsx_runtime = require("react/jsx-runtime");
var DateInputGroup = (0, import_system3.forwardRef)((props, ref) => {
  const {
    as,
    label,
    children,
    description,
    startContent,
    endContent,
    errorMessage: errorMessageProp,
    shouldLabelBeOutside,
    isInvalid,
    groupProps,
    labelProps,
    wrapperProps,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps,
    validationErrors,
    validationDetails,
    ...otherProps
  } = props;
  const Component = as || "div";
  const labelContent = label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...labelProps, children: label }) : null;
  const errorMessage = typeof errorMessageProp === "function" ? errorMessageProp({
    isInvalid,
    validationErrors,
    validationDetails
  }) : errorMessageProp || (validationErrors == null ? void 0 : validationErrors.join(" "));
  const hasHelper = !!description || !!errorMessage;
  const helperWrapper = (0, import_react2.useMemo)(() => {
    if (!hasHelper)
      return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...helperWrapperProps, children: isInvalid && errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...errorMessageProps, children: errorMessage }) : description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...descriptionProps, children: description }) : null });
  }, [
    hasHelper,
    errorMessage,
    description,
    helperWrapperProps,
    errorMessageProps,
    descriptionProps
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...otherProps, ref, "data-has-helper": (0, import_shared_utils2.dataAttr)(hasHelper), children: [
    shouldLabelBeOutside ? labelContent : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...groupProps, children: [
      !shouldLabelBeOutside ? labelContent : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...wrapperProps, children: [
        startContent,
        children,
        endContent
      ] }),
      shouldLabelBeOutside ? helperWrapper : null
    ] }),
    !shouldLabelBeOutside ? helperWrapper : null
  ] });
});
DateInputGroup.displayName = "NextUI.DateInputGroup";

// src/date-input-field.tsx
var import_react4 = require("react");

// src/date-input-segment.tsx
var import_datepicker3 = require("@react-aria/datepicker");
var import_utils2 = require("@react-aria/utils");
var import_react3 = require("react");
var import_shared_utils3 = require("@nextui-org/shared-utils");
var import_jsx_runtime2 = require("react/jsx-runtime");
var DateInputSegment = ({
  state,
  segment,
  slots,
  classNames,
  ...otherProps
}) => {
  const ref = (0, import_react3.useRef)(null);
  let { segmentProps } = (0, import_datepicker3.useDateSegment)(segment, state, ref);
  delete segmentProps.autoCapitalize;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      ...(0, import_utils2.mergeProps)(segmentProps, otherProps),
      ref,
      className: slots.segment({
        class: classNames == null ? void 0 : classNames.segment
      }),
      "data-editable": (0, import_shared_utils3.dataAttr)(segment.isEditable),
      "data-invalid": (0, import_shared_utils3.dataAttr)(state.isInvalid),
      "data-placeholder": (0, import_shared_utils3.dataAttr)(segment.isPlaceholder),
      "data-slot": "segment",
      "data-type": segment.type,
      style: {
        ...segmentProps.style
      },
      children: segment.text
    }
  );
};

// src/date-input-field.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var DateInputField = (0, import_react4.forwardRef)((props, ref) => {
  const { as, state, slots, inputProps, classNames, ...otherProps } = props;
  const Component = as || "div";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Component, { ...otherProps, ref, children: [
    state.segments.map((segment, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      DateInputSegment,
      {
        classNames,
        segment,
        slots,
        state
      },
      i
    )),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { ...inputProps })
  ] });
});
DateInputField.displayName = "NextUI.DateInputField";

// src/date-input.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function DateInput(props, ref) {
  const { state, slots, classNames, getBaseGroupProps, getInputProps, getFieldProps } = useDateInput({
    ...props,
    ref
  });
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DateInputGroup, { ...getBaseGroupProps(), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    DateInputField,
    {
      classNames,
      inputProps: getInputProps(),
      slots,
      state,
      ...getFieldProps()
    }
  ) });
}
DateInput.displayName = "NextUI.DateInput";
var date_input_default = (0, import_system4.forwardRef)(DateInput);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
