"use client";

// src/use-time-input.ts
import { useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";
import { useProviderContext } from "@nextui-org/system";
import { mapPropsVariants } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { useTimeField as useAriaTimeField } from "@react-aria/datepicker";
import { useTimeFieldState } from "@react-stately/datepicker";
import { objectToDeps, clsx, dataAttr } from "@nextui-org/shared-utils";
import { dateInput } from "@nextui-org/theme";
import { useMemo } from "react";
function useTimeInput(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);
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
  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);
  const { locale } = useLocale();
  const disableAnimation = (_b = originalProps.disableAnimation) != null ? _b : globalContext == null ? void 0 : globalContext.disableAnimation;
  const state = useTimeFieldState({
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
  } = useAriaTimeField({ ...originalProps, label, validationBehavior, inputRef }, state, domRef);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const labelPlacement = useMemo(() => {
    var _a2;
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !props.label) {
      return "outside";
    }
    return (_a2 = originalProps.labelPlacement) != null ? _a2 : "inside";
  }, [originalProps.labelPlacement, props.label]);
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const slots = useMemo(
    () => dateInput({
      ...variantProps,
      disableAnimation,
      labelPlacement,
      className
    }),
    [objectToDeps(variantProps), labelPlacement, disableAnimation, className]
  );
  const getLabelProps = (props2) => {
    return {
      ...mergeProps(labelProps, labelPropsProp, props2),
      "data-slot": "label",
      className: slots.label({
        class: clsx(classNames == null ? void 0 : classNames.label, props2 == null ? void 0 : props2.className)
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
      ...mergeProps(fieldProps, fieldPropsProp, props2),
      className: slots.input({
        class: clsx(classNames == null ? void 0 : classNames.input, props2 == null ? void 0 : props2.className)
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
        class: clsx(classNames == null ? void 0 : classNames.helperWrapper, props2 == null ? void 0 : props2.className)
      })
    };
  };
  const getErrorMessageProps = (props2 = {}) => {
    return {
      ...mergeProps(errorMessageProps, errorMessagePropsProp, props2),
      "data-slot": "error-message",
      className: slots.errorMessage({ class: clsx(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
    };
  };
  const getDescriptionProps = (props2 = {}) => {
    return {
      ...mergeProps(descriptionProps, descriptionPropsProp, props2),
      "data-slot": "description",
      className: slots.description({ class: clsx(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
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
      "data-required": dataAttr(originalProps.isRequired),
      "data-disabled": dataAttr(originalProps.isDisabled),
      "data-readonly": dataAttr(originalProps.isReadOnly),
      "data-invalid": dataAttr(isInvalid),
      "data-has-start-content": dataAttr(!!startContent),
      "data-has-end-content": dataAttr(!!endContent),
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

export {
  useTimeInput
};
