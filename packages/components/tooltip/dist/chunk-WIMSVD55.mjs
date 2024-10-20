"use client";

// src/use-tooltip.ts
import { useId, useImperativeHandle } from "react";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { mergeProps } from "@react-aria/utils";
import { useTooltip as useReactAriaTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { useOverlayPosition, useOverlay } from "@react-aria/overlays";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { popover } from "@nextui-org/theme";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { mergeRefs } from "@nextui-org/react-utils";
import { createDOMRef } from "@nextui-org/react-utils";
import { useMemo, useRef, useCallback } from "react";
import { toReactAriaPlacement, getArrowPlacement } from "@nextui-org/aria-utils";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
function useTooltip(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, popover.variantKeys);
  const {
    ref,
    as,
    isOpen: isOpenProp,
    content,
    children,
    defaultOpen,
    onOpenChange,
    isDisabled,
    trigger: triggerAction,
    shouldFlip = true,
    containerPadding = 12,
    placement: placementProp = "top",
    delay = 0,
    closeDelay = 500,
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    isDismissable,
    shouldCloseOnBlur = true,
    portalContainer,
    isKeyboardDismissDisabled = false,
    updatePositionDeps = [],
    shouldCloseOnInteractOutside,
    className,
    onClose,
    motionProps,
    classNames,
    ...otherProps
  } = props;
  const Component = as || "div";
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const state = useTooltipTriggerState({
    delay,
    closeDelay,
    isDisabled,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange: (isOpen2) => {
      onOpenChange == null ? void 0 : onOpenChange(isOpen2);
      if (!isOpen2) {
        onClose == null ? void 0 : onClose();
      }
    }
  });
  const triggerRef = useRef(null);
  const overlayRef = useRef(null);
  const tooltipId = useId();
  const isOpen = state.isOpen && !isDisabled;
  useImperativeHandle(
    ref,
    () => createDOMRef(overlayRef)
  );
  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    {
      isDisabled,
      trigger: triggerAction
    },
    state,
    triggerRef
  );
  const { tooltipProps } = useReactAriaTooltip(
    {
      isOpen,
      ...mergeProps(props, triggerTooltipProps)
    },
    state
  );
  const {
    overlayProps: positionProps,
    placement,
    updatePosition
  } = useOverlayPosition({
    isOpen,
    targetRef: triggerRef,
    placement: toReactAriaPlacement(placementProp),
    overlayRef,
    offset: showArrow ? offset + 3 : offset,
    crossOffset,
    shouldFlip,
    containerPadding
  });
  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length)
      return;
    updatePosition();
  }, updatePositionDeps);
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose: state.close,
      isDismissable,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside
    },
    overlayRef
  );
  const slots = useMemo(
    () => {
      var _a2, _b2, _c;
      return popover({
        ...variantProps,
        disableAnimation,
        radius: (_a2 = originalProps == null ? void 0 : originalProps.radius) != null ? _a2 : "md",
        size: (_b2 = originalProps == null ? void 0 : originalProps.size) != null ? _b2 : "md",
        shadow: (_c = originalProps == null ? void 0 : originalProps.shadow) != null ? _c : "sm"
      });
    },
    [
      objectToDeps(variantProps),
      disableAnimation,
      originalProps == null ? void 0 : originalProps.radius,
      originalProps == null ? void 0 : originalProps.size,
      originalProps == null ? void 0 : originalProps.shadow
    ]
  );
  const getTriggerProps = useCallback(
    (props2 = {}, _ref = null) => ({
      ...mergeProps(triggerProps, props2),
      ref: mergeRefs(_ref, triggerRef),
      "aria-describedby": isOpen ? tooltipId : void 0
    }),
    [triggerProps, isOpen, tooltipId, state]
  );
  const getTooltipProps = useCallback(
    () => ({
      ref: overlayRef,
      "data-slot": "base",
      "data-open": dataAttr(isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-disabled": dataAttr(isDisabled),
      "data-placement": getArrowPlacement(placement, placementProp),
      ...mergeProps(tooltipProps, overlayProps, otherProps),
      style: mergeProps(positionProps.style, otherProps.style, props.style),
      className: slots.base({ class: classNames == null ? void 0 : classNames.base }),
      id: tooltipId
    }),
    [
      slots,
      isOpen,
      showArrow,
      isDisabled,
      placement,
      placementProp,
      tooltipProps,
      overlayProps,
      otherProps,
      positionProps,
      props,
      tooltipId
    ]
  );
  const getTooltipContentProps = useCallback(
    () => ({
      "data-slot": "content",
      "data-open": dataAttr(isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-disabled": dataAttr(isDisabled),
      "data-placement": getArrowPlacement(placement, placementProp),
      className: slots.content({ class: clsx(classNames == null ? void 0 : classNames.content, className) })
    }),
    [slots, isOpen, showArrow, isDisabled, placement, placementProp, classNames]
  );
  return {
    Component,
    content,
    children,
    isOpen,
    triggerRef,
    showArrow,
    portalContainer,
    placement: placementProp,
    disableAnimation,
    isDisabled,
    motionProps,
    getTooltipContentProps,
    getTriggerProps,
    getTooltipProps
  };
}

export {
  useTooltip
};
