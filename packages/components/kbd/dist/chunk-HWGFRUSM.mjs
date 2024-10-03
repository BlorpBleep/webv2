import {
  useKbd
} from "./chunk-HXMFKBAZ.mjs";
import {
  kbdKeysLabelMap,
  kbdKeysMap
} from "./chunk-7BVYOJX6.mjs";

// src/kbd.tsx
import { useMemo } from "react";
import { forwardRef } from "@nextui-org/system-rsc";
var Kbd = forwardRef((props, ref) => {
  const { Component, children, slots, classNames, keysToRender, getKbdProps } = useKbd({
    ...props
  });
  const keysContent = useMemo(() => {
    return keysToRender.map((key) => <abbr
      key={key}
      className={slots.abbr({ class: classNames == null ? void 0 : classNames.abbr })}
      title={kbdKeysLabelMap[key]}
    >{kbdKeysMap[key]}</abbr>);
  }, [keysToRender]);
  return <Component ref={ref} {...getKbdProps()}>
    {keysContent}
    {children && <span className={slots.content({ class: classNames == null ? void 0 : classNames.content })}>{children}</span>}
  </Component>;
});
Kbd.displayName = "NextUI.Kbd";
var kbd_default = Kbd;

export {
  kbd_default
};
