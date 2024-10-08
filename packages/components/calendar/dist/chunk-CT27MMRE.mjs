"use client";

// src/calendar-cell.tsx
import { getDayOfWeek, isSameDay, isSameMonth, isToday } from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { mergeProps } from "@react-aria/utils";
import { useLocale } from "@react-aria/i18n";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useRef } from "react";
import { dataAttr } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
function CalendarCell(originalProps) {
  const { state, slots, isPickerVisible, currentMonth, classNames, ...props } = originalProps;
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isPressed,
    isSelected,
    isDisabled,
    isFocused,
    isInvalid,
    formattedDate
  } = useCalendarCell(
    {
      ...props,
      isDisabled: !isSameMonth(props.date, currentMonth) || isPickerVisible
    },
    state,
    ref
  );
  const isUnavailable = state.isCellUnavailable(props.date);
  const isLastSelectedBeforeDisabled = !isDisabled && !isInvalid && state.isCellUnavailable(props.date.add({ days: 1 }));
  const isFirstSelectedAfterDisabled = !isDisabled && !isInvalid && state.isCellUnavailable(props.date.subtract({ days: 1 }));
  const highlightedRange = "highlightedRange" in state && state.highlightedRange;
  const isSelectionStart = isSelected && highlightedRange && isSameDay(props.date, highlightedRange.start);
  const isSelectionEnd = isSelected && highlightedRange && isSameDay(props.date, highlightedRange.end);
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(props.date, locale);
  const isRangeStart = isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || props.date.day === 1);
  const isRangeEnd = isSelected && (isLastSelectedBeforeDisabled || dayOfWeek === 6 || props.date.day === currentMonth.calendar.getDaysInMonth(currentMonth));
  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly
  });
  return /* @__PURE__ */ jsx("td", { className: slots == null ? void 0 : slots.cell({ class: classNames == null ? void 0 : classNames.cell }), "data-slot": "cell", ...cellProps, children: /* @__PURE__ */ jsx(
    "span",
    {
      ...mergeProps(buttonProps, hoverProps, focusProps),
      ref,
      className: slots == null ? void 0 : slots.cellButton({ class: classNames == null ? void 0 : classNames.cellButton }),
      "data-disabled": dataAttr(isDisabled && !isInvalid),
      "data-focus-visible": dataAttr(isFocused && isFocusVisible),
      "data-hover": dataAttr(isHovered),
      "data-invalid": dataAttr(isInvalid),
      "data-outside-month": dataAttr(!isSameMonth(props.date, currentMonth)),
      "data-pressed": dataAttr(isPressed && !state.isReadOnly),
      "data-range-end": dataAttr(isRangeEnd),
      "data-range-selection": dataAttr(isSelected && "highlightedRange" in state),
      "data-range-start": dataAttr(isRangeStart),
      "data-readonly": dataAttr(state.isReadOnly),
      "data-selected": dataAttr(isSelected),
      "data-selection-end": dataAttr(isSelectionEnd),
      "data-selection-start": dataAttr(isSelectionStart),
      "data-today": dataAttr(isToday(props.date, state.timeZone)),
      "data-unavailable": dataAttr(isUnavailable),
      children: /* @__PURE__ */ jsx("span", { children: formattedDate })
    }
  ) });
}

export {
  CalendarCell
};
