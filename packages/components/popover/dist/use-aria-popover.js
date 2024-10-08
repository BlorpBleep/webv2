"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-aria-popover.ts
var use_aria_popover_exports = {};
__export(use_aria_popover_exports, {
  useReactAriaPopover: () => useReactAriaPopover
});
module.exports = __toCommonJS(use_aria_popover_exports);
var import_react = require("react");
var import_overlays = require("@react-aria/overlays");
var import_aria_utils = require("@nextui-org/aria-utils");
var import_utils = require("@react-aria/utils");
var import_use_safe_layout_effect = require("@nextui-org/use-safe-layout-effect");
function useReactAriaPopover(props, state) {
  const {
    triggerRef,
    popoverRef,
    showArrow,
    offset = 7,
    crossOffset = 0,
    scrollRef,
    shouldFlip,
    boundaryElement,
    isDismissable = true,
    shouldCloseOnBlur = true,
    placement: placementProp = "top",
    containerPadding,
    shouldCloseOnInteractOutside,
    isNonModal: isNonModalProp,
    isKeyboardDismissDisabled,
    updatePositionDeps = [],
    ...otherProps
  } = props;
  const isNonModal = isNonModalProp != null ? isNonModalProp : true;
  const { overlayProps, underlayProps } = (0, import_overlays.useOverlay)(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside: shouldCloseOnInteractOutside ? shouldCloseOnInteractOutside : (element) => (0, import_aria_utils.ariaShouldCloseOnInteractOutside)(element, triggerRef, state)
    },
    popoverRef
  );
  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
    updatePosition
  } = (0, import_overlays.useOverlayPosition)({
    ...otherProps,
    shouldFlip,
    crossOffset,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    scrollRef,
    boundaryElement,
    containerPadding,
    placement: (0, import_aria_utils.toReactAriaPlacement)(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: isNonModal ? state.close : () => {
    }
  });
  (0, import_use_safe_layout_effect.useSafeLayoutEffect)(() => {
    if (!updatePositionDeps.length)
      return;
    updatePosition();
  }, updatePositionDeps);
  (0, import_react.useEffect)(() => {
    if (state.isOpen && !isNonModal && popoverRef.current) {
      return (0, import_aria_utils.ariaHideOutside)([popoverRef.current]);
    }
  }, [isNonModal, state.isOpen, popoverRef]);
  return {
    popoverProps: (0, import_utils.mergeProps)(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useReactAriaPopover
});
