"use client";

// src/use-checkbox-group.ts
import { useProviderContext } from "@nextui-org/system";
import { useCallback, useMemo } from "react";
import { chain, mergeProps } from "@react-aria/utils";
import { checkboxGroup } from "@nextui-org/theme";
import { useCheckboxGroup as useReactAriaCheckboxGroup } from "@react-aria/checkbox";
import { useCheckboxGroupState } from "@react-stately/checkbox";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { clsx, safeAriaLabel } from "@nextui-org/shared-utils";
function useCheckboxGroup(props) {
  var _a, _b;
  const globalContext = useProviderContext();
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
  const domRef = useDOMRef(ref);
  const checkboxGroupProps = useMemo(() => {
    return {
      ...otherProps,
      value,
      name,
      "aria-label": safeAriaLabel(otherProps["aria-label"], label),
      defaultValue,
      isRequired,
      isReadOnly,
      orientation,
      validationBehavior,
      isInvalid: validationState === "invalid" || isInvalidProp,
      onChange: chain(props.onChange, onValueChange)
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
  const groupState = useCheckboxGroupState(checkboxGroupProps);
  const {
    labelProps,
    groupProps,
    descriptionProps,
    errorMessageProps,
    validationErrors,
    validationDetails
  } = useReactAriaCheckboxGroup(checkboxGroupProps, groupState);
  const context = useMemo(
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
  const slots = useMemo(
    () => checkboxGroup({ isRequired, isInvalid: groupState.isInvalid, disableAnimation }),
    [isRequired, groupState.isInvalid, , disableAnimation]
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
  }, [slots, domRef, baseStyles, groupProps, otherProps]);
  const getLabelProps = useCallback(() => {
    return {
      className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
      ...labelProps
    };
  }, [slots, labelProps, classNames == null ? void 0 : classNames.label]);
  const getWrapperProps = useCallback(() => {
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      role: "presentation",
      "data-orientation": orientation
    };
  }, [slots, orientation, classNames == null ? void 0 : classNames.wrapper]);
  const getDescriptionProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        className: slots.description({ class: clsx(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, descriptionProps, classNames == null ? void 0 : classNames.description]
  );
  const getErrorMessageProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        className: slots.errorMessage({ class: clsx(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
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

export {
  useCheckboxGroup
};
