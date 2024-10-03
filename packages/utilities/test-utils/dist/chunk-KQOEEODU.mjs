import {
  fireEvent
} from "./chunk-6SXUF2M2.mjs";

// src/events.ts
function triggerPress(element, opts = {}) {
  fireEvent.mouseDown(element, { detail: 1, ...opts });
  fireEvent.mouseUp(element, { detail: 1, ...opts });
  fireEvent.click(element, { detail: 1, ...opts });
}
function type(key) {
  if (!document.activeElement) {
    throw new Error("No active element found.");
  }
  fireEvent.keyDown(document.activeElement, { key });
  fireEvent.keyUp(document.activeElement, { key });
}

export {
  triggerPress,
  type
};
