"use client";

// src/use-radio-group.ts
import { radioGroup } from "@nextui-org/theme";
import { useCallback, useMemo } from "react";
import { useRadioGroupState } from "@react-stately/radio";
import { useRadioGroup as useReactAriaRadioGroup } from "@react-aria/radio";
import { useProviderContext } from "@nextui-org/system";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { clsx, safeAriaLabel } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
function useRadioGroup(props) {
  var _a, _b;
  const globalContext = useProviderContext();
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
  const domRef = useDOMRef(ref);
  const otherPropsWithOrientation = useMemo(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": safeAriaLabel(otherProps["aria-label"], label),
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
  const groupState = useRadioGroupState(otherPropsWithOrientation);
  const {
    labelProps,
    radioGroupProps: groupProps,
    errorMessageProps,
    descriptionProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails
  } = useReactAriaRadioGroup(otherPropsWithOrientation, groupState);
  const isInvalid = otherPropsWithOrientation.isInvalid || isAriaInvalid || groupState.isInvalid;
  const context = useMemo(
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
  const slots = useMemo(
    () => radioGroup({ isRequired, isInvalid, disableAnimation }),
    [isInvalid, isRequired, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const getGroupProps = useCallback(() => {
    return {
      ref: domRef,
      className: slots.base({ class: baseStyles }),
      ...mergeProps(
        groupProps,
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        })
      )
    };
  }, [domRef, slots, baseStyles, groupProps, otherProps]);
  const getLabelProps = useCallback(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, classNames == null ? void 0 : classNames.label, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = useCallback(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, classNames == null ? void 0 : classNames.wrapper, orientation, slots.wrapper]);
  const getDescriptionProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: clsx(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description, descriptionProps, slots.description]
  );
  const getErrorMessageProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: clsx(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
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

export {
  useRadioGroup
};
