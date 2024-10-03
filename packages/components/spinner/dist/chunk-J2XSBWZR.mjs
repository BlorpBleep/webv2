import {
  useSpinner
} from "./chunk-GF2IUMUE.mjs";

// src/spinner.tsx
import { forwardRef } from "@nextui-org/system-rsc";
var Spinner = forwardRef((props, ref) => {
  const { slots, classNames, label, getSpinnerProps } = useSpinner({ ...props });
  return <div ref={ref} {...getSpinnerProps()}>
    <div className={slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper })}>
      <i className={slots.circle1({ class: classNames == null ? void 0 : classNames.circle1 })} />
      <i className={slots.circle2({ class: classNames == null ? void 0 : classNames.circle2 })} />
    </div>
    {label && <span className={slots.label({ class: classNames == null ? void 0 : classNames.label })}>{label}</span>}
  </div>;
});
Spinner.displayName = "NextUI.Spinner";
var spinner_default = Spinner;

export {
  spinner_default
};
