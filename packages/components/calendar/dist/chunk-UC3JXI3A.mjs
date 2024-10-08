"use client";
import {
  getMonthsInYear,
  getYearRange
} from "./chunk-FLUGWORV.mjs";
import {
  useCalendarContext
} from "./chunk-HCKEJHY3.mjs";

// src/use-calendar-picker.ts
import { useDateFormatter } from "@react-aria/i18n";
import { useCallback, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import { areRectsIntersecting } from "@nextui-org/react-utils";
import scrollIntoView from "scroll-into-view-if-needed";
var SCROLL_DEBOUNCE_TIME = 200;
function useCalendarPicker(props) {
  var _a;
  const { date, currentMonth } = props;
  const { slots, state, headerRef, isHeaderExpanded, setIsHeaderExpanded, classNames } = useCalendarContext();
  const highlightRef = useRef(null);
  const yearsListRef = useRef(null);
  const monthsListRef = useRef(null);
  const monthsItemsRef = useRef();
  const yearsItemsRef = useRef();
  const monthDateFormatter = useDateFormatter({
    month: "long",
    era: currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC" ? "short" : void 0,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone
  });
  const yearDateFormatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone
  });
  const years = (_a = getYearRange(state.minValue, state.maxValue)) == null ? void 0 : _a.map((y) => ({
    value: y.year,
    label: yearDateFormatter.format(y.toDate(state.timeZone))
  }));
  const months = getMonthsInYear(date).map((m) => ({
    value: m.month,
    label: monthDateFormatter.format(m.toDate(state.timeZone))
  }));
  function getItemsRefMap(itemsRef) {
    if (!itemsRef.current) {
      itemsRef.current = /* @__PURE__ */ new Map();
    }
    return itemsRef.current;
  }
  function getItemRef(node, value, list) {
    const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);
    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }
  const handleListScroll = useCallback(
    (e, highlightEl, list) => {
      if (!(e.target instanceof HTMLElement))
        return;
      const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);
      const items = Array.from(map.values());
      const item = items.find((itemEl) => {
        const rect1 = itemEl.getBoundingClientRect();
        const rect2 = highlightEl == null ? void 0 : highlightEl.getBoundingClientRect();
        if (!rect2) {
          return false;
        }
        return areRectsIntersecting(rect1, rect2);
      });
      const itemValue = Number(item == null ? void 0 : item.getAttribute("data-value"));
      if (!itemValue)
        return;
      let date2 = state.focusedDate.set(list === "months" ? { month: itemValue } : { year: itemValue });
      state.setFocusedDate(date2);
    },
    [state, isHeaderExpanded]
  );
  useEffect(() => {
    if (!isHeaderExpanded)
      return;
    scrollTo(date.month, "months", false);
    scrollTo(date.year, "years", false);
  }, [isHeaderExpanded]);
  useEffect(() => {
    const monthsList = monthsListRef.current;
    const yearsList = yearsListRef.current;
    const highlightEl = highlightRef.current;
    if (!highlightEl)
      return;
    const debouncedHandleMonthsScroll = debounce(
      (e) => handleListScroll(e, highlightEl, "months"),
      SCROLL_DEBOUNCE_TIME
    );
    const debouncedHandleYearsScroll = debounce(
      (e) => handleListScroll(e, highlightEl, "years"),
      SCROLL_DEBOUNCE_TIME
    );
    monthsList == null ? void 0 : monthsList.addEventListener("scroll", debouncedHandleMonthsScroll);
    yearsList == null ? void 0 : yearsList.addEventListener("scroll", debouncedHandleYearsScroll);
    return () => {
      if (debouncedHandleMonthsScroll) {
        monthsList == null ? void 0 : monthsList.removeEventListener("scroll", debouncedHandleMonthsScroll);
      }
      if (debouncedHandleYearsScroll) {
        yearsList == null ? void 0 : yearsList.removeEventListener("scroll", debouncedHandleYearsScroll);
      }
    };
  }, [handleListScroll]);
  function scrollTo(value, list, smooth = true) {
    const mapListRef = list === "months" ? monthsItemsRef : yearsItemsRef;
    const listRef = list === "months" ? monthsListRef : yearsListRef;
    const map = getItemsRefMap(mapListRef);
    const node = map.get(value);
    if (!node)
      return;
    scrollIntoView(node, {
      scrollMode: "always",
      behavior: smooth ? "smooth" : "auto",
      boundary: listRef.current
    });
  }
  const onPickerItemPressed = useCallback(
    (e, list) => {
      const target = e.target;
      const value = Number(target.getAttribute("data-value"));
      if (!value)
        return;
      scrollTo(value, list);
    },
    [state]
  );
  const onPickerItemKeyDown = useCallback(
    (e, value, list) => {
      var _a2;
      const map = getItemsRefMap(list === "months" ? monthsItemsRef : yearsItemsRef);
      const node = map.get(value);
      if (!node)
        return;
      let nextValue = value;
      switch (e.key) {
        case "ArrowDown":
          nextValue = value + 1;
          break;
        case "ArrowUp":
          nextValue = value - 1;
          break;
        case "Home":
          nextValue = 0;
          break;
        case "End":
          nextValue = months.length - 1;
          break;
        case "PageUp":
          nextValue = value - 3;
          break;
        case "PageDown":
          nextValue = value + 3;
          break;
        case "Escape":
        case "Enter":
        case " ":
          setIsHeaderExpanded == null ? void 0 : setIsHeaderExpanded(false);
          (_a2 = headerRef == null ? void 0 : headerRef.current) == null ? void 0 : _a2.focus();
          return;
      }
      const nextItem = map.get(nextValue);
      nextItem == null ? void 0 : nextItem.focus();
    },
    [state]
  );
  return {
    state,
    slots,
    classNames,
    years,
    months,
    highlightRef,
    monthsListRef,
    yearsListRef,
    getItemRef,
    isHeaderExpanded,
    onPickerItemPressed,
    onPickerItemKeyDown
  };
}

export {
  useCalendarPicker
};
