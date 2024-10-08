"use client";
import {
  useDatePickerBase
} from "./chunk-UAPX56O7.mjs";

// src/use-date-range-picker.ts
import { useProviderContext } from "@nextui-org/system";
import { useMemo, useRef } from "react";
import { useDateRangePickerState } from "@react-stately/datepicker";
import { useDateRangePicker as useAriaDateRangePicker } from "@react-aria/datepicker";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
import { dateRangePicker, dateInput, cn } from "@nextui-org/theme";
import { ariaShouldCloseOnInteractOutside } from "@nextui-org/aria-utils";
function useDateRangePicker({
  as,
  isInvalid: isInvalidProp,
  description,
  startContent,
  endContent,
  selectorIcon,
  errorMessage,
  className,
  classNames,
  ...originalProps
}) {
  var _a, _b;
  const globalContext = useProviderContext();
  const validationBehavior = (_b = (_a = originalProps.validationBehavior) != null ? _a : globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _b : "aria";
  const {
    domRef,
    slotsProps,
    createCalendar,
    stringFormatter,
    timeMinValue,
    timeMaxValue,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    userTimeInputProps,
    hasMultipleMonths,
    selectorButtonProps,
    selectorIconProps
  } = useDatePickerBase({ ...originalProps, validationBehavior });
  let state = useDateRangePickerState({
    ...originalProps,
    validationBehavior,
    shouldCloseOnSelect: () => !state.hasTime
  });
  const popoverTriggerRef = useRef(null);
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps: ariaCalendarProps,
    validationDetails,
    validationErrors,
    descriptionProps,
    errorMessageProps,
    isInvalid: isAriaInvalid
  } = useAriaDateRangePicker({ ...originalProps, validationBehavior }, state, domRef);
  const isInvalid = isInvalidProp || isAriaInvalid;
  const slots = useMemo(
    () => dateRangePicker({
      ...variantProps,
      className
    }),
    [objectToDeps(variantProps), className]
  );
  const timeGranularity = state.granularity === "hour" || state.granularity === "minute" || state.granularity === "second" ? state.granularity : null;
  const showTimeField = !!timeGranularity;
  const labelPlacement = useMemo(() => {
    var _a2;
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !originalProps.label) {
      return "outside";
    }
    return (_a2 = originalProps.labelPlacement) != null ? _a2 : "inside";
  }, [originalProps.labelPlacement, originalProps.label]);
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const getStartTimeInputProps = () => {
    var _a2, _b2, _c;
    if (!showTimeField)
      return {};
    return {
      ...timeInputProps,
      label: stringFormatter.format("startTime"),
      value: ((_a2 = state.timeRange) == null ? void 0 : _a2.start) || null,
      onChange: (v) => state.setTime("start", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
      classNames: {
        base: slots.timeInput({
          class: clsx(classNames == null ? void 0 : classNames.timeInput, (_b2 = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _b2.base)
        }),
        label: slots.timeInputLabel({
          class: clsx(classNames == null ? void 0 : classNames.timeInputLabel, (_c = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _c.label)
        })
      }
    };
  };
  const getEndTimeInputProps = () => {
    var _a2, _b2, _c;
    if (!showTimeField)
      return {};
    return {
      ...timeInputProps,
      label: stringFormatter.format("endTime"),
      value: ((_a2 = state.timeRange) == null ? void 0 : _a2.end) || null,
      onChange: (v) => state.setTime("end", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
      classNames: {
        base: slots.timeInput({
          class: clsx(classNames == null ? void 0 : classNames.timeInput, (_b2 = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _b2.base)
        }),
        label: slots.timeInputLabel({
          class: clsx(classNames == null ? void 0 : classNames.timeInputLabel, (_c = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _c.label)
        })
      }
    };
  };
  const getPopoverProps = (props = {}) => {
    var _a2, _b2;
    return {
      state,
      dialogProps,
      ...props,
      ...popoverProps,
      triggerRef: popoverTriggerRef,
      classNames: {
        content: slots.popoverContent({
          class: clsx(
            classNames == null ? void 0 : classNames.popoverContent,
            (_b2 = (_a2 = slotsProps.popoverProps) == null ? void 0 : _a2.classNames) == null ? void 0 : _b2["content"],
            props.className
          )
        })
      },
      shouldCloseOnInteractOutside: (popoverProps == null ? void 0 : popoverProps.shouldCloseOnInteractOutside) ? popoverProps.shouldCloseOnInteractOutside : (element) => ariaShouldCloseOnInteractOutside(element, popoverTriggerRef, state)
    };
  };
  const getCalendarProps = () => {
    var _a2, _b2;
    return {
      ...ariaCalendarProps,
      ...calendarProps,
      classNames: {
        ...calendarProps.classNames,
        base: slots.calendar({ class: cn((_a2 = calendarProps == null ? void 0 : calendarProps.classNames) == null ? void 0 : _a2.base, classNames == null ? void 0 : classNames.calendar) }),
        content: slots.calendarContent({
          class: cn((_b2 = calendarProps == null ? void 0 : calendarProps.classNames) == null ? void 0 : _b2.content, classNames == null ? void 0 : classNames.calendarContent)
        })
      }
    };
  };
  const getSelectorButtonProps = () => {
    return {
      ...buttonProps,
      ...selectorButtonProps,
      onPress: state.toggle,
      className: slots.selectorButton({ class: classNames == null ? void 0 : classNames.selectorButton })
    };
  };
  const getSeparatorProps = () => {
    return {
      "data-slot": "separator",
      className: slots.separator({ class: classNames == null ? void 0 : classNames.separator })
    };
  };
  const getSelectorIconProps = () => {
    return {
      ...selectorIconProps,
      className: slots.selectorIcon({ class: classNames == null ? void 0 : classNames.selectorIcon })
    };
  };
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const dateInputSlots = useMemo(
    () => dateInput({
      ...variantProps,
      labelPlacement,
      className
    }),
    [objectToDeps(variantProps), className]
  );
  const getStartDateInputProps = (props = {}) => {
    return {
      ...startFieldProps,
      isInvalid,
      "data-slot": "start-input",
      slots: dateInputSlots,
      createCalendar,
      ...mergeProps(variantProps, startFieldProps, {
        fullWidth: true,
        disableAnimation
      }),
      "data-open": dataAttr(state.isOpen),
      classNames,
      style: {
        ...props.style,
        maxWidth: "fit-content"
      },
      className: dateInputSlots.input({
        class: clsx(classNames == null ? void 0 : classNames.input, props == null ? void 0 : props.className)
      })
    };
  };
  const getEndDateInputProps = (props = {}) => {
    return {
      ...endFieldProps,
      isInvalid,
      "data-slot": "end-input",
      slots: dateInputSlots,
      createCalendar,
      ...mergeProps(variantProps, endFieldProps, {
        fullWidth: true,
        disableAnimation
      }),
      "data-open": dataAttr(state.isOpen),
      classNames,
      className: dateInputSlots.input({
        class: clsx(classNames == null ? void 0 : classNames.input, props == null ? void 0 : props.className)
      })
    };
  };
  const getLabelProps = (props) => {
    return {
      ...props,
      ...labelProps,
      "data-slot": "label",
      className: dateInputSlots.label({
        class: clsx(classNames == null ? void 0 : classNames.label, props == null ? void 0 : props.className)
      })
    };
  };
  const getInputWrapperProps = (props = {}) => {
    return {
      ref: domRef,
      ...props,
      ...groupProps,
      "data-slot": "input-wrapper",
      className: dateInputSlots.inputWrapper({
        class: classNames == null ? void 0 : classNames.inputWrapper
      }),
      onClick: labelProps.onClick
    };
  };
  const getInnerWrapperProps = (props) => {
    return {
      ...props,
      ref: popoverTriggerRef,
      "data-slot": "inner-wrapper",
      className: dateInputSlots.innerWrapper({
        class: classNames == null ? void 0 : classNames.innerWrapper
      })
    };
  };
  const getHelperWrapperProps = (props) => {
    return {
      ...props,
      "data-slot": "helper-wrapper",
      className: dateInputSlots.helperWrapper({
        class: clsx(classNames == null ? void 0 : classNames.helperWrapper, props == null ? void 0 : props.className)
      })
    };
  };
  const getErrorMessageProps = (props = {}) => {
    return {
      ...props,
      ...errorMessageProps,
      "data-slot": "error-message",
      className: dateInputSlots.errorMessage({
        class: clsx(classNames == null ? void 0 : classNames.errorMessage, props == null ? void 0 : props.className)
      })
    };
  };
  const getDescriptionProps = (props = {}) => {
    return {
      ...props,
      ...descriptionProps,
      "data-slot": "description",
      className: dateInputSlots.description({
        class: clsx(classNames == null ? void 0 : classNames.description, props == null ? void 0 : props.className)
      })
    };
  };
  const getDateInputGroupProps = () => {
    return {
      as,
      label: originalProps.label,
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
      "data-has-multiple-months": dataAttr(hasMultipleMonths),
      "data-has-end-content": dataAttr(!!endContent),
      descriptionProps: getDescriptionProps(),
      errorMessageProps: getErrorMessageProps(),
      groupProps: getInputWrapperProps(),
      helperWrapperProps: getHelperWrapperProps(),
      labelProps: getLabelProps(),
      wrapperProps: getInnerWrapperProps(),
      className: dateInputSlots.base({ class: baseStyles })
    };
  };
  return {
    state,
    label: originalProps.label,
    slots,
    classNames,
    endContent,
    selectorIcon,
    showTimeField,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    getStartDateInputProps,
    getEndDateInputProps,
    getStartTimeInputProps,
    getEndTimeInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getSeparatorProps,
    getSelectorIconProps,
    getDateInputGroupProps
  };
}

export {
  useDateRangePicker
};
