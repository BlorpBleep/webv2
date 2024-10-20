"use client";
import {
  useCalendarBase
} from "./chunk-E4RG2MWP.mjs";

// src/use-calendar.ts
import { useMemo, useRef } from "react";
import { filterDOMProps } from "@nextui-org/react-utils";
import { useCalendar as useAriaCalendar } from "@react-aria/calendar";
import { useCalendarState } from "@react-stately/calendar";
import { createCalendar } from "@internationalized/date";
import { clsx } from "@nextui-org/shared-utils";
import { chain, mergeProps } from "@react-aria/utils";
function useCalendar({
  buttonPickerProps: buttonPickerPropsProp,
  className,
  ...originalProps
}) {
  const {
    Component,
    slots,
    children,
    domRef,
    locale,
    minValue,
    maxValue,
    showHelper,
    weekdayStyle,
    visibleDuration,
    baseProps,
    disableAnimation,
    shouldFilterDOMProps,
    isHeaderExpanded,
    visibleMonths,
    createCalendar: createCalendarProp,
    showMonthAndYearPickers,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps
  } = useCalendarBase(originalProps);
  const headerRef = useRef(null);
  const state = useCalendarState({
    ...originalProps,
    locale,
    minValue,
    maxValue,
    visibleDuration,
    createCalendar: !createCalendarProp || typeof createCalendarProp !== "function" ? createCalendar : createCalendarProp
  });
  const { title, calendarProps, prevButtonProps, nextButtonProps, errorMessageProps } = useAriaCalendar(originalProps, state);
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const buttonPickerProps = {
    ...mergeProps(buttonPickerPropsProp, { isDisabled: originalProps.isDisabled }),
    onPress: chain(buttonPickerPropsProp == null ? void 0 : buttonPickerPropsProp.onPress, () => setIsHeaderExpanded(!isHeaderExpanded))
  };
  const getBaseCalendarProps = (props = {}) => {
    return {
      ...baseProps,
      Component,
      showHelper,
      topContent,
      bottomContent,
      buttonPickerProps,
      calendarRef: domRef,
      calendarProps,
      prevButtonProps: getPrevButtonProps(prevButtonProps),
      nextButtonProps: getNextButtonProps(nextButtonProps),
      errorMessageProps: getErrorMessageProps(errorMessageProps),
      className: slots.base({ class: baseStyles }),
      errorMessage,
      ...filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      ...props
    };
  };
  const context = useMemo(
    () => ({
      state,
      slots,
      headerRef,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      classNames,
      showMonthAndYearPickers,
      disableAnimation
    }),
    [
      state,
      slots,
      classNames,
      weekdayStyle,
      isHeaderExpanded,
      setIsHeaderExpanded,
      visibleMonths,
      disableAnimation,
      showMonthAndYearPickers
    ]
  );
  return {
    Component,
    children,
    domRef,
    context,
    state,
    slots,
    title,
    classNames,
    getBaseCalendarProps
  };
}

export {
  useCalendar
};
