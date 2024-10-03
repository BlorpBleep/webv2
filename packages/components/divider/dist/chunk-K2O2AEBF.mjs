import {
  useDivider
} from "./chunk-HGQPAK7A.mjs";

// src/divider.tsx
import { forwardRef } from "@nextui-org/system-rsc";
var Divider = forwardRef((props, ref) => {
  const { Component, getDividerProps } = useDivider({ ...props });
  return <Component ref={ref} {...getDividerProps()} />;
});
Divider.displayName = "NextUI.Divider";
var divider_default = Divider;

export {
  divider_default
};
