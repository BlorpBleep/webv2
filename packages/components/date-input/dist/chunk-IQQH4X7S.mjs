"use client";

// src/use-date-input.ts
import { useLocale } from "@react-aria/i18n";
import { createCalendar, CalendarDate, DateFormatter } from "@internationalized/date";
import { mergeProps } from "@react-aria/utils";
import { useProviderContext } from "@nextui-org/system";
import { mapPropsVariants } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { useDateField as useAriaDateField } from "@react-aria/datepicker";
import { useDateFieldState } from "@react-stately/datepicker";
import { objectToDeps, clsx, dataAttr, getGregorianYearOffset } from "@nextui-org/shared-utils";
import { dateInput, cn } from "@nextui-org/theme";
import { useMemo } from "react";
function useDateInput(originalProps) {
  var _a, _b, _c, _d, _e, _f, _g;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);
  const { locale } = useLocale();
  const calendarProp = createCalendar(new DateFormatter(locale).resolvedOptions().calendar);
  const gregorianYearOffset = getGregorianYearOffset(calendarProp.identifier);
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
    minValue = (_c = (_b = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _b.minDate) != null ? _c : new CalendarDate(calendarProp, 1900 + gregorianYearOffset, 1, 1),
    maxValue = (_e = (_d = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _d.maxDate) != null ? _e : new CalendarDate(calendarProp, 2099 + gregorianYearOffset, 12, 31),
    createCalendar: createCalendarProp = (_f = globalContext == null ? void 0 : globalContext.createCalendar) != null ? _f : null,
    isInvalid: isInvalidProp = validationState ? validationState === "invalid" : false,
    errorMessage
  } = props;
  const domRef = useDOMRef(ref);
  const inputRef = useDOMRef(inputRefProp);
  const disableAnimation = (_g = originalProps.disableAnimation) != null ? _g : globalContext == null ? void 0 : globalContext.disableAnimation;
  const state = useDateFieldState({
    ...originalProps,
    label,
    locale,
    minValue,
    maxValue,
    validationBehavior,
    shouldForceLeadingZeros,
    createCalendar: !createCalendarProp || typeof createCalendarProp !== "function" ? createCalendar : createCalendarProp
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
  } = useAriaDateField({ ...originalProps, label, validationBehavior, inputRef }, state, domRef);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const isInvalid = isInvalidProp || ariaIsInvalid;
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
    [objectToDeps(variantProps), disableAnimation, labelPlacement, className]
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
      "data-slot": "input-field",
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
    const innerWrapperProps = mergeProps(innerWrapperPropsProp, props2);
    return {
      ...innerWrapperProps,
      "data-slot": "inner-wrapper",
      className: slots.innerWrapper({
        class: cn(classNames == null ? void 0 : classNames.innerWrapper, innerWrapperProps == null ? void 0 : innerWrapperProps.className)
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
  useDateInput
};
