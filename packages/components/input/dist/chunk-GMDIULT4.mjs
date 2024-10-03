"use client";
import {
  useInput
} from "./chunk-NQM3AZQR.mjs";

// src/textarea.tsx
import { dataAttr } from "@nextui-org/shared-utils";
import { forwardRef } from "@nextui-org/system";
import { mergeProps } from "@react-aria/utils";
import { useMemo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
var Textarea = forwardRef(
  ({
    style,
    minRows = 3,
    maxRows = 8,
    cacheMeasurements = false,
    disableAutosize = false,
    onHeightChange,
    ...otherProps
  }, ref) => {
    const {
      Component,
      label,
      description,
      startContent,
      endContent,
      hasHelper,
      shouldLabelBeOutside,
      shouldLabelBeInside,
      isInvalid,
      errorMessage,
      getBaseProps,
      getLabelProps,
      getInputProps,
      getInnerWrapperProps,
      getInputWrapperProps,
      getHelperWrapperProps,
      getDescriptionProps,
      getErrorMessageProps
    } = useInput({ ...otherProps, ref, isMultiline: true });
    const [hasMultipleRows, setIsHasMultipleRows] = useState(minRows > 1);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;
    const inputProps = getInputProps();
    const handleHeightChange = (height, meta) => {
      if (minRows === 1) {
        setIsHasMultipleRows(height >= meta.rowHeight * 2);
      }
      if (maxRows > minRows) {
        const limitReached = height >= maxRows * meta.rowHeight;
        setIsLimitReached(limitReached);
      }
      onHeightChange == null ? void 0 : onHeightChange(height, meta);
    };
    const content = disableAutosize ? <textarea {...inputProps} style={mergeProps(inputProps.style, style != null ? style : {})} /> : <TextareaAutosize
      {...inputProps}
      cacheMeasurements={cacheMeasurements}
      data-hide-scroll={dataAttr(!isLimitReached)}
      maxRows={maxRows}
      minRows={minRows}
      style={mergeProps(inputProps.style, style != null ? style : {})}
      onHeightChange={handleHeightChange}
    />;
    const innerWrapper = useMemo(() => {
      if (startContent || endContent) {
        return <div {...getInnerWrapperProps()}>
          {startContent}
          {content}
          {endContent}
        </div>;
      }
      return <div {...getInnerWrapperProps()}>{content}</div>;
    }, [startContent, inputProps, endContent, getInnerWrapperProps]);
    return <Component {...getBaseProps()}>
      {shouldLabelBeOutside ? labelContent : null}
      <div {...getInputWrapperProps()} data-has-multiple-rows={dataAttr(hasMultipleRows)}>
        {shouldLabelBeInside ? labelContent : null}
        {innerWrapper}
      </div>
      {hasHelper ? <div {...getHelperWrapperProps()}>{isInvalid && errorMessage ? <div {...getErrorMessageProps()}>{errorMessage}</div> : description ? <div {...getDescriptionProps()}>{description}</div> : null}</div> : null}
    </Component>;
  }
);
Textarea.displayName = "NextUI.Textarea";
var textarea_default = Textarea;

export {
  textarea_default
};
