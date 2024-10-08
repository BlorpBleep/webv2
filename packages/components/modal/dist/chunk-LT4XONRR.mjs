"use client";
import {
  scaleInOut
} from "./chunk-T2APNBYK.mjs";
import {
  useModalContext
} from "./chunk-6JNB4JMH.mjs";

// src/modal-content.tsx
import { cloneElement, isValidElement, useMemo, useCallback } from "react";
import { forwardRef } from "@nextui-org/system";
import { DismissButton } from "@react-aria/overlays";
import { TRANSITION_VARIANTS } from "@nextui-org/framer-utils";
import { CloseIcon } from "@nextui-org/shared-icons";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { useDialog } from "@react-aria/dialog";
import { chain, mergeProps } from "@react-aria/utils";
import { jsx, jsxs } from "react/jsx-runtime";
var ModalContent = forwardRef((props, _) => {
  const { as, children, role = "dialog", ...otherProps } = props;
  const {
    Component: DialogComponent,
    domRef,
    slots,
    classNames,
    motionProps,
    backdrop,
    closeButton,
    hideCloseButton,
    disableAnimation,
    getDialogProps,
    getBackdropProps,
    getCloseButtonProps,
    onClose
  } = useModalContext();
  const Component = as || DialogComponent || "div";
  const { dialogProps } = useDialog(
    {
      role
    },
    domRef
  );
  const closeButtonContent = isValidElement(closeButton) ? cloneElement(closeButton, getCloseButtonProps()) : /* @__PURE__ */ jsx("button", { ...getCloseButtonProps(), children: /* @__PURE__ */ jsx(CloseIcon, {}) });
  const onKeyDown = useCallback((e) => {
    if (e.key === "Tab" && e.nativeEvent.isComposing) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);
  const contentProps = getDialogProps(mergeProps(dialogProps, otherProps));
  const content = /* @__PURE__ */ jsxs(Component, { ...contentProps, onKeyDown: chain(contentProps.onKeyDown, onKeyDown), children: [
    /* @__PURE__ */ jsx(DismissButton, { onDismiss: onClose }),
    !hideCloseButton && closeButtonContent,
    typeof children === "function" ? children(onClose) : children,
    /* @__PURE__ */ jsx(DismissButton, { onDismiss: onClose })
  ] });
  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }
    if (disableAnimation) {
      return /* @__PURE__ */ jsx("div", { ...getBackdropProps() });
    }
    return /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(
      m.div,
      {
        animate: "enter",
        exit: "exit",
        initial: "exit",
        variants: TRANSITION_VARIANTS.fade,
        ...getBackdropProps()
      }
    ) });
  }, [backdrop, disableAnimation, getBackdropProps]);
  const contents = disableAnimation ? /* @__PURE__ */ jsx("div", { className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }), "data-slot": "wrapper", children: content }) : /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(
    m.div,
    {
      animate: "enter",
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      "data-slot": "wrapper",
      exit: "exit",
      initial: "exit",
      variants: scaleInOut,
      ...motionProps,
      children: content
    }
  ) });
  return /* @__PURE__ */ jsxs("div", { tabIndex: -1, children: [
    backdropContent,
    contents
  ] });
});
ModalContent.displayName = "NextUI.ModalContent";
var modal_content_default = ModalContent;

export {
  modal_content_default
};
