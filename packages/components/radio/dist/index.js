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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Radio: () => radio_default,
  RadioGroup: () => radio_group_default,
  RadioGroupProvider: () => RadioGroupProvider,
  useRadio: () => useRadio,
  useRadioGroup: () => useRadioGroup,
  useRadioGroupContext: () => useRadioGroupContext
});
module.exports = __toCommonJS(src_exports);

// src/radio.tsx
var import_system2 = require("@nextui-org/system");
var import_visually_hidden = require("@react-aria/visually-hidden");

// src/use-radio.ts
var import_react = require("react");
var import_react2 = require("react");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
var import_theme = require("@nextui-org/theme");
var import_radio = require("@react-aria/radio");
var import_system = require("@nextui-org/system");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_utils = require("@react-aria/utils");

// src/radio-group-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [RadioGroupProvider, useRadioGroupContext] = (0, import_react_utils.createContext)({
  name: "RadioGroupContext",
  strict: false
});

// src/use-radio.ts
function useRadio(props) {
  var _a, _b, _c, _d, _e;
  const globalContext = (0, import_system.useProviderContext)();
  const groupContext = useRadioGroupContext();
  const {
    as,
    ref,
    classNames,
    id,
    value,
    children,
    description,
    size = (_a = groupContext == null ? void 0 : groupContext.size) != null ? _a : "md",
    color = (_b = groupContext == null ? void 0 : groupContext.color) != null ? _b : "primary",
    isDisabled: isDisabledProp = (_c = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _c : false,
    disableAnimation = (_e = (_d = groupContext == null ? void 0 : groupContext.disableAnimation) != null ? _d : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _e : false,
    onChange = groupContext == null ? void 0 : groupContext.onChange,
    autoFocus = false,
    className,
    ...otherProps
  } = props;
  if (groupContext && import_shared_utils.__DEV__) {
    if ("checked" in otherProps) {
      (0, import_shared_utils.warn)('Remove props "checked" if in the Radio.Group.', "Radio");
    }
    if (value === void 0) {
      (0, import_shared_utils.warn)('Props "value" must be defined if in the Radio.Group.', "Radio");
    }
  }
  const Component = as || "label";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const inputRef = (0, import_react2.useRef)(null);
  const labelId = (0, import_react.useId)();
  const descriptionId = (0, import_react.useId)();
  const isRequired = (0, import_react2.useMemo)(() => {
    var _a2;
    return (_a2 = groupContext.isRequired) != null ? _a2 : false;
  }, [groupContext.isRequired]);
  const isInvalid = groupContext.isInvalid;
  const ariaRadioProps = (0, import_react2.useMemo)(() => {
    const ariaDescribedBy = [otherProps["aria-describedby"], descriptionId].filter(Boolean).join(" ") || void 0;
    return {
      id,
      isRequired,
      isDisabled: isDisabledProp,
      "aria-label": otherProps["aria-label"],
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      "aria-describedby": ariaDescribedBy
    };
  }, [
    id,
    isDisabledProp,
    isRequired,
    description,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    otherProps["aria-describedby"],
    descriptionId
  ]);
  const {
    inputProps,
    isDisabled,
    isSelected,
    isPressed: isPressedKeyboard
  } = (0, import_radio.useRadio)(
    {
      value,
      children: typeof children === "function" ? true : children,
      ...ariaRadioProps
    },
    groupContext.groupState,
    inputRef
  );
  const { focusProps, isFocused, isFocusVisible } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const interactionDisabled = isDisabled || inputProps.readOnly;
  const [isPressed, setPressed] = (0, import_react.useState)(false);
  const { pressProps } = (0, import_interactions.usePress)({
    isDisabled: interactionDisabled,
    onPressStart(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(true);
      }
    },
    onPressEnd(e) {
      if (e.pointerType !== "keyboard") {
        setPressed(false);
      }
    }
  });
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: interactionDisabled
  });
  const pressed = interactionDisabled ? false : isPressed || isPressedKeyboard;
  const slots = (0, import_react2.useMemo)(
    () => (0, import_theme.radio)({
      color,
      size,
      isInvalid,
      isDisabled,
      disableAnimation
    }),
    [color, size, isDisabled, isInvalid, disableAnimation]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
        "data-selected": (0, import_shared_utils.dataAttr)(isSelected),
        "data-invalid": (0, import_shared_utils.dataAttr)(isInvalid),
        "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
        "data-pressed": (0, import_shared_utils.dataAttr)(pressed),
        "data-hover-unselected": (0, import_shared_utils.dataAttr)(isHovered && !isSelected),
        "data-readonly": (0, import_shared_utils.dataAttr)(inputProps.readOnly),
        "aria-required": (0, import_shared_utils.dataAttr)(isRequired),
        ...(0, import_utils.mergeProps)(hoverProps, pressProps, otherProps)
      };
    },
    [
      slots,
      baseStyles,
      domRef,
      isDisabled,
      isFocused,
      isFocusVisible,
      isSelected,
      isInvalid,
      isHovered,
      pressed,
      inputProps.readOnly,
      isRequired,
      otherProps
    ]
  );
  const getWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "aria-hidden": true,
        className: (0, import_shared_utils.clsx)(slots.wrapper({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.wrapper, props2.className) }))
      };
    },
    [slots, classNames == null ? void 0 : classNames.wrapper]
  );
  const getInputProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: inputRef,
        ...(0, import_utils.mergeProps)(props2, inputProps, focusProps),
        onChange: (0, import_utils.chain)(inputProps.onChange, onChange)
      };
    },
    [inputProps, focusProps, onChange]
  );
  const getLabelProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ...props2,
      id: labelId,
      className: slots.label({ class: classNames == null ? void 0 : classNames.label })
    }),
    [slots, classNames == null ? void 0 : classNames.label, isDisabled, isSelected, isInvalid]
  );
  const getLabelWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ...props2,
      className: slots.labelWrapper({ class: classNames == null ? void 0 : classNames.labelWrapper })
    }),
    [slots, classNames == null ? void 0 : classNames.labelWrapper]
  );
  const getControlProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ...props2,
      className: slots.control({ class: classNames == null ? void 0 : classNames.control })
    }),
    [slots, classNames == null ? void 0 : classNames.control]
  );
  const getDescriptionProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ...props2,
      id: descriptionId,
      className: slots.description({ class: classNames == null ? void 0 : classNames.description })
    }),
    [slots, classNames == null ? void 0 : classNames.description]
  );
  return {
    Component,
    children,
    isSelected,
    isDisabled,
    isInvalid,
    isFocusVisible,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
    getDescriptionProps
  };
}

// src/radio.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Radio = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
    getDescriptionProps
  } = useRadio({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...getBaseProps(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_visually_hidden.VisuallyHidden, { elementType: "span", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ...getInputProps() }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getWrapperProps(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getControlProps() }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...getLabelWrapperProps(), children: [
      children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getLabelProps(), children }),
      description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getDescriptionProps(), children: description })
    ] })
  ] });
});
Radio.displayName = "NextUI.Radio";
var radio_default = Radio;

// src/radio-group.tsx
var import_system4 = require("@nextui-org/system");

// src/use-radio-group.ts
var import_theme2 = require("@nextui-org/theme");
var import_react3 = require("react");
var import_radio2 = require("@react-stately/radio");
var import_radio3 = require("@react-aria/radio");
var import_system3 = require("@nextui-org/system");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_utils2 = require("@react-aria/utils");
function useRadioGroup(props) {
  var _a, _b;
  const globalContext = (0, import_system3.useProviderContext)();
  const {
    as,
    ref,
    classNames,
    children,
    label,
    value,
    name,
    isInvalid: isInvalidProp,
    validationState,
    validationBehavior = (_a = globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _a : "aria",
    size = "md",
    color = "primary",
    isDisabled = false,
    disableAnimation = (_b = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false,
    orientation = "vertical",
    isRequired = false,
    isReadOnly,
    errorMessage,
    description,
    className,
    onChange,
    onValueChange,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils3.useDOMRef)(ref);
  const otherPropsWithOrientation = (0, import_react3.useMemo)(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": (0, import_shared_utils2.safeAriaLabel)(otherProps["aria-label"], label),
      isRequired,
      isReadOnly,
      isInvalid: validationState === "invalid" || isInvalidProp,
      orientation,
      validationBehavior,
      onChange: onValueChange
    };
  }, [
    otherProps,
    value,
    name,
    label,
    isRequired,
    isReadOnly,
    isInvalidProp,
    validationState,
    validationBehavior,
    orientation,
    onValueChange
  ]);
  const groupState = (0, import_radio2.useRadioGroupState)(otherPropsWithOrientation);
  const {
    labelProps,
    radioGroupProps: groupProps,
    errorMessageProps,
    descriptionProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails
  } = (0, import_radio3.useRadioGroup)(otherPropsWithOrientation, groupState);
  const isInvalid = otherPropsWithOrientation.isInvalid || isAriaInvalid || groupState.isInvalid;
  const context = (0, import_react3.useMemo)(
    () => ({
      size,
      color,
      groupState,
      isRequired,
      isInvalid,
      isDisabled,
      disableAnimation,
      onChange
    }),
    [
      size,
      color,
      isRequired,
      isDisabled,
      isInvalid,
      onChange,
      disableAnimation,
      groupState.name,
      groupState.isDisabled,
      groupState.isReadOnly,
      groupState.isRequired,
      groupState.selectedValue,
      groupState.lastFocusedValue
    ]
  );
  const slots = (0, import_react3.useMemo)(
    () => (0, import_theme2.radioGroup)({ isRequired, isInvalid, disableAnimation }),
    [isInvalid, isRequired, disableAnimation]
  );
  const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = (0, import_react3.useCallback)(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...(0, import_utils2.mergeProps)(
        groupProps,
        (0, import_react_utils3.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        })
      )
    };
  }, [domRef, slots, baseStyles, groupProps, otherProps]);
  const getLabelProps = (0, import_react3.useCallback)(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, classNames == null ? void 0 : classNames.label, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = (0, import_react3.useCallback)(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, classNames == null ? void 0 : classNames.wrapper, orientation, slots.wrapper]);
  const getDescriptionProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description, descriptionProps, slots.description]
  );
  const getErrorMessageProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.errorMessage, errorMessageProps]
  );
  return {
    Component,
    children,
    label,
    context,
    description,
    isInvalid,
    errorMessage: typeof errorMessage === "function" ? errorMessage({ isInvalid, validationErrors, validationDetails }) : errorMessage || (validationErrors == null ? void 0 : validationErrors.join(" ")),
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  };
}

// src/radio-group.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var RadioGroup = (0, import_system4.forwardRef)((props, ref) => {
  const {
    Component,
    children,
    label,
    context,
    description,
    isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  } = useRadioGroup({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Component, { ...getGroupProps(), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getLabelProps(), children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ...getWrapperProps(), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RadioGroupProvider, { value: context, children }) }),
    isInvalid && errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ...getErrorMessageProps(), children: errorMessage }) : description ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ...getDescriptionProps(), children: description }) : null
  ] });
});
RadioGroup.displayName = "NextUI.RadioGroup";
var radio_group_default = RadioGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Radio,
  RadioGroup,
  RadioGroupProvider,
  useRadio,
  useRadioGroup,
  useRadioGroupContext
});
