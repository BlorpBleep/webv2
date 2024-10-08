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

// src/calendar-cell.tsx
var calendar_cell_exports = {};
__export(calendar_cell_exports, {
  CalendarCell: () => CalendarCell
});
module.exports = __toCommonJS(calendar_cell_exports);
var import_date = require("@internationalized/date");
var import_calendar = require("@react-aria/calendar");
var import_utils = require("@react-aria/utils");
var import_i18n = require("@react-aria/i18n");
var import_focus = require("@react-aria/focus");
var import_interactions = require("@react-aria/interactions");
var import_react = require("react");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_jsx_runtime = require("react/jsx-runtime");
function CalendarCell(originalProps) {
  const { state, slots, isPickerVisible, currentMonth, classNames, ...props } = originalProps;
  const ref = (0, import_react.useRef)(null);
  const {
    cellProps,
    buttonProps,
    isPressed,
    isSelected,
    isDisabled,
    isFocused,
    isInvalid,
    formattedDate
  } = (0, import_calendar.useCalendarCell)(
    {
      ...props,
      isDisabled: !(0, import_date.isSameMonth)(props.date, currentMonth) || isPickerVisible
    },
    state,
    ref
  );
  const isUnavailable = state.isCellUnavailable(props.date);
  const isLastSelectedBeforeDisabled = !isDisabled && !isInvalid && state.isCellUnavailable(props.date.add({ days: 1 }));
  const isFirstSelectedAfterDisabled = !isDisabled && !isInvalid && state.isCellUnavailable(props.date.subtract({ days: 1 }));
  const highlightedRange = "highlightedRange" in state && state.highlightedRange;
  const isSelectionStart = isSelected && highlightedRange && (0, import_date.isSameDay)(props.date, highlightedRange.start);
  const isSelectionEnd = isSelected && highlightedRange && (0, import_date.isSameDay)(props.date, highlightedRange.end);
  const { locale } = (0, import_i18n.useLocale)();
  const dayOfWeek = (0, import_date.getDayOfWeek)(props.date, locale);
  const isRangeStart = isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || props.date.day === 1);
  const isRangeEnd = isSelected && (isLastSelectedBeforeDisabled || dayOfWeek === 6 || props.date.day === currentMonth.calendar.getDaysInMonth(currentMonth));
  const { focusProps, isFocusVisible } = (0, import_focus.useFocusRing)();
  const { hoverProps, isHovered } = (0, import_interactions.useHover)({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: slots == null ? void 0 : slots.cell({ class: classNames == null ? void 0 : classNames.cell }), "data-slot": "cell", ...cellProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      ...(0, import_utils.mergeProps)(buttonProps, hoverProps, focusProps),
      ref,
      className: slots == null ? void 0 : slots.cellButton({ class: classNames == null ? void 0 : classNames.cellButton }),
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled && !isInvalid),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocused && isFocusVisible),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-invalid": (0, import_shared_utils.dataAttr)(isInvalid),
      "data-outside-month": (0, import_shared_utils.dataAttr)(!(0, import_date.isSameMonth)(props.date, currentMonth)),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed && !state.isReadOnly),
      "data-range-end": (0, import_shared_utils.dataAttr)(isRangeEnd),
      "data-range-selection": (0, import_shared_utils.dataAttr)(isSelected && "highlightedRange" in state),
      "data-range-start": (0, import_shared_utils.dataAttr)(isRangeStart),
      "data-readonly": (0, import_shared_utils.dataAttr)(state.isReadOnly),
      "data-selected": (0, import_shared_utils.dataAttr)(isSelected),
      "data-selection-end": (0, import_shared_utils.dataAttr)(isSelectionEnd),
      "data-selection-start": (0, import_shared_utils.dataAttr)(isSelectionStart),
      "data-today": (0, import_shared_utils.dataAttr)((0, import_date.isToday)(props.date, state.timeZone)),
      "data-unavailable": (0, import_shared_utils.dataAttr)(isUnavailable),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formattedDate })
    }
  ) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendarCell
});
