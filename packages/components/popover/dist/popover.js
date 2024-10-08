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

// src/popover.tsx
var popover_exports = {};
__export(popover_exports, {
  default: () => popover_default
});
module.exports = __toCommonJS(popover_exports);
var import_react4 = require("react");
var import_system2 = require("@nextui-org/system");
var import_overlays4 = require("@react-aria/overlays");
var import_framer_motion = require("framer-motion");

// src/use-popover.ts
var import_react2 = require("react");
var import_react_utils = require("@nextui-org/react-utils");
var import_overlays2 = require("@react-stately/overlays");
var import_focus = require("@react-aria/focus");
var import_overlays3 = require("@react-aria/overlays");
var import_system = require("@nextui-org/system");
var import_aria_utils2 = require("@nextui-org/aria-utils");
var import_theme = require("@nextui-org/theme");
var import_utils2 = require("@react-aria/utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react3 = require("react");

// src/use-aria-popover.ts
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

// src/use-popover.ts
function usePopover(originalProps) {
  var _a, _b, _c;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.popover.variantKeys);
  const {
    as,
    ref,
    children,
    state: stateProp,
    triggerRef: triggerRefProp,
    scrollRef,
    defaultOpen,
    onOpenChange,
    isOpen: isOpenProp,
    isNonModal = true,
    shouldFlip = true,
    containerPadding = 12,
    shouldBlockScroll = false,
    isDismissable = true,
    shouldCloseOnBlur,
    portalContainer,
    updatePositionDeps,
    dialogProps: dialogPropsProp,
    placement: placementProp = "top",
    triggerType = "dialog",
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    boundaryElement,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    motionProps,
    className,
    classNames,
    onClose,
    ...otherProps
  } = props;
  const Component = as || "div";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const domTriggerRef = (0, import_react3.useRef)(null);
  const wasTriggerPressedRef = (0, import_react3.useRef)(false);
  const triggerRef = triggerRefProp || domTriggerRef;
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const innerState = (0, import_overlays2.useOverlayTriggerState)({
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange == null ? void 0 : onOpenChange(isOpen);
      if (!isOpen) {
        onClose == null ? void 0 : onClose();
      }
    }
  });
  const state = stateProp || innerState;
  const {
    popoverProps,
    underlayProps,
    placement: ariaPlacement
  } = useReactAriaPopover(
    {
      triggerRef,
      isNonModal,
      popoverRef: domRef,
      placement: placementProp,
      offset,
      scrollRef,
      isDismissable,
      shouldCloseOnBlur,
      boundaryElement,
      crossOffset,
      shouldFlip,
      containerPadding,
      updatePositionDeps,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside
    },
    state
  );
  const { triggerProps } = (0, import_overlays3.useOverlayTrigger)({ type: triggerType }, state, triggerRef);
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)();
  const slots = (0, import_react3.useMemo)(
    () => (0, import_theme.popover)({
      ...variantProps
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps)]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getPopoverProps = (props2 = {}) => ({
    ref: domRef,
    ...(0, import_utils2.mergeProps)(popoverProps, otherProps, props2),
    style: (0, import_utils2.mergeProps)(popoverProps.style, otherProps.style, props2.style)
  });
  const getDialogProps = (props2 = {}) => ({
    "data-slot": "base",
    "data-open": (0, import_shared_utils.dataAttr)(state.isOpen),
    "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
    "data-arrow": (0, import_shared_utils.dataAttr)(showArrow),
    "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
    "data-placement": (0, import_aria_utils2.getArrowPlacement)(ariaPlacement, placementProp),
    ...(0, import_utils2.mergeProps)(focusProps, dialogPropsProp, props2),
    className: slots.base({ class: (0, import_shared_utils.clsx)(baseStyles) }),
    style: {
      outline: "none"
    }
  });
  const getContentProps = (0, import_react3.useCallback)(
    (props2 = {}) => ({
      "data-slot": "content",
      "data-open": (0, import_shared_utils.dataAttr)(state.isOpen),
      "data-arrow": (0, import_shared_utils.dataAttr)(showArrow),
      "data-placement": (0, import_aria_utils2.getArrowPlacement)(ariaPlacement, placementProp),
      className: slots.content({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.content, props2.className) })
    }),
    [slots, state.isOpen, showArrow, ariaPlacement, placementProp, classNames]
  );
  const placement = (0, import_react3.useMemo)(
    () => (0, import_aria_utils2.getShouldUseAxisPlacement)(ariaPlacement, placementProp) ? ariaPlacement || placementProp : placementProp,
    [ariaPlacement, placementProp]
  );
  const onPress = (0, import_react3.useCallback)(
    (e) => {
      var _a2;
      let pressTimer;
      if (e.pointerType === "touch" && ((originalProps == null ? void 0 : originalProps.backdrop) === "blur" || (originalProps == null ? void 0 : originalProps.backdrop) === "opaque")) {
        pressTimer = setTimeout(() => {
          wasTriggerPressedRef.current = true;
        }, 100);
      } else {
        wasTriggerPressedRef.current = true;
      }
      (_a2 = triggerProps.onPress) == null ? void 0 : _a2.call(triggerProps, e);
      return () => {
        clearTimeout(pressTimer);
      };
    },
    [triggerProps == null ? void 0 : triggerProps.onPress]
  );
  const getTriggerProps = (0, import_react3.useCallback)(
    (props2 = {}, _ref = null) => {
      const { isDisabled, ...otherProps2 } = props2;
      return {
        "data-slot": "trigger",
        "aria-haspopup": "dialog",
        ...(0, import_utils2.mergeProps)(triggerProps, otherProps2),
        onPress,
        isDisabled,
        className: slots.trigger({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.trigger, props2.className),
          isTriggerDisabled: isDisabled
        }),
        ref: (0, import_utils2.mergeRefs)(_ref, triggerRef)
      };
    },
    [state, triggerProps, onPress, triggerRef]
  );
  const getBackdropProps = (0, import_react3.useCallback)(
    (props2 = {}) => ({
      "data-slot": "backdrop",
      className: slots.backdrop({ class: classNames == null ? void 0 : classNames.backdrop }),
      onClick: (e) => {
        if (!wasTriggerPressedRef.current) {
          e.preventDefault();
          return;
        }
        state.close();
        wasTriggerPressedRef.current = false;
      },
      ...underlayProps,
      ...props2
    }),
    [slots, state.isOpen, classNames, underlayProps]
  );
  (0, import_react2.useEffect)(() => {
    if (state.isOpen && (domRef == null ? void 0 : domRef.current)) {
      return (0, import_overlays3.ariaHideOutside)([domRef == null ? void 0 : domRef.current]);
    }
  }, [state.isOpen, domRef]);
  return {
    state,
    Component,
    children,
    classNames,
    showArrow,
    triggerRef,
    placement,
    isNonModal,
    popoverRef: domRef,
    portalContainer,
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    shouldBlockScroll,
    backdrop: (_c = originalProps.backdrop) != null ? _c : "transparent",
    motionProps,
    getBackdropProps,
    getPopoverProps,
    getTriggerProps,
    getDialogProps,
    getContentProps
  };
}

// src/popover-context.ts
var import_react_utils2 = require("@nextui-org/react-utils");
var [PopoverProvider, usePopoverContext] = (0, import_react_utils2.createContext)({
  name: "PopoverContext",
  errorMessage: "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"
});

// src/popover.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Popover = (0, import_system2.forwardRef)((props, ref) => {
  const { children, ...otherProps } = props;
  const context = usePopover({ ...otherProps, ref });
  const [trigger, content] = import_react4.Children.toArray(children);
  const overlay = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_overlays4.Overlay, { portalContainer: context.portalContainer, children: content });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverProvider, { value: context, children: [
    trigger,
    context.disableAnimation && context.isOpen ? overlay : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { children: context.isOpen ? overlay : null })
  ] });
});
Popover.displayName = "NextUI.Popover";
var popover_default = Popover;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
