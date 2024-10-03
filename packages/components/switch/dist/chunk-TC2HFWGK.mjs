"use client";
import {
  useSwitch
} from "./chunk-JYO7OWIA.mjs";

// src/switch.tsx
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { cloneElement } from "react";
import { forwardRef } from "@nextui-org/system";
var Switch = forwardRef((props, ref) => {
  const {
    Component,
    children,
    startContent,
    endContent,
    thumbIcon,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    getThumbProps,
    getThumbIconProps,
    getLabelProps,
    getStartContentProps,
    getEndContentProps
  } = useSwitch({ ...props, ref });
  const clonedThumbIcon = typeof thumbIcon === "function" ? thumbIcon(getThumbIconProps({ includeStateProps: true })) : thumbIcon && cloneElement(thumbIcon, getThumbIconProps());
  const clonedStartContent = startContent && cloneElement(startContent, getStartContentProps());
  const clonedEndContent = endContent && cloneElement(endContent, getEndContentProps());
  return <Component {...getBaseProps()}>
    <VisuallyHidden elementType="span"><input {...getInputProps()} /></VisuallyHidden>
    <span {...getWrapperProps()}>
      {startContent && clonedStartContent}
      <span {...getThumbProps()}>{thumbIcon && clonedThumbIcon}</span>
      {endContent && clonedEndContent}
    </span>
    {children && <span {...getLabelProps()}>{children}</span>}
  </Component>;
});
Switch.displayName = "NextUI.Switch";
var switch_default = Switch;

export {
  switch_default
};
