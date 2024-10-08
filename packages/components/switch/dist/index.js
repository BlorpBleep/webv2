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
  Switch: () => switch_default,
  useSwitch: () => useSwitch
});
module.exports = __toCommonJS(src_exports);

// src/switch.tsx
var import_visually_hidden = require("@react-aria/visually-hidden");
var import_react3 = require("react");
var import_system2 = require("@nextui-org/system");

// src/use-switch.ts
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_use_safe_layout_effect = require("@nextui-org/use-safe-layout-effect");
var import_interactions = require("@react-aria/interactions");
var import_theme = require("@nextui-org/theme");
var import_utils = require("@react-aria/utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_switch = require("@react-aria/switch");
var import_react2 = require("react");
var import_toggle = require("@react-stately/toggle");
var import_focus = require("@react-aria/focus");
function useSwitch(originalProps = {}) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.toggle.variantKeys);
  const {
    ref,
    as,
    name,
    value = "",
    isReadOnly: isReadOnlyProp = false,
    autoFocus = false,
    startContent,
    endContent,
    defaultSelected,
    isSelected: isSelectedProp,
    children,
    thumbIcon,
    className,
    classNames,
    onChange,
    onValueChange,
    ...otherProps
  } = props;
  const Component = as || "label";
  const domRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const labelId = (0, import_react.useId)();
  const ariaSwitchProps = (0, import_react2.useMemo)(() => {
    const ariaLabel = otherProps["aria-label"] || typeof children === "string" ? children : void 0;
    return {
      name,
      value,
      children,
      autoFocus,
      defaultSelected,
      isSelected: isSelectedProp,
      isDisabled: !!originalProps.isDisabled,
      isReadOnly: isReadOnlyProp,
      "aria-label": ariaLabel,
      "aria-labelledby": otherProps["aria-labelledby"] || labelId,
      onChange: onValueChange
    };
  }, [
    value,
    name,
    labelId,
    children,
    autoFocus,
    isReadOnlyProp,
    isSelectedProp,
    defaultSelected,
    originalProps.isDisabled,
    otherProps["aria-label"],
    otherProps["aria-labelledby"],
    onValueChange
  ]);
  const state = (0, import_toggle.useToggleState)(ariaSwitchProps);
  (0, import_use_safe_layout_effect.useSafeLayoutEffect)(() => {
    if (!inputRef.current)
      return;
    const isInputRefChecked = !!inputRef.current.checked;
    state.setSelected(isInputRefChecked);
  }, [inputRef.current]);
  const {
    inputProps,
    isPressed: isPressedKeyboard,
    isReadOnly
  } = (0, import_switch.useSwitch)(ariaSwitchProps, state, inputRef);
  const { focusProps, isFocused, isFocusVisible } = (0, import_focus.useFocusRing)({ autoFocus: inputProps.autoFocus });
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: inputProps.disabled
  });
  const isInteractionDisabled = ariaSwitchProps.isDisabled || isReadOnly;
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
  const isSelected = inputProps.checked;
  const isDisabled = inputProps.disabled;
  const slots = (0, import_react2.useMemo)(
    () => (0, import_theme.toggle)({
      ...variantProps,
      disableAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (props2) => {
    return {
      ...(0, import_utils.mergeProps)(hoverProps, pressProps, otherProps, props2),
      ref: domRef,
      className: slots.base({ class: (0, import_shared_utils.clsx)(baseStyles, props2 == null ? void 0 : props2.className) }),
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-selected": (0, import_shared_utils.dataAttr)(isSelected),
      "data-readonly": (0, import_shared_utils.dataAttr)(isReadOnly),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(pressed)
    };
  };
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
  const getInputProps = (props2 = {}) => {
    return {
      ...(0, import_utils.mergeProps)(inputProps, focusProps, props2),
      ref: (0, import_react_utils.mergeRefs)(inputRef, ref),
      id: inputProps.id,
      onChange: (0, import_utils.chain)(onChange, inputProps.onChange)
    };
  };
  const getThumbProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ...props2,
      className: slots.thumb({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.thumb, props2 == null ? void 0 : props2.className) })
    }),
    [slots, classNames == null ? void 0 : classNames.thumb]
  );
  const getLabelProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      ...props2,
      id: labelId,
      className: slots.label({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.label, props2 == null ? void 0 : props2.className) })
    }),
    [slots, classNames == null ? void 0 : classNames.label, isDisabled, isSelected]
  );
  const getThumbIconProps = (0, import_react.useCallback)(
    (props2 = {
      includeStateProps: false
    }) => (0, import_utils.mergeProps)(
      {
        width: "1em",
        height: "1em",
        className: slots.thumbIcon({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.thumbIcon) })
      },
      props2.includeStateProps ? {
        isSelected
      } : {}
    ),
    [slots, classNames == null ? void 0 : classNames.thumbIcon, isSelected]
  );
  const getStartContentProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      width: "1em",
      height: "1em",
      ...props2,
      className: slots.startContent({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.startContent, props2 == null ? void 0 : props2.className) })
    }),
    [slots, classNames == null ? void 0 : classNames.startContent, isSelected]
  );
  const getEndContentProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      width: "1em",
      height: "1em",
      ...props2,
      className: slots.endContent({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.endContent, props2 == null ? void 0 : props2.className) })
    }),
    [slots, classNames == null ? void 0 : classNames.endContent, isSelected]
  );
  return {
    Component,
    slots,
    classNames,
    domRef,
    children,
    thumbIcon,
    startContent,
    endContent,
    isHovered,
    isSelected,
    isPressed: pressed,
    isFocused,
    isFocusVisible,
    isDisabled,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getThumbProps,
    getThumbIconProps,
    getStartContentProps,
    getEndContentProps
  };
}

// src/switch.tsx
var Switch = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    children,
    startContent,
    endContent,
    thumbIcon,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    getThumbProps,
    getThumbIconProps,
    getLabelProps,
    getStartContentProps,
    getEndContentProps
  } = useSwitch({ ...props, ref });
  const clonedThumbIcon = typeof thumbIcon === "function" ? thumbIcon(getThumbIconProps({ includeStateProps: true })) : thumbIcon && (0, import_react3.cloneElement)(thumbIcon, getThumbIconProps());
  const clonedStartContent = startContent && (0, import_react3.cloneElement)(startContent, getStartContentProps());
  const clonedEndContent = endContent && (0, import_react3.cloneElement)(endContent, getEndContentProps());
  return <Component {...getBaseProps()}>
    <import_visually_hidden.VisuallyHidden elementType="span"><input {...getInputProps()} /></import_visually_hidden.VisuallyHidden>
    <span {...getWrapperProps()}>
      {startContent && clonedStartContent}
      <span {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</span>
      {endContent && clonedEndContent}
    </span>
    {children && <span {...getLabelProps()}>{children}</span>}
  </Component>;
});
Switch.displayName = "NextUI.Switch";
var switch_default = Switch;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Switch,
  useSwitch
});
