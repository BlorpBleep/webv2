"use client";
import {
  useCheckboxGroupContext
} from "./chunk-ACAJT7GC.mjs";

// src/use-checkbox.ts
import { useProviderContext } from "@nextui-org/system";
import { useCallback, useId, useState } from "react";
import { useMemo, useRef } from "react";
import { useToggleState } from "@react-stately/toggle";
import { checkbox } from "@nextui-org/theme";
import { useCallbackRef } from "@nextui-org/use-callback-ref";
import { useHover, usePress } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps, chain } from "@react-aria/utils";
import { __DEV__, warn, clsx, dataAttr, safeAriaLabel } from "@nextui-org/shared-utils";
import {
  useCheckbox as useReactAriaCheckbox,
  useCheckboxGroupItem as useReactAriaCheckboxGroupItem
} from "@react-aria/checkbox";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
import { mergeRefs } from "@nextui-org/react-utils";
function useCheckbox(props = {}) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const globalContext = useProviderContext();
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
  if (groupContext && __DEV__) {
    if (isSelectedProp) {
      warn(
        "The Checkbox.Group is being used, `isSelected` will be ignored. Use the `value` of the Checkbox.Group instead.",
        "Checkbox"
      );
    }
    if (defaultSelected) {
      warn(
        "The Checkbox.Group is being used, `defaultSelected` will be ignored. Use the `defaultValue` of the Checkbox.Group instead.",
        "Checkbox"
      );
    }
  }
  const Component = as || "label";
  const domRef = useRef(null);
  const inputRef = useRef(null);
  let onChange = props.onChange;
  if (isInGroup) {
    const dispatch = () => {
      groupContext.groupState.resetValidation();
    };
    onChange = chain(dispatch, onChange);
  }
  const labelId = useId();
  const ariaCheckboxProps = useMemo(() => {
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
      "aria-label": safeAriaLabel(otherProps["aria-label"], children),
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
  const toggleState = useToggleState(ariaCheckboxProps);
  const {
    inputProps,
    isSelected,
    isDisabled,
    isReadOnly,
    isPressed: isPressedKeyboard
  } = isInGroup ? useReactAriaCheckboxGroupItem({ ...ariaCheckboxProps }, groupContext.groupState, inputRef) : useReactAriaCheckbox({ ...ariaCheckboxProps }, toggleState, inputRef);
  const isInteractionDisabled = isDisabled || isReadOnly;
  const [isPressed, setPressed] = useState(false);
  const { pressProps } = usePress({
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
  const { hoverProps, isHovered } = useHover({
    isDisabled: inputProps.disabled
  });
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    autoFocus: inputProps.autoFocus
  });
  const slots = useMemo(
    () => checkbox({
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
  useSafeLayoutEffect(() => {
    if (!inputRef.current)
      return;
    const isInputRefChecked = !!inputRef.current.checked;
    toggleState.setSelected(isInputRefChecked);
  }, [inputRef.current]);
  const onChangeProp = useCallbackRef(onChange);
  const handleCheckboxChange = useCallback(
    (event) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();
        return;
      }
      onChangeProp == null ? void 0 : onChangeProp(event);
    },
    [isReadOnly, isDisabled, onChangeProp]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      "data-disabled": dataAttr(isDisabled),
      "data-selected": dataAttr(isSelected || isIndeterminate),
      "data-invalid": dataAttr(isInvalid),
      "data-hover": dataAttr(isHovered),
      "data-focus": dataAttr(isFocused),
      "data-pressed": dataAttr(pressed),
      "data-readonly": dataAttr(inputProps.readOnly),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-indeterminate": dataAttr(isIndeterminate),
      ...mergeProps(hoverProps, pressProps, otherProps)
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
  const getWrapperProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        "aria-hidden": true,
        className: clsx(slots.wrapper({ class: clsx(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) }))
      };
    },
    [slots, classNames == null ? void 0 : classNames.wrapper]
  );
  const getInputProps = useCallback(() => {
    return {
      ref: mergeRefs(inputRef, ref),
      ...mergeProps(inputProps, focusProps),
      onChange: chain(inputProps.onChange, handleCheckboxChange)
    };
  }, [inputProps, focusProps, handleCheckboxChange]);
  const getLabelProps = useCallback(
    () => ({
      id: labelId,
      className: slots.label({ class: classNames == null ? void 0 : classNames.label })
    }),
    [slots, classNames == null ? void 0 : classNames.label, isDisabled, isSelected, isInvalid]
  );
  const getIconProps = useCallback(
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

export {
  useCheckbox
};
