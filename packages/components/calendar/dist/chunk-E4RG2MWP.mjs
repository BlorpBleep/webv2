"use client";

// src/use-calendar-base.ts
import { createCalendar, CalendarDate, DateFormatter } from "@internationalized/date";
import { mapPropsVariants, useProviderContext } from "@nextui-org/system";
import { useCallback, useMemo } from "react";
import { calendar } from "@nextui-org/theme";
import { useControlledState } from "@react-stately/utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { useLocale } from "@react-aria/i18n";
import { clamp, dataAttr, objectToDeps, getGregorianYearOffset } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
function useCalendarBase(originalProps) {
  var _a, _b, _c, _d, _e, _f, _g;
  const [props, variantProps] = mapPropsVariants(originalProps, calendar.variantKeys);
  const globalContext = useProviderContext();
  const { locale } = useLocale();
  const calendarProp = createCalendar(new DateFormatter(locale).resolvedOptions().calendar);
  const gregorianYearOffset = getGregorianYearOffset(calendarProp.identifier);
  const {
    ref,
    as,
    children,
    className,
    topContent,
    bottomContent,
    showHelper = true,
    calendarWidth = 256,
    visibleMonths: visibleMonthsProp = 1,
    weekdayStyle = "narrow",
    navButtonProps = {},
    isHeaderExpanded: isHeaderExpandedProp,
    isHeaderDefaultExpanded,
    onHeaderExpandedChange = () => {
    },
    createCalendar: createCalendarProp = (_a = globalContext == null ? void 0 : globalContext.createCalendar) != null ? _a : null,
    minValue = (_c = (_b = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _b.minDate) != null ? _c : new CalendarDate(calendarProp, 1900 + gregorianYearOffset, 1, 1),
    maxValue = (_e = (_d = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _d.maxDate) != null ? _e : new CalendarDate(calendarProp, 2099 + gregorianYearOffset, 12, 31),
    prevButtonProps: prevButtonPropsProp,
    nextButtonProps: nextButtonPropsProp,
    errorMessage,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "div";
  const visibleMonths = clamp(visibleMonthsProp, 1, 3);
  const showMonthAndYearPickers = originalProps.showMonthAndYearPickers && visibleMonths === 1 && !(originalProps == null ? void 0 : originalProps.isRange);
  const domRef = useDOMRef(ref);
  const handleHeaderExpandedChange = useCallback(
    (isExpanded) => {
      onHeaderExpandedChange(isExpanded || false);
    },
    [onHeaderExpandedChange]
  );
  const [isHeaderExpanded, setIsHeaderExpanded] = useControlledState(
    isHeaderExpandedProp,
    isHeaderDefaultExpanded != null ? isHeaderDefaultExpanded : false,
    handleHeaderExpandedChange
  );
  const visibleDuration = useMemo(() => ({ months: visibleMonths }), [visibleMonths]);
  const hasMultipleMonths = visibleMonths > 1;
  const shouldFilterDOMProps = typeof Component === "string";
  const slots = useMemo(
    () => calendar({
      ...variantProps,
      showMonthAndYearPickers,
      isRange: !!originalProps.isRange,
      isHeaderWrapperExpanded: isHeaderExpanded,
      className
    }),
    [objectToDeps(variantProps), showMonthAndYearPickers, isHeaderExpanded, className]
  );
  const disableAnimation = (_g = (_f = originalProps.disableAnimation) != null ? _f : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _g : false;
  const commonButtonProps = {
    size: "sm",
    variant: "light",
    radius: "full",
    isIconOnly: true,
    disableAnimation,
    ...navButtonProps
  };
  const baseProps = {
    "data-slot": "base",
    "data-has-multiple-months": dataAttr(hasMultipleMonths),
    style: {
      "--visible-months": typeof visibleMonths === "number" ? `${visibleMonths}` : visibleMonths,
      "--calendar-width": typeof calendarWidth === "number" ? `${calendarWidth}px` : calendarWidth
    }
  };
  const getPrevButtonProps = (props2 = {}) => {
    return {
      "data-slot": "prev-button",
      tabIndex: isHeaderExpanded ? -1 : 0,
      className: slots.prevButton({ class: classNames == null ? void 0 : classNames.prevButton }),
      ...mergeProps(commonButtonProps, prevButtonPropsProp, props2)
    };
  };
  const getNextButtonProps = (props2 = {}) => {
    return {
      "data-slot": "next-button",
      tabIndex: isHeaderExpanded ? -1 : 0,
      className: slots.nextButton({ class: classNames == null ? void 0 : classNames.nextButton }),
      ...mergeProps(commonButtonProps, nextButtonPropsProp, props2)
    };
  };
  const getErrorMessageProps = (props2 = {}) => {
    return {
      "data-slot": "error-message",
      className: slots.errorMessage({ class: classNames == null ? void 0 : classNames.errorMessage }),
      ...props2
    };
  };
  return {
    Component,
    children,
    domRef,
    slots,
    locale,
    minValue,
    maxValue,
    baseProps,
    showHelper,
    weekdayStyle,
    visibleMonths,
    visibleDuration,
    shouldFilterDOMProps,
    isHeaderExpanded,
    showMonthAndYearPickers,
    disableAnimation,
    createCalendar: createCalendarProp,
    getPrevButtonProps,
    getNextButtonProps,
    getErrorMessageProps,
    setIsHeaderExpanded,
    topContent,
    bottomContent,
    errorMessage,
    classNames,
    otherProps
  };
}

export {
  useCalendarBase
};
