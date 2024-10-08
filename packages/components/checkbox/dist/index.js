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
  Checkbox: () => checkbox_default,
  CheckboxGroup: () => checkbox_group_default,
  CheckboxGroupProvider: () => CheckboxGroupProvider,
  CheckboxIcon: () => CheckboxIcon,
  useCheckbox: () => useCheckbox,
  useCheckboxGroup: () => useCheckboxGroup,
  useCheckboxGroupContext: () => useCheckboxGroupContext
});
module.exports = __toCommonJS(src_exports);

// src/checkbox.tsx
var import_system2 = require("@nextui-org/system");
var import_visually_hidden = require("@react-aria/visually-hidden");
var import_react3 = require("react");

// src/use-checkbox.ts
var import_system = require("@nextui-org/system");
var import_react = require("react");
var import_react2 = require("react");
var import_toggle = require("@react-stately/toggle");
var import_theme = require("@nextui-org/theme");
var import_use_callback_ref = require("@nextui-org/use-callback-ref");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
var import_utils = require("@react-aria/utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_checkbox = require("@react-aria/checkbox");
var import_use_safe_layout_effect = require("@nextui-org/use-safe-layout-effect");
var import_react_utils2 = require("@nextui-org/react-utils");

// src/checkbox-group-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [CheckboxGroupProvider, useCheckboxGroupContext] = (0, import_react_utils.createContext)({
  name: "CheckboxGroupContext",
  strict: false
});

// src/use-checkbox.ts
function useCheckbox(props = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const globalContext = (0, import_system.useProviderContext)();
  const groupContext = useCheckboxGroupContext();
  const isInGroup = !!groupContext;
  const {
    as,
    ref,
    value = "",
    children,
    icon,
    name,
    isRequired,
    isReadOnly: isReadOnlyProp = false,
    autoFocus = false,
    isSelected: isSelectedProp,
    size = (_a = groupContext == null ? void 0 : groupContext.size) != null ? _a : "md",
    color = (_b = groupContext == null ? void 0 : groupContext.color) != null ? _b : "primary",
    radius = groupContext == null ? void 0 : groupContext.radius,
    lineThrough = (_c = groupContext == null ? void 0 : groupContext.lineThrough) != null ? _c : false,
    isDisabled: isDisabledProp = (_d = groupContext == null ? void 0 : groupContext.isDisabled) != null ? _d : false,
    disableAnimation = (_f = (_e = groupContext == null ? void 0 : groupContext.disableAnimation) != null ? _e : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _f : false,
    validationState,
    isInvalid = validationState ? validationState === "invalid" : (_g = groupContext == null ? void 0 : groupContext.isInvalid) != null ? _g : false,
    isIndeterminate = false,
    validationBehavior = (_h = groupContext == null ? void 0 : groupContext.validationBehavior) != null ? _h : "aria",
    defaultSelected,
    classNames,
    className,
    onValueChange,
    ...otherProps
  } = props;
  if (groupContext && import_shared_utils.__DEV__) {
    if (isSelectedProp) {
      (0, import_shared_utils.warn)(
        "The Checkbox.Group is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.",
        "Checkbox"
      );
    }
    if (defaultSelected) {
      (0, import_shared_utils.warn)(
        "The Checkbox.Group is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.",
        "Checkbox"
      );
    }
  }
  const Component = as || "label";
  const domRef = (0, import_react2.useRef)(null);
  const inputRef = (0, import_react2.useRef)(null);
  let onChange = props.onChange;
  if (isInGroup) {
    const dispatch = () => {
      groupContext.groupState.resetValidation();
    };
    onChange = (0, import_utils.chain)(dispatch, onChange);
  }
  const labelId = (0, import_react.useId)();
  const ariaCheckboxProps = (0, import_react2.useMemo)(() => {
    return {
      name,
      value,
      children,
      autoFocus,
      defaultSelected,
      validationBehavior,
      isIndeterminate,
      isRequired,
      isInvalid,
      isSelected: isSelectedProp,
      isDisabled: isDisabledProp,
      isReadOnly: isReadOnlyProp,
      "aria-label": (0, import_shared_utils.safeAriaLabel)(otherProps["aria-label"], children),
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      onChange: onValueChange
    };
  }, [
    value,
    name,
    labelId,
    children,
    autoFocus,
    isInvalid,
    isIndeterminate,
    isDisabledProp,
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    validationBehavior,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange
  ]);
  const toggleState = (0, import_toggle.useToggleState)(ariaCheckboxProps);
  const {
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed: isPressedKeyboard
  } = isInGroup ? (0, import_checkbox.useCheckboxGroupItem)({ ...ariaCheckboxProps }, groupContext.groupState, inputRef) : (0, import_checkbox.useCheckbox)({ ...ariaCheckboxProps }, toggleState, inputRef);
  const isInteractionDisabled = isDisabled || isReadOnly;
  const [isPressed, setPressed] = (0, import_react.useState)(false);
  const { pressProps } = (0, import_interactions.usePress)({
    isDisabled: isInteractionDisabled,
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
  const pressed = isInteractionDisabled ? false : isPressed || isPressedKeyboard;
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: inputProps.disabled
  });
  const { focusProps, isFocused, isFocusVisible } = (0, import_focus.useFocusRing)({
    autoFocus: inputProps.autoFocus
  });
  const slots = (0, import_react2.useMemo)(
    () => (0, import_theme.checkbox)({
      color,
      size,
      radius,
      isInvalid,
      lineThrough,
      isDisabled,
      disableAnimation
    }),
    [color, size, radius, isInvalid, lineThrough, isDisabled, disableAnimation]
  );
  (0, import_use_safe_layout_effect.useSafeLayoutEffect)(() => {
    if (!inputRef.current)
      return;
    const isInputRefChecked = !!inputRef.current.checked;
    toggleState.setSelected(isInputRefChecked);
  }, [inputRef.current]);
  const onChangeProp = (0, import_use_callback_ref.useCallbackRef)(onChange);
  const handleCheckboxChange = (0, import_react.useCallback)(
    (event) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();
        return;
      }
      onChangeProp == null ? void 0 : onChangeProp(event);
    },
    [isReadOnly, isDisabled, onChangeProp]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (0, import_react.useCallback)(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-selected": (0, import_shared_utils.dataAttr)(isSelected || isIndeterminate),
      "data-invalid": (0, import_shared_utils.dataAttr)(isInvalid),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-pressed": (0, import_shared_utils.dataAttr)(pressed),
      "data-readonly": (0, import_shared_utils.dataAttr)(inputProps.readOnly),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-indeterminate": (0, import_shared_utils.dataAttr)(isIndeterminate),
      ...(0, import_utils.mergeProps)(hoverProps, pressProps, otherProps)
    };
  }, [
    slots,
    baseStyles,
    isDisabled,
    isSelected,
    isIndeterminate,
    isInvalid,
    isHovered,
    isFocused,
    pressed,
    inputProps.readOnly,
    isFocusVisible,
    hoverProps,
    pressProps,
    otherProps
  ]);
  const getWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "aria-hidden": true,
        className: (0, import_shared_utils.clsx)(slots.wrapper({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) }))
      };
    },
    [slots, classNames == null ? void 0 : classNames.wrapper]
  );
  const getInputProps = (0, import_react.useCallback)(() => {
    return {
      ref: (0, import_react_utils2.mergeRefs)(inputRef, ref),
      ...(0, import_utils.mergeProps)(inputProps, focusProps),
      onChange: (0, import_utils.chain)(inputProps.onChange, handleCheckboxChange)
    };
  }, [inputProps, focusProps, handleCheckboxChange]);
  const getLabelProps = (0, import_react.useCallback)(
    () => ({
      id: labelId,
      className: slots.label({ class: classNames == null ? void 0 : classNames.label })
    }),
    [slots, classNames == null ? void 0 : classNames.label, isDisabled, isSelected, isInvalid]
  );
  const getIconProps = (0, import_react.useCallback)(
    () => ({
      isSelected,
      isIndeterminate,
      disableAnimation,
      className: slots.icon({ class: classNames == null ? void 0 : classNames.icon })
    }),
    [slots, classNames == null ? void 0 : classNames.icon, isSelected, isIndeterminate, disableAnimation]
  );
  return {
    Component,
    icon,
    children,
    isSelected,
    isDisabled,
    isInvalid,
    isFocused,
    isHovered,
    isFocusVisible,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getIconProps
  };
}

// src/checkbox-icon.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function CheckIcon(props) {
  const { isSelected, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { "aria-hidden": "true", role: "presentation", viewBox: "0 0 17 18", ...otherProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "polyline",
    {
      fill: "none",
      points: "1 9 7 14 15 4",
      stroke: "currentColor",
      strokeDasharray: 22,
      strokeDashoffset: isSelected ? 44 : 66,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      style: !disableAnimation && isSelected ? {
        transition: "stroke-dashoffset 250ms linear 0.2s"
      } : {}
    }
  ) });
}
function IndeterminateIcon(props) {
  const { isSelected, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { stroke: "currentColor", strokeWidth: 3, viewBox: "0 0 24 24", ...otherProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: "21", x2: "3", y1: "12", y2: "12" }) });
}
function CheckboxIcon(props) {
  const { isIndeterminate, ...otherProps } = props;
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseIcon, { ...otherProps });
}

// src/checkbox.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Checkbox = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    children,
    icon = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CheckboxIcon, {}),
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getIconProps,
    getLabelProps
  } = useCheckbox({ ...props, ref });
  const clonedIcon = typeof icon === "function" ? icon(getIconProps()) : (0, import_react3.cloneElement)(icon, getIconProps());
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Component, { ...getBaseProps(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_visually_hidden.VisuallyHidden, { elementType: "span", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { ...getInputProps() }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getWrapperProps(), children: clonedIcon }),
    children && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getLabelProps(), children })
  ] });
});
Checkbox.displayName = "NextUI.Checkbox";
var checkbox_default = Checkbox;

// src/checkbox-group.tsx
var import_system4 = require("@nextui-org/system");
var import_react5 = require("react");

// src/use-checkbox-group.ts
var import_system3 = require("@nextui-org/system");
var import_react4 = require("react");
var import_utils2 = require("@react-aria/utils");
var import_theme2 = require("@nextui-org/theme");
var import_checkbox2 = require("@react-aria/checkbox");
var import_checkbox3 = require("@react-stately/checkbox");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_shared_utils2 = require("@nextui-org/shared-utils");
function useCheckboxGroup(props) {
  var _a, _b;
  const globalContext = (0, import_system3.useProviderContext)();
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
  const domRef = (0, import_react_utils3.useDOMRef)(ref);
  const checkboxGroupProps = (0, import_react4.useMemo)(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": (0, import_shared_utils2.safeAriaLabel)(otherProps["aria-label"], label),
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      validationBehavior,
      isInvalid: validationState === "invalid" || isInvalidProp,
      onChange: (0, import_utils2.chain)(props.onChange, onValueChange)
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
  const groupState = (0, import_checkbox3.useCheckboxGroupState)(checkboxGroupProps);
  const {
    labelProps,
    groupProps,
    descriptionProps,
    errorMessageProps,
    validationErrors,
    validationDetails
  } = (0, import_checkbox2.useCheckboxGroup)(checkboxGroupProps, groupState);
  const context = (0, import_react4.useMemo)(
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
  const slots = (0, import_react4.useMemo)(
    () => (0, import_theme2.checkboxGroup)({ isRequired, isInvalid: groupState.isInvalid, disableAnimation }),
    [isRequired, groupState.isInvalid, , disableAnimation]
  );
  const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = (0, import_react4.useCallback)(() => {
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
  }, [slots, domRef, baseStyles, groupProps, otherProps]);
  const getLabelProps = (0, import_react4.useCallback)(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = (0, import_react4.useCallback)(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, orientation, classNames == null ? void 0 : classNames.wrapper]);
  const getDescriptionProps = (0, import_react4.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, descriptionProps, classNames == null ? void 0 : classNames.description]
  );
  const getErrorMessageProps = (0, import_react4.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
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

// src/checkbox-group.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var CheckboxGroup = (0, import_system4.forwardRef)((props, ref) => {
  const {
    children,
    context,
    label,
    description,
    isInvalid,
    errorMessage,
    getGroupProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getErrorMessageProps
  } = useCheckboxGroup({ ...props, ref });
  const errorMessageContent = (0, import_react5.useMemo)(() => errorMessage, [isInvalid]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...getGroupProps(), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { ...getLabelProps(), children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ...getWrapperProps(), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CheckboxGroupProvider, { value: context, children }) }),
    isInvalid && errorMessageContent ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ...getErrorMessageProps(), children: errorMessageContent }) : description ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ...getDescriptionProps(), children: description }) : null
  ] });
});
CheckboxGroup.displayName = "NextUI.CheckboxGroup";
var checkbox_group_default = CheckboxGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProvider,
  CheckboxIcon,
  useCheckbox,
  useCheckboxGroup,
  useCheckboxGroupContext
});
