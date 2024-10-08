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

// src/use-calendar-base.ts
var use_calendar_base_exports = {};
__export(use_calendar_base_exports, {
  useCalendarBase: () => useCalendarBase
});
module.exports = __toCommonJS(use_calendar_base_exports);
var import_date = require("@internationalized/date");
var import_system = require("@nextui-org/system");
var import_react = require("react");
var import_theme = require("@nextui-org/theme");
var import_utils = require("@react-stately/utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_i18n = require("@react-aria/i18n");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils2 = require("@react-aria/utils");
function useCalendarBase(originalProps) {
  var _a, _b, _c, _d, _e, _f, _g;
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.calendar.variantKeys);
  const globalContext = (0, import_system.useProviderContext)();
  const { locale } = (0, import_i18n.useLocale)();
  const calendarProp = (0, import_date.createCalendar)(new import_date.DateFormatter(locale).resolvedOptions().calendar);
  const gregorianYearOffset = (0, import_shared_utils.getGregorianYearOffset)(calendarProp.identifier);
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
    minValue = (_c = (_b = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _b.minDate) != null ? _c : new import_date.CalendarDate(calendarProp, 1900 + gregorianYearOffset, 1, 1),
    maxValue = (_e = (_d = globalContext == null ? void 0 : globalContext.defaultDates) == null ? void 0 : _d.maxDate) != null ? _e : new import_date.CalendarDate(calendarProp, 2099 + gregorianYearOffset, 12, 31),
    prevButtonProps: prevButtonPropsProp,
    nextButtonProps: nextButtonPropsProp,
    errorMessage,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "div";
  const visibleMonths = (0, import_shared_utils.clamp)(visibleMonthsProp, 1, 3);
  const showMonthAndYearPickers = originalProps.showMonthAndYearPickers && visibleMonths === 1 && !(originalProps == null ? void 0 : originalProps.isRange);
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const handleHeaderExpandedChange = (0, import_react.useCallback)(
    (isExpanded) => {
      onHeaderExpandedChange(isExpanded || false);
    },
    [onHeaderExpandedChange]
  );
  const [isHeaderExpanded, setIsHeaderExpanded] = (0, import_utils.useControlledState)(
    isHeaderExpandedProp,
    isHeaderDefaultExpanded != null ? isHeaderDefaultExpanded : false,
    handleHeaderExpandedChange
  );
  const visibleDuration = (0, import_react.useMemo)(() => ({ months: visibleMonths }), [visibleMonths]);
  const hasMultipleMonths = visibleMonths > 1;
  const shouldFilterDOMProps = typeof Component === "string";
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.calendar)({
      ...variantProps,
      showMonthAndYearPickers,
      isRange: !!originalProps.isRange,
      isHeaderWrapperExpanded: isHeaderExpanded,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), showMonthAndYearPickers, isHeaderExpanded, className]
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
    "data-has-multiple-months": (0, import_shared_utils.dataAttr)(hasMultipleMonths),
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
      ...(0, import_utils2.mergeProps)(commonButtonProps, prevButtonPropsProp, props2)
    };
  };
  const getNextButtonProps = (props2 = {}) => {
    return {
      "data-slot": "next-button",
      tabIndex: isHeaderExpanded ? -1 : 0,
      className: slots.nextButton({ class: classNames == null ? void 0 : classNames.nextButton }),
      ...(0, import_utils2.mergeProps)(commonButtonProps, nextButtonPropsProp, props2)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCalendarBase
});
