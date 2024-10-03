"use client";

// src/resizable-panel.tsx
import { forwardRef } from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { useMeasure } from "@nextui-org/use-measure";
var ResizablePanel = forwardRef(
  (originalProps, ref) => {
    const { children, ...props } = originalProps;
    let [measureRef, bounds] = useMeasure();
    return <LazyMotion features={domAnimation}><m.div
      ref={ref}
      animate={{
        width: bounds.width && (bounds == null ? void 0 : bounds.width) > 0 ? bounds.width : "auto",
        height: bounds.height && bounds.height > 0 ? bounds.height : "auto"
      }}
    ><div ref={measureRef} {...props}>{children}</div></m.div></LazyMotion>;
  }
);
ResizablePanel.displayName = "NextUI - ResizablePanel";

export {
  ResizablePanel
};
