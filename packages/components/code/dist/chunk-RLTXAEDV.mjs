import {
  useCode
} from "./chunk-VA7MLDKS.mjs";

// src/code.tsx
import { forwardRef } from "@nextui-org/system-rsc";
var Code = forwardRef((props, ref) => {
  const { Component, children, getCodeProps } = useCode({ ...props });
  return <Component ref={ref} {...getCodeProps()}>{children}</Component>;
});
Code.displayName = "NextUI.Code";
var code_default = Code;

export {
  code_default
};
