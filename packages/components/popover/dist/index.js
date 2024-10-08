"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  FreeSoloPopover: () => free_solo_popover_default,
  Popover: () => popover_default,
  PopoverContent: () => popover_content_default,
  PopoverProvider: () => PopoverProvider,
  PopoverTrigger: () => popover_trigger_default,
  usePopover: () => usePopover,
  usePopoverContext: () => usePopoverContext
});
module.exports = __toCommonJS(src_exports);

// src/popover.tsx
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

// src/popover-trigger.tsx
var import_react5 = require("react");
var import_system3 = require("@nextui-org/system");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_button = require("@nextui-org/button");
var import_utils3 = require("@react-aria/utils");
var import_jsx_runtime2 = require("react/jsx-runtime");
var PopoverTrigger = (0, import_system3.forwardRef)((props, _) => {
  const { triggerRef, getTriggerProps } = usePopoverContext();
  const { children, ...otherProps } = props;
  const child = (0, import_react5.useMemo)(() => {
    if (typeof children === "string")
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children });
    return import_react5.Children.only(children);
  }, [children]);
  const { onPress, isDisabled, ...restProps } = (0, import_react5.useMemo)(() => {
    return getTriggerProps((0, import_utils3.mergeProps)(otherProps, child.props), child.ref);
  }, [getTriggerProps, child.props, otherProps, child.ref]);
  const [, triggerChildren] = (0, import_react_utils3.pickChildren)(children, import_button.Button);
  const { buttonProps } = (0, import_use_aria_button.useAriaButton)({ onPress, isDisabled }, triggerRef);
  const hasNextUIButton = (0, import_react5.useMemo)(() => {
    return (triggerChildren == null ? void 0 : triggerChildren[0]) !== void 0;
  }, [triggerChildren]);
  return (0, import_react5.cloneElement)(
    child,
    (0, import_utils3.mergeProps)(restProps, hasNextUIButton ? { onPress, isDisabled } : buttonProps)
  );
});
PopoverTrigger.displayName = "NextUI.PopoverTrigger";
var popover_trigger_default = PopoverTrigger;

// src/popover-content.tsx
var import_react6 = require("react");
var import_system4 = require("@nextui-org/system");
var import_overlays5 = require("@react-aria/overlays");
var import_framer_utils = require("@nextui-org/framer-utils");
var import_framer_motion2 = require("framer-motion");
var import_react_remove_scroll = require("react-remove-scroll");
var import_aria_utils3 = require("@nextui-org/aria-utils");
var import_dialog = require("@react-aria/dialog");
var import_jsx_runtime3 = require("react/jsx-runtime");
var PopoverContent = (0, import_system4.forwardRef)((props, _) => {
  const { as, children, className, ...otherProps } = props;
  const {
    Component: OverlayComponent,
    isOpen,
    placement,
    backdrop,
    motionProps,
    disableAnimation,
    shouldBlockScroll,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose
  } = usePopoverContext();
  const dialogRef = (0, import_react6.useRef)(null);
  const { dialogProps: ariaDialogProps, titleProps } = (0, import_dialog.useDialog)({}, dialogRef);
  const dialogProps = getDialogProps({
    ref: dialogRef,
    ...ariaDialogProps,
    ...otherProps
  });
  const Component = as || OverlayComponent || "div";
  const content = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    !isNonModal && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_overlays5.DismissButton, { onDismiss: onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component, { ...dialogProps, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ...getContentProps({ className }), children: typeof children === "function" ? children(titleProps) : children }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_overlays5.DismissButton, { onDismiss: onClose })
  ] });
  const backdropContent = (0, import_react6.useMemo)(() => {
    if (backdrop === "transparent") {
      return null;
    }
    if (disableAnimation) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ...getBackdropProps() });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_framer_motion2.LazyMotion, { features: import_framer_motion2.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_framer_motion2.m.div,
      {
        animate: "enter",
        exit: "exit",
        initial: "exit",
        variants: import_framer_utils.TRANSITION_VARIANTS.fade,
        ...getBackdropProps()
      }
    ) });
  }, [backdrop, disableAnimation, getBackdropProps]);
  const contents = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_remove_scroll.RemoveScroll, { enabled: shouldBlockScroll && isOpen, removeScrollBar: false, children: disableAnimation ? content : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_framer_motion2.LazyMotion, { features: import_framer_motion2.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_framer_motion2.m.div,
    {
      animate: "enter",
      exit: "exit",
      initial: "initial",
      style: {
        ...(0, import_aria_utils3.getTransformOrigins)(placement === "center" ? "top" : placement)
      },
      variants: import_framer_utils.TRANSITION_VARIANTS.scaleSpringOpacity,
      ...motionProps,
      children: content
    }
  ) }) });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...getPopoverProps(), children: [
    backdropContent,
    contents
  ] });
});
PopoverContent.displayName = "NextUI.PopoverContent";
var popover_content_default = PopoverContent;

// src/free-solo-popover.tsx
var React2 = __toESM(require("react"));
var import_overlays6 = require("@react-aria/overlays");
var import_system5 = require("@nextui-org/system");
var import_framer_motion3 = require("framer-motion");
var import_utils4 = require("@react-aria/utils");
var import_aria_utils4 = require("@nextui-org/aria-utils");
var import_framer_utils2 = require("@nextui-org/framer-utils");
var import_dialog2 = require("@react-aria/dialog");
var import_jsx_runtime4 = require("react/jsx-runtime");
var FreeSoloPopoverWrapper = (0, import_system5.forwardRef)(
  ({
    children,
    motionProps,
    placement,
    disableAnimation,
    style: styleProp = {},
    transformOrigin = {},
    ...otherProps
  }, ref) => {
    let style = styleProp;
    if (transformOrigin.originX !== void 0 || transformOrigin.originY !== void 0) {
      style = {
        ...style,
        transformOrigin
      };
    } else {
      style = {
        ...style,
        ...(0, import_aria_utils4.getTransformOrigins)(placement === "center" ? "top" : placement)
      };
    }
    return disableAnimation ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...otherProps, ref, children }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_framer_motion3.LazyMotion, { features: import_framer_motion3.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_framer_motion3.m.div,
      {
        ref,
        animate: "enter",
        exit: "exit",
        initial: "initial",
        style,
        variants: import_framer_utils2.TRANSITION_VARIANTS.scaleSpringOpacity,
        ...(0, import_utils4.mergeProps)(otherProps, motionProps),
        children
      }
    ) });
  }
);
FreeSoloPopoverWrapper.displayName = "NextUI.FreeSoloPopoverWrapper";
var FreeSoloPopover = (0, import_system5.forwardRef)(
  ({ children, transformOrigin, disableDialogFocus = false, ...props }, ref) => {
    const {
      Component,
      state,
      placement,
      backdrop,
      portalContainer,
      disableAnimation,
      motionProps,
      isNonModal,
      getPopoverProps,
      getBackdropProps,
      getDialogProps,
      getContentProps
    } = usePopover({
      ...props,
      ref
    });
    const dialogRef = React2.useRef(null);
    const { dialogProps: ariaDialogProps, titleProps } = (0, import_dialog2.useDialog)({}, dialogRef);
    const dialogProps = getDialogProps({
      ...!disableDialogFocus && { ref: dialogRef },
      ...ariaDialogProps
    });
    const backdropContent = React2.useMemo(() => {
      if (backdrop === "transparent") {
        return null;
      }
      if (disableAnimation) {
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...getBackdropProps() });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_framer_motion3.LazyMotion, { features: import_framer_motion3.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_framer_motion3.m.div,
        {
          animate: "enter",
          exit: "exit",
          initial: "exit",
          variants: import_framer_utils2.TRANSITION_VARIANTS.fade,
          ...getBackdropProps()
        }
      ) });
    }, [backdrop, disableAnimation, getBackdropProps]);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_overlays6.Overlay, { portalContainer, children: [
      !isNonModal && backdropContent,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Component, { ...getPopoverProps(), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        FreeSoloPopoverWrapper,
        {
          disableAnimation,
          motionProps,
          placement,
          tabIndex: -1,
          transformOrigin,
          ...dialogProps,
          children: [
            !isNonModal && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_overlays6.DismissButton, { onDismiss: state.close }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...getContentProps(), children: typeof children === "function" ? children(titleProps) : children }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_overlays6.DismissButton, { onDismiss: state.close })
          ]
        }
      ) })
    ] });
  }
);
FreeSoloPopover.displayName = "NextUI.FreeSoloPopover";
var free_solo_popover_default = FreeSoloPopover;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FreeSoloPopover,
  Popover,
  PopoverContent,
  PopoverProvider,
  PopoverTrigger,
  usePopover,
  usePopoverContext
});
