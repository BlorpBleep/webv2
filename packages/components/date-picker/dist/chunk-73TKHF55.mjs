"use client";

// src/date-range-picker-field.tsx
import { createCalendar } from "@internationalized/date";
import { forwardRef, useRef } from "react";
import { useDateField as useAriaDateField } from "@react-aria/datepicker";
import { useDateFieldState } from "@react-stately/datepicker";
import { DateInputSegment } from "@nextui-org/date-input";
import { filterDOMProps, useDOMRef } from "@nextui-org/react-utils";
import { useLocale } from "@react-aria/i18n";
import { mergeProps } from "@react-aria/utils";
import { jsx, jsxs } from "react/jsx-runtime";
function DateRangePickerField(props, ref) {
  const { as, slots, createCalendar: createCalendarProp, classNames, ...otherProps } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const { locale } = useLocale();
  let state = useDateFieldState({
    ...otherProps,
    locale,
    createCalendar: !createCalendarProp || typeof createCalendarProp !== "function" ? createCalendar : createCalendarProp
  });
  const inputRef = useRef(null);
  const {
    fieldProps,
    inputProps,
    isInvalid: ariaIsInvalid
  } = useAriaDateField({ ...otherProps, inputRef }, state, domRef);
  const isInvalid = props.isInvalid || ariaIsInvalid;
  state.isInvalid = isInvalid;
  return /* @__PURE__ */ jsxs(Component, { ...mergeProps(fieldProps, filterDOMProps(otherProps)), ref: domRef, children: [
    state.segments.map((segment, i) => /* @__PURE__ */ jsx(
      DateInputSegment,
      {
        classNames,
        segment,
        slots,
        state
      },
      i
    )),
    /* @__PURE__ */ jsx("input", { ...inputProps, ref: inputRef })
  ] });
}
DateRangePickerField.displayName = "NextUI.DateRangePickerField";
var date_range_picker_field_default = forwardRef(DateRangePickerField);

export {
  date_range_picker_field_default
};
