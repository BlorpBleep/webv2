"use client";
import {
  useCalendarPicker
} from "./chunk-UC3JXI3A.mjs";
import {
  CalendarPickerItem
} from "./chunk-LDIGHHGR.mjs";

// src/calendar-picker.tsx
import { useCallback } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const EmptyItem = useCallback(
    (props2) => /* @__PURE__ */ jsx(
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
  const PickerItemWrapper = useCallback(
    ({ children }) => /* @__PURE__ */ jsxs(Fragment, { children: [
      Array.from({ length: EMPTY_ITEMS_OFFSET }, (_, i) => /* @__PURE__ */ jsx(EmptyItem, {}, i)),
      children,
      Array.from({ length: EMPTY_ITEMS_OFFSET }, (_, i) => /* @__PURE__ */ jsx(EmptyItem, {}, i))
    ] }),
    [EmptyItem]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: slots == null ? void 0 : slots.pickerWrapper({
        class: classNames == null ? void 0 : classNames.pickerWrapper
      }),
      "data-slot": "picker-wrapper",
      inert: isHeaderExpanded ? void 0 : "",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: highlightRef,
            className: slots == null ? void 0 : slots.pickerHighlight({ class: classNames == null ? void 0 : classNames.pickerHighlight }),
            "data-slot": "picker-highlight"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: monthsListRef,
            className: slots == null ? void 0 : slots.pickerMonthList({ class: classNames == null ? void 0 : classNames.pickerMonthList }),
            "data-slot": "picker-month-list",
            children: /* @__PURE__ */ jsx(PickerItemWrapper, { children: months.map((month) => {
              var _a;
              return /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: yearsListRef,
            className: slots == null ? void 0 : slots.pickerYearList({ class: classNames == null ? void 0 : classNames.pickerYearList }),
            "data-slot": "picker-year-list",
            children: /* @__PURE__ */ jsx(PickerItemWrapper, { children: years.map((year) => {
              var _a;
              return /* @__PURE__ */ jsx(
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

export {
  CalendarPicker
};
