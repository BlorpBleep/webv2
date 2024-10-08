"use client";

// src/date-input-segment.tsx
import { useDateSegment } from "@react-aria/datepicker";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";
import { dataAttr } from "@nextui-org/shared-utils";
import { jsx } from "react/jsx-runtime";
var DateInputSegment = ({
  state,
  segment,
  slots,
  classNames,
  ...otherProps
}) => {
  const ref = useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);
  delete segmentProps.autoCapitalize;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...mergeProps(segmentProps, otherProps),
      ref,
      className: slots.segment({
        class: classNames == null ? void 0 : classNames.segment
      }),
      "data-editable": dataAttr(segment.isEditable),
      "data-invalid": dataAttr(state.isInvalid),
      "data-placeholder": dataAttr(segment.isPlaceholder),
      "data-slot": "segment",
      "data-type": segment.type,
      style: {
        ...segmentProps.style
      },
      children: segment.text
    }
  );
};

export {
  DateInputSegment
};
