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

// src/calendar-picker.tsx
var calendar_picker_exports = {};
__export(calendar_picker_exports, {
  CalendarPicker: () => CalendarPicker
});
module.exports = __toCommonJS(calendar_picker_exports);
var import_react3 = require("react");

// src/calendar-picker-item.tsx
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
var import_react = require("react");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_jsx_runtime = require("react/jsx-runtime");
var CalendarPickerItem = (0, import_react.forwardRef)(({ children, autoFocus, isDisabled, onKeyDown, ...otherProps }, ref) => {
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { buttonProps: ariaButtonProps, isPressed } = (0, import_use_aria_button.useAriaButton)(
    {
      elementType: "button",
      isDisabled,
      onKeyDown,
      ...otherProps
    },
    domRef
  );
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref: domRef,
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      "data-slot": "picker-item",
      ...(0, import_utils.mergeProps)(
        focusProps,
        hoverProps,
        ariaButtonProps,
        (0, import_react_utils.filterDOMProps)(otherProps, { enabled: true })
      ),
      children
    }
  );
});
CalendarPickerItem.displayName = "CalendarPickerItem";

// src/use-calendar-picker.ts
var import_i18n = require("@react-aria/i18n");
var import_react2 = require("react");
var import_lodash = __toESM(require("lodash.debounce"));
var import_react_utils3 = require("@nextui-org/react-utils");
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
var import_react_utils2 = require("@nextui-org/react-utils");
var [CalendarProvider, useCalendarContext] = (0, import_react_utils2.createContext)({
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
  const highlightRef = (0, import_react2.useRef)(null);
  const yearsListRef = (0, import_react2.useRef)(null);
  const monthsListRef = (0, import_react2.useRef)(null);
  const monthsItemsRef = (0, import_react2.useRef)();
  const yearsItemsRef = (0, import_react2.useRef)();
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
  const handleListScroll = (0, import_react2.useCallback)(
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
        return (0, import_react_utils3.areRectsIntersecting)(rect1, rect2);
      });
      const itemValue = Number(item == null ? void 0 : item.getAttribute("data-value"));
      if (!itemValue)
        return;
      let date2 = state.focusedDate.set(list === "months" ? { month: itemValue } : { year: itemValue });
      state.setFocusedDate(date2);
    },
    [state, isHeaderExpanded]
  );
  (0, import_react2.useEffect)(() => {
    if (!isHeaderExpanded)
      return;
    scrollTo(date.month, "months", false);
    scrollTo(date.year, "years", false);
  }, [isHeaderExpanded]);
  (0, import_react2.useEffect)(() => {
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
  const onPickerItemPressed = (0, import_react2.useCallback)(
    (e, list) => {
      const target = e.target;
      const value = Number(target.getAttribute("data-value"));
      if (!value)
        return;
      scrollTo(value, list);
    },
    [state]
  );
  const onPickerItemKeyDown = (0, import_react2.useCallback)(
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

// src/calendar-picker.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var EMPTY_ITEMS_OFFSET = 3;
function CalendarPicker(props) {
  const {
    state,
    slots,
    months,
    years,
    highlightRef,
    monthsListRef,
    yearsListRef,
    classNames,
    getItemRef,
    isHeaderExpanded,
    onPickerItemPressed,
    onPickerItemKeyDown
  } = useCalendarPicker(props);
  const EmptyItem = (0, import_react3.useCallback)(
    (props2) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        "aria-hidden": "true",
        className: slots == null ? void 0 : slots.pickerItem({ class: classNames == null ? void 0 : classNames.pickerItem }),
        "data-slot": "picker-item-empty",
        tabIndex: -1,
        ...props2,
        children: "\xA0"
      }
    ),
    [slots, classNames == null ? void 0 : classNames.pickerItem]
  );
  const PickerItemWrapper = (0, import_react3.useCallback)(
    ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      Array.from({ length: EMPTY_ITEMS_OFFSET }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyItem, {}, i)),
      children,
      Array.from({ length: EMPTY_ITEMS_OFFSET }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EmptyItem, {}, i))
    ] }),
    [EmptyItem]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: slots == null ? void 0 : slots.pickerWrapper({
        class: classNames == null ? void 0 : classNames.pickerWrapper
      }),
      "data-slot": "picker-wrapper",
      inert: isHeaderExpanded ? void 0 : "",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            ref: highlightRef,
            className: slots == null ? void 0 : slots.pickerHighlight({ class: classNames == null ? void 0 : classNames.pickerHighlight }),
            "data-slot": "picker-highlight"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            ref: monthsListRef,
            className: slots == null ? void 0 : slots.pickerMonthList({ class: classNames == null ? void 0 : classNames.pickerMonthList }),
            "data-slot": "picker-month-list",
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PickerItemWrapper, { children: months.map((month) => {
              var _a;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                CalendarPickerItem,
                {
                  ref: (node) => getItemRef(node, month.value, "months"),
                  className: slots == null ? void 0 : slots.pickerItem({ class: classNames == null ? void 0 : classNames.pickerItem }),
                  "data-value": month.value,
                  tabIndex: !isHeaderExpanded || ((_a = state.focusedDate) == null ? void 0 : _a.month) !== month.value ? -1 : 0,
                  onKeyDown: (e) => onPickerItemKeyDown(e, month.value, "months"),
                  onPress: (e) => onPickerItemPressed(e, "months"),
                  children: month.label
                },
                `picker-month-${month.value}`
              );
            }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            ref: yearsListRef,
            className: slots == null ? void 0 : slots.pickerYearList({ class: classNames == null ? void 0 : classNames.pickerYearList }),
            "data-slot": "picker-year-list",
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PickerItemWrapper, { children: years.map((year) => {
              var _a;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                CalendarPickerItem,
                {
                  ref: (node) => getItemRef(node, year.value, "years"),
                  className: slots == null ? void 0 : slots.pickerItem({ class: classNames == null ? void 0 : classNames.pickerItem }),
                  "data-value": year.value,
                  tabIndex: !isHeaderExpanded || ((_a = state.focusedDate) == null ? void 0 : _a.year) !== year.value ? -1 : 0,
                  onKeyDown: (e) => onPickerItemKeyDown(e, year.value, "years"),
                  onPress: (e) => onPickerItemPressed(e, "years"),
                  children: year.label
                },
                `picker-year-${year.value}`
              );
            }) })
          }
        )
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendarPicker
});
