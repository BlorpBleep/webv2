"use client";
import {
  useRadioGroupContext
} from "./chunk-QGYJ6573.mjs";

// src/use-radio.ts
import { useCallback, useId, useState } from "react";
import { useMemo, useRef } from "react";
import { useFocusRing } from "@react-aria/focus";
import { useHover, usePress } from "@react-aria/interactions";
import { radio } from "@nextui-org/theme";
import { useRadio as useReactAriaRadio } from "@react-aria/radio";
import { useProviderContext } from "@nextui-org/system";
import { __DEV__, warn, clsx, dataAttr } from "@nextui-org/shared-utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { chain, mergeProps } from "@react-aria/utils";
function useRadio(props) {
  var _a, _b, _c, _d, _e;
  const globalContext = useProviderContext();
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
  if (groupContext && __DEV__) {
    if ("checked" in otherProps) {
      warn('Remove props "checked" if in the Radio.Group.', "Radio");
    }
    if (value === void 0) {
      warn('Props "value" must be defined if in the Radio.Group.', "Radio");
    }
  }
  const Component = as || "label";
  const domRef = useDOMRef(ref);
  const inputRef = useRef(null);
  const labelId = useId();
  const descriptionId = useId();
  const isRequired = useMemo(() => {
    var _a2;
    return (_a2 = groupContext.isRequired) != null ? _a2 : false;
  }, [groupContext.isRequired]);
  const isInvalid = groupContext.isInvalid;
  const ariaRadioProps = useMemo(() => {
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
  } = useReactAriaRadio(
    {
      value,
      children: typeof children === "function" ? true : children,
      ...ariaRadioProps
    },
    groupContext.groupState,
    inputRef
  );
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    autoFocus
  });
  const interactionDisabled = isDisabled || inputProps.readOnly;
  const [isPressed, setPressed] = useState(false);
  const { pressProps } = usePress({
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
  const { hoverProps, isHovered } = useHover({
    isDisabled: interactionDisabled
  });
  const pressed = interactionDisabled ? false : isPressed || isPressedKeyboard;
  const slots = useMemo(
    () => radio({
      color,
      size,
      isInvalid,
      isDisabled,
      disableAnimation
    }),
    [color, size, isDisabled, isInvalid, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        "data-disabled": dataAttr(isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-selected": dataAttr(isSelected),
        "data-invalid": dataAttr(isInvalid),
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(pressed),
        "data-hover-unselected": dataAttr(isHovered && !isSelected),
        "data-readonly": dataAttr(inputProps.readOnly),
        "aria-required": dataAttr(isRequired),
        ...mergeProps(hoverProps, pressProps, otherProps)
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
  const getWrapperProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        "aria-hidden": true,
        className: clsx(slots.wrapper({ class: clsx(classNames == null ? void 0 : classNames.wrapper, props2.className) }))
      };
    },
    [slots, classNames == null ? void 0 : classNames.wrapper]
  );
  const getInputProps = useCallback(
    (props2 = {}) => {
      return {
        ref: inputRef,
        ...mergeProps(props2, inputProps, focusProps),
        onChange: chain(inputProps.onChange, onChange)
      };
    },
    [inputProps, focusProps, onChange]
  );
  const getLabelProps = useCallback(
    (props2 = {}) => ({
      ...props2,
      id: labelId,
      className: slots.label({ class: classNames == null ? void 0 : classNames.label })
    }),
    [slots, classNames == null ? void 0 : classNames.label, isDisabled, isSelected, isInvalid]
  );
  const getLabelWrapperProps = useCallback(
    (props2 = {}) => ({
      ...props2,
      className: slots.labelWrapper({ class: classNames == null ? void 0 : classNames.labelWrapper })
    }),
    [slots, classNames == null ? void 0 : classNames.labelWrapper]
  );
  const getControlProps = useCallback(
    (props2 = {}) => ({
      ...props2,
      className: slots.control({ class: classNames == null ? void 0 : classNames.control })
    }),
    [slots, classNames == null ? void 0 : classNames.control]
  );
  const getDescriptionProps = useCallback(
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

export {
  useRadio
};
