"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-calendar-picker.ts
var use_calendar_picker_exports = {};
__export(use_calendar_picker_exports, {
  useCalendarPicker: () => useCalendarPicker
});
module.exports = __toCommonJS(use_calendar_picker_exports);
var import_i18n = require("@react-aria/i18n");
var import_react = require("react");
var import_lodash = __toESM(require("lodash.debounce"));
var import_react_utils2 = require("@nextui-org/react-utils");
var import_scroll_into_view_if_needed = __toESM(require("scroll-into-view-if-needed"));

// src/utils.ts
var import_date = require("@internationalized/date");
function getYearRange(start, end) {
  const years = [];
  if (!start || !end) {
    return years;
  }
  let current = (0, import_date.startOfYear)(start);
  while (current.compare(end) <= 0) {
    years.push(current);
    current = (0, import_date.startOfYear)(current.add({ years: 1 }));
  }
  return years;
}
function addMonths(date, months) {
  return date.add({ months });
}
function getMonthsInYear(year) {
  const firstMonth = (0, import_date.startOfYear)(year);
  const months = [firstMonth];
  while (months.length < 12) {
    const prevMonth = months[months.length - 1];
    months.push(addMonths(prevMonth, 1));
  }
  return months;
}

// src/calendar-context.ts
var import_react_utils = require("@nextui-org/react-utils");
var [CalendarProvider, useCalendarContext] = (0, import_react_utils.createContext)({
  name: "CalendarContext",
  strict: true,
  errorMessage: "useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider"
});

// src/use-calendar-picker.ts
var SCROLL_DEBOUNCE_TIME = 200;
function useCalendarPicker(props) {
  var _a;
  const { date, currentMonth } = props;
  const { slots, state, headerRef, isHeaderExpanded, setIsHeaderExpanded, classNames } = useCalendarContext();
  const highlightRef = (0, import_react.useRef)(null);
  const yearsListRef = (0, import_react.useRef)(null);
  const monthsListRef = (0, import_react.useRef)(null);
  const monthsItemsRef = (0, import_react.useRef)();
  const yearsItemsRef = (0, import_react.useRef)();
  const monthDateFormatter = (0, import_i18n.useDateFormatter)({
    month: "long",
    era: currentMonth.calendar.identifier === "gregory" && currentMonth.era === "BC" ? "short" : void 0,
    calendar: currentMonth.calendar.identifier,
    timeZone: state.timeZone
  });
  const yearDateFormatter = (0, import_i18n.useDateFormatter)({
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
  const handleListScroll = (0, import_react.useCallback)(
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
        return (0, import_react_utils2.areRectsIntersecting)(rect1, rect2);
      });
      const itemValue = Number(item == null ? void 0 : item.getAttribute("data-value"));
      if (!itemValue)
        return;
      let date2 = state.focusedDate.set(list === "months" ? { month: itemValue } : { year: itemValue });
      state.setFocusedDate(date2);
    },
    [state, isHeaderExpanded]
  );
  (0, import_react.useEffect)(() => {
    if (!isHeaderExpanded)
      return;
    scrollTo(date.month, "months", false);
    scrollTo(date.year, "years", false);
  }, [isHeaderExpanded]);
  (0, import_react.useEffect)(() => {
    const monthsList = monthsListRef.current;
    const yearsList = yearsListRef.current;
    const highlightEl = highlightRef.current;
    if (!highlightEl)
      return;
    const debouncedHandleMonthsScroll = (0, import_lodash.default)(
      (e) => handleListScroll(e, highlightEl, "months"),
      SCROLL_DEBOUNCE_TIME
    );
    const debouncedHandleYearsScroll = (0, import_lodash.default)(
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
    (0, import_scroll_into_view_if_needed.default)(node, {
      scrollMode: "always",
      behavior: smooth ? "smooth" : "auto",
      boundary: listRef.current
    });
  }
  const onPickerItemPressed = (0, import_react.useCallback)(
    (e, list) => {
      const target = e.target;
      const value = Number(target.getAttribute("data-value"));
      if (!value)
        return;
      scrollTo(value, list);
    },
    [state]
  );
  const onPickerItemKeyDown = (0, import_react.useCallback)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCalendarPicker
});
