import {
  act
} from "./chunk-6SXUF2M2.mjs";
import {
  isFocusable
} from "./chunk-7VAK4FFV.mjs";
import {
  getActiveElement
} from "./chunk-OW6MUBX6.mjs";

// src/focus.ts
function focus(el) {
  if (getActiveElement(el) === el)
    return;
  if (!isFocusable(el))
    return;
  act(() => {
    el.focus();
  });
}
function blur(el) {
  if (el == null)
    el = document.activeElement;
  if (el.tagName === "BODY")
    return;
  if (getActiveElement(el) !== el)
    return;
  act(() => {
    if (el && "blur" in el)
      el.blur();
  });
}

export {
  focus,
  blur
};
