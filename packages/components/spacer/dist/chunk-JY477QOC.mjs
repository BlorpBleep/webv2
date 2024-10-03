import {
  useSpacer
} from "./chunk-XIKEQB64.mjs";

// src/spacer.tsx
import { forwardRef } from "@nextui-org/system-rsc";
var Spacer = forwardRef((props, ref) => {
  const { Component, getSpacerProps } = useSpacer({ ...props });
  return <Component ref={ref} {...getSpacerProps()} />;
});
Spacer.displayName = "NextUI.Spacer";
var spacer_default = Spacer;

export {
  spacer_default
};
