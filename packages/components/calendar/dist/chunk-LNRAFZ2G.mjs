"use client";
import {
  ChevronDownIcon
} from "./chunk-JJRY4BYN.mjs";
import {
  m
} from "./chunk-B4KYWKCZ.mjs";
import {
  useCalendarContext
} from "./chunk-HCKEJHY3.mjs";
import {
  slideVariants
} from "./chunk-5CY7DCRB.mjs";

// src/calendar-header.tsx
import { useDateFormatter } from "@react-aria/i18n";
import { Button } from "@nextui-org/button";
import { useCallback } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
function CalendarHeader(props) {
  const { direction, date, currentMonth, buttonPickerProps } = props;
  const {
    state,
    slots,
    headerRef,
    showMonthAndYearPickers,
    isHeaderExpanded,
    setIsHeaderExpanded,
    disableAnimation,
    classNames
  } = useCalendarContext();
  const monthAndYearDateFormatter = useDateFormatter({
    month: "long",
    era: currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC" ? "short" : void 0,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone,
    year: "numeric"
  });
  const monthDateContent = monthAndYearDateFormatter.format(date.toDate(state.timeZone));
  const headerTitle = /* @__PURE__ */ jsx(Fragment, { children: disableAnimation ? /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: slots == null ? void 0 : slots.title({ class: classNames == null ? void 0 : classNames.title }),
      "data-slot": "title",
      children: monthDateContent
    },
    currentMonth.month
  ) : /* @__PURE__ */ jsx(
    m.span,
    {
      animate: "center",
      "aria-hidden": true,
      className: slots == null ? void 0 : slots.title({ class: classNames == null ? void 0 : classNames.title }),
      custom: direction,
      "data-slot": "title",
      exit: "exit",
      initial: "enter",
      variants: isHeaderExpanded ? {} : slideVariants,
      children: monthDateContent
    },
    currentMonth.month
  ) });
  const headerProps = {
    ref: headerRef,
    className: slots == null ? void 0 : slots.header({ class: classNames == null ? void 0 : classNames.header }),
    "data-slot": "header"
  };
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setIsHeaderExpanded == null ? void 0 : setIsHeaderExpanded(false);
      }
    },
    [setIsHeaderExpanded]
  );
  return showMonthAndYearPickers ? /* @__PURE__ */ jsx(
    Button,
    {
      ...headerProps,
      disableAnimation,
      endContent: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "chevron-icon" }),
      onKeyDown: handleKeyDown,
      ...buttonPickerProps,
      children: headerTitle
    }
  ) : /* @__PURE__ */ jsx("header", { ...headerProps, children: headerTitle });
}

export {
  CalendarHeader
};
