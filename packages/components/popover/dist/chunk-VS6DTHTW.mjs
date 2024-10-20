"use client";

// src/use-aria-popover.ts
import { useEffect } from "react";
import {
  useOverlay,
  useOverlayPosition
} from "@react-aria/overlays";
import {
  ariaHideOutside,
  toReactAriaPlacement,
  ariaShouldCloseOnInteractOutside
} from "@nextui-org/aria-utils";
import { mergeProps } from "@react-aria/utils";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
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
  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: state.isOpen,
      onClose: state.close,
      shouldCloseOnBlur,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside: shouldCloseOnInteractOutside ? shouldCloseOnInteractOutside : (element) => ariaShouldCloseOnInteractOutside(element, triggerRef, state)
    },
    popoverRef
  );
  const {
    overlayProps: positionProps,
    arrowProps,
    placement,
    updatePosition
  } = useOverlayPosition({
    ...otherProps,
    shouldFlip,
    crossOffset,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    scrollRef,
    boundaryElement,
    containerPadding,
    placement: toReactAriaPlacement(placementProp),
    offset: showArrow ? offset + 3 : offset,
    onClose: isNonModal ? state.close : () => {
    }
  });
  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length)
      return;
    updatePosition();
  }, updatePositionDeps);
  useEffect(() => {
    if (state.isOpen && !isNonModal && popoverRef.current) {
      return ariaHideOutside([popoverRef.current]);
    }
  }, [isNonModal, state.isOpen, popoverRef]);
  return {
    popoverProps: mergeProps(overlayProps, positionProps),
    arrowProps,
    underlayProps,
    placement
  };
}

export {
  useReactAriaPopover
};
