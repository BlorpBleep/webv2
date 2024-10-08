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

// src/accordion.tsx
var accordion_exports = {};
__export(accordion_exports, {
  default: () => accordion_default
});
module.exports = __toCommonJS(accordion_exports);
var import_system4 = require("@nextui-org/system");
var import_framer_motion2 = require("framer-motion");
var import_divider = require("@nextui-org/divider");
var import_react5 = require("react");

// src/use-accordion.ts
var import_system = require("@nextui-org/system");
var import_react_utils = require("@nextui-org/react-utils");
var import_react = __toESM(require("react"));
var import_tree = require("@react-stately/tree");
var import_utils = require("@react-aria/utils");
var import_theme = require("@nextui-org/theme");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_react2 = require("react");
var import_use_aria_accordion = require("@nextui-org/use-aria-accordion");
function useAccordion(props) {
  var _a;
  const globalContext = (0, import_system.useProviderContext)();
  const {
    ref,
    as,
    className,
    items,
    variant,
    motionProps,
    expandedKeys,
    disabledKeys,
    selectedKeys,
    children: childrenProp,
    defaultExpandedKeys,
    selectionMode = "single",
    selectionBehavior = "toggle",
    keepContentMounted = false,
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    dividerProps = {},
    isCompact = false,
    isDisabled = false,
    showDivider = true,
    hideIndicator = false,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    disableIndicatorAnimation = false,
    itemClasses,
    ...otherProps
  } = props;
  const [focusedKey, setFocusedKey] = (0, import_react2.useState)(null);
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const classNames = (0, import_react2.useMemo)(
    () => (0, import_theme.accordion)({
      variant,
      className
    }),
    [variant, className]
  );
  const children = (0, import_react2.useMemo)(() => {
    let treeChildren = [];
    import_react.default.Children.map(childrenProp, (child) => {
      var _a2;
      if (import_react.default.isValidElement(child) && typeof ((_a2 = child.props) == null ? void 0 : _a2.children) !== "string") {
        const clonedChild = import_react.default.cloneElement(child, {
          hasChildItems: false
        });
        treeChildren.push(clonedChild);
      } else {
        treeChildren.push(child);
      }
    });
    return treeChildren;
  }, [childrenProp]);
  const commonProps = {
    children,
    items
  };
  const expandableProps = {
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange
  };
  const treeProps = {
    disabledKeys,
    selectedKeys,
    selectionMode,
    selectionBehavior,
    disallowEmptySelection,
    defaultSelectedKeys: defaultSelectedKeys != null ? defaultSelectedKeys : defaultExpandedKeys,
    onSelectionChange,
    ...commonProps,
    ...expandableProps
  };
  const state = (0, import_tree.useTreeState)(treeProps);
  state.selectionManager.setFocusedKey = (key) => {
    setFocusedKey(key);
  };
  const { accordionProps } = (0, import_use_aria_accordion.useReactAriaAccordion)(
    {
      ...commonProps,
      ...expandableProps
    },
    state,
    domRef
  );
  const values = (0, import_react2.useMemo)(
    () => ({
      state,
      focusedKey,
      motionProps,
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      keepContentMounted,
      disableIndicatorAnimation
    }),
    [
      focusedKey,
      isCompact,
      isDisabled,
      hideIndicator,
      selectedKeys,
      disableAnimation,
      keepContentMounted,
      state == null ? void 0 : state.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      state.disabledKeys.size,
      motionProps
    ]
  );
  const getBaseProps = (0, import_react.useCallback)((props2 = {}) => {
    return {
      ref: domRef,
      className: classNames,
      "data-orientation": "vertical",
      ...(0, import_utils.mergeProps)(
        accordionProps,
        (0, import_react_utils.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        props2
      )
    };
  }, []);
  const handleFocusChanged = (0, import_react.useCallback)((isFocused, key) => {
    isFocused && setFocusedKey(key);
  }, []);
  return {
    Component,
    values,
    state,
    focusedKey,
    getBaseProps,
    isSplitted: variant === "splitted",
    classNames,
    showDivider,
    dividerProps,
    disableAnimation,
    handleFocusChanged,
    itemClasses
  };
}

// src/accordion-item.tsx
var import_system3 = require("@nextui-org/system");
var import_react4 = require("react");
var import_shared_icons = require("@nextui-org/shared-icons");
var import_framer_motion = require("framer-motion");
var import_framer_utils = require("@nextui-org/framer-utils");

// src/use-accordion-item.ts
var import_system2 = require("@nextui-org/system");
var import_focus = require("@react-aria/focus");
var import_theme2 = require("@nextui-org/theme");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_use_aria_accordion2 = require("@nextui-org/use-aria-accordion");
var import_react3 = require("react");
var import_utils2 = require("@react-aria/utils");
var import_interactions = require("@react-aria/interactions");
function useAccordionItem(props) {
  var _a, _b;
  const globalContext = (0, import_system2.useProviderContext)();
  const { ref, as, item, onFocusChange } = props;
  const {
    state,
    className,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    motionProps,
    focusedKey,
    variant,
    isCompact = false,
    classNames: classNamesProp = {},
    isDisabled: isDisabledProp = false,
    hideIndicator = false,
    disableAnimation = (_a = globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _a : false,
    keepContentMounted = false,
    disableIndicatorAnimation = false,
    HeadingComponent = as || "h2",
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    onClick,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils3.useDOMRef)(ref);
  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp;
  const isOpen = state.selectionManager.isSelected(item.key);
  const { buttonProps: buttonCompleteProps, regionProps } = (0, import_use_aria_accordion2.useReactAriaAccordionItem)(
    { item, isDisabled },
    { ...state, focusedKey },
    domRef
  );
  const { onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps } = buttonCompleteProps;
  const { isFocused, isFocusVisible, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus: (_b = item.props) == null ? void 0 : _b.autoFocus
  });
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const { pressProps, isPressed } = (0, import_interactions.usePress)({
    ref: domRef,
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp
  });
  const handleFocus = (0, import_react3.useCallback)(() => {
    onFocusChange == null ? void 0 : onFocusChange(true, item.key);
  }, []);
  const handleBlur = (0, import_react3.useCallback)(() => {
    onFocusChange == null ? void 0 : onFocusChange(false, item.key);
  }, []);
  const classNames = (0, import_react3.useMemo)(
    () => ({
      ...classNamesProp
    }),
    [(0, import_shared_utils.objectToDeps)(classNamesProp)]
  );
  const slots = (0, import_react3.useMemo)(
    () => (0, import_theme2.accordionItem)({
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      disableIndicatorAnimation,
      variant
    }),
    [isCompact, isDisabled, hideIndicator, disableAnimation, disableIndicatorAnimation, variant]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const getBaseProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.base({ class: baseStyles }),
        ...(0, import_utils2.mergeProps)(
          (0, import_react_utils3.filterDOMProps)(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          props2
        )
      };
    },
    [baseStyles, shouldFilterDOMProps, otherProps, slots, item.props, isOpen, isDisabled]
  );
  const getButtonProps = (props2 = {}) => {
    var _a2, _b2;
    return {
      ref: domRef,
      "data-open": (0, import_shared_utils.dataAttr)(isOpen),
      "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
      "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
      "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
      "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
      className: slots.trigger({ class: classNames == null ? void 0 : classNames.trigger }),
      onFocus: (0, import_shared_utils.callAllHandlers)(
        handleFocus,
        onFocusButton,
        focusProps.onFocus,
        otherProps.onFocus,
        (_a2 = item.props) == null ? void 0 : _a2.onFocus
      ),
      onBlur: (0, import_shared_utils.callAllHandlers)(
        handleBlur,
        onBlurButton,
        focusProps.onBlur,
        otherProps.onBlur,
        (_b2 = item.props) == null ? void 0 : _b2.onBlur
      ),
      ...(0, import_utils2.mergeProps)(buttonProps, hoverProps, pressProps, props2, {
        onClick: (0, import_utils2.chain)(pressProps.onClick, onClick)
      })
    };
  };
  const getContentProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.content({ class: classNames == null ? void 0 : classNames.content }),
        ...(0, import_utils2.mergeProps)(regionProps, props2)
      };
    },
    [slots, classNames, regionProps, isOpen, isDisabled, classNames == null ? void 0 : classNames.content]
  );
  const getIndicatorProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        "aria-hidden": (0, import_shared_utils.dataAttr)(true),
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.indicator({ class: classNames == null ? void 0 : classNames.indicator }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.indicator, isOpen, isDisabled, classNames == null ? void 0 : classNames.indicator]
  );
  const getHeadingProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.heading({ class: classNames == null ? void 0 : classNames.heading }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.heading, isOpen, isDisabled, classNames == null ? void 0 : classNames.heading]
  );
  const getTitleProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.title({ class: classNames == null ? void 0 : classNames.title }),
        ...props2
      };
    },
    [slots, classNames == null ? void 0 : classNames.title, isOpen, isDisabled, classNames == null ? void 0 : classNames.title]
  );
  const getSubtitleProps = (0, import_react3.useCallback)(
    (props2 = {}) => {
      return {
        "data-open": (0, import_shared_utils.dataAttr)(isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
        className: slots.subtitle({ class: classNames == null ? void 0 : classNames.subtitle }),
        ...props2
      };
    },
    [slots, classNames, isOpen, isDisabled, classNames == null ? void 0 : classNames.subtitle]
  );
  return {
    Component,
    HeadingComponent,
    item,
    slots,
    classNames,
    domRef,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getContentProps,
    getIndicatorProps,
    getTitleProps,
    getSubtitleProps
  };
}

// src/accordion-item.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var AccordionItem = (0, import_system3.forwardRef)((props, ref) => {
  const {
    Component,
    HeadingComponent,
    classNames,
    slots,
    indicator,
    children,
    title,
    subtitle,
    startContent,
    isOpen,
    isDisabled,
    hideIndicator,
    keepContentMounted,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getTitleProps,
    getSubtitleProps,
    getContentProps,
    getIndicatorProps
  } = useAccordionItem({ ...props, ref });
  const willChange = (0, import_framer_motion.useWillChange)();
  const indicatorContent = (0, import_react4.useMemo)(() => {
    if (typeof indicator === "function") {
      return indicator({ indicator: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_shared_icons.ChevronIcon, {}), isOpen, isDisabled });
    }
    if (indicator)
      return indicator;
    return null;
  }, [indicator, isOpen, isDisabled]);
  const indicatorComponent = indicatorContent || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_shared_icons.ChevronIcon, {});
  const content = (0, import_react4.useMemo)(() => {
    if (disableAnimation) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getContentProps(), children });
    }
    const transitionVariants = {
      exit: { ...import_framer_utils.TRANSITION_VARIANTS.collapse.exit, overflowY: "hidden" },
      enter: { ...import_framer_utils.TRANSITION_VARIANTS.collapse.enter, overflowY: "unset" }
    };
    return keepContentMounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.LazyMotion, { features: import_framer_motion.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.m.section,
      {
        animate: isOpen ? "enter" : "exit",
        exit: "exit",
        initial: "exit",
        style: { willChange },
        variants: transitionVariants,
        onKeyDown: (e) => {
          e.stopPropagation();
        },
        ...motionProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getContentProps(), children })
      },
      "accordion-content"
    ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_framer_motion.LazyMotion, { features: import_framer_motion.domAnimation, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_framer_motion.m.section,
      {
        animate: "enter",
        exit: "exit",
        initial: "exit",
        style: { willChange },
        variants: transitionVariants,
        onKeyDown: (e) => {
          e.stopPropagation();
        },
        ...motionProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...getContentProps(), children })
      },
      "accordion-content"
    ) }) });
  }, [isOpen, disableAnimation, keepContentMounted, children, motionProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, { ...getBaseProps(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadingComponent, { ...getHeadingProps(), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { ...getButtonProps(), children: [
      startContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: slots.startContent({ class: classNames == null ? void 0 : classNames.startContent }), children: startContent }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: slots.titleWrapper({ class: classNames == null ? void 0 : classNames.titleWrapper }), children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getTitleProps(), children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getSubtitleProps(), children: subtitle })
      ] }),
      !hideIndicator && indicatorComponent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...getIndicatorProps(), children: indicatorComponent })
    ] }) }),
    content
  ] });
});
AccordionItem.displayName = "NextUI.AccordionItem";
var accordion_item_default = AccordionItem;

// src/accordion.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var AccordionGroup = (0, import_system4.forwardRef)((props, ref) => {
  const {
    Component,
    values,
    state,
    isSplitted,
    showDivider,
    getBaseProps,
    disableAnimation,
    handleFocusChanged: handleFocusChangedProps,
    itemClasses,
    dividerProps
  } = useAccordion({
    ...props,
    ref
  });
  const handleFocusChanged = (0, import_react5.useCallback)(
    (isFocused, key) => handleFocusChangedProps(isFocused, key),
    [handleFocusChangedProps]
  );
  const content = (0, import_react5.useMemo)(() => {
    return [...state.collection].map((item, index) => {
      const classNames = { ...itemClasses, ...item.props.classNames || {} };
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react5.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          accordion_item_default,
          {
            item,
            variant: props.variant,
            onFocusChange: handleFocusChanged,
            ...values,
            ...item.props,
            classNames
          }
        ),
        !item.props.hidden && !isSplitted && showDivider && index < state.collection.size - 1 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_divider.Divider, { ...dividerProps })
      ] }, item.key);
    });
  }, [values, itemClasses, handleFocusChanged, isSplitted, showDivider, state.collection]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { ...getBaseProps(), children: disableAnimation ? content : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_framer_motion2.LayoutGroup, { children: content }) });
});
AccordionGroup.displayName = "NextUI.Accordion";
var accordion_default = AccordionGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
