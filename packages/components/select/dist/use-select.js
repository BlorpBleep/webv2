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

// src/use-select.ts
var use_select_exports = {};
__export(use_select_exports, {
  selectData: () => selectData,
  useSelect: () => useSelect
});
module.exports = __toCommonJS(use_select_exports);
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_react = require("react");
var import_use_aria_button = require("@nextui-org/use-aria-button");
var import_focus = require("@react-aria/focus");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_interactions = require("@react-aria/interactions");
var import_use_aria_multiselect = require("@nextui-org/use-aria-multiselect");
var import_use_safe_layout_effect = require("@nextui-org/use-safe-layout-effect");
var import_aria_utils = require("@nextui-org/aria-utils");
var selectData = /* @__PURE__ */ new WeakMap();
function useSelect(originalProps) {
  var _a, _b, _c, _d, _e;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.select.variantKeys);
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const {
    ref,
    as,
    label,
    name,
    isLoading,
    selectorIcon,
    isOpen,
    defaultOpen,
    onOpenChange,
    startContent,
    endContent,
    description,
    renderValue,
    onSelectionChange,
    placeholder,
    children,
    disallowEmptySelection = false,
    selectionMode = "single",
    spinnerRef,
    scrollRef: scrollRefProp,
    popoverProps = {},
    scrollShadowProps = {},
    listboxProps = {},
    spinnerProps = {},
    validationState,
    onChange,
    onClose,
    className,
    classNames,
    ...otherProps
  } = props;
  const scrollShadowRef = (0, import_react_utils.useDOMRef)(scrollRefProp);
  const slotsProps = {
    popoverProps: (0, import_utils.mergeProps)(
      {
        placement: "bottom",
        triggerScaleOnOpen: false,
        offset: 5,
        disableAnimation
      },
      popoverProps
    ),
    scrollShadowProps: (0, import_utils.mergeProps)(
      {
        ref: scrollShadowRef,
        isEnabled: (_c = originalProps.showScrollIndicators) != null ? _c : true,
        hideScrollBar: true,
        offset: 15
      },
      scrollShadowProps
    ),
    listboxProps: (0, import_utils.mergeProps)(
      {
        disableAnimation
      },
      listboxProps
    )
  };
  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const triggerRef = (0, import_react.useRef)(null);
  const listBoxRef = (0, import_react.useRef)(null);
  const popoverRef = (0, import_react.useRef)(null);
  let state = (0, import_use_aria_multiselect.useMultiSelectState)({
    ...props,
    isOpen,
    selectionMode,
    disallowEmptySelection,
    children,
    isRequired: originalProps.isRequired,
    isDisabled: originalProps.isDisabled,
    defaultOpen,
    onOpenChange: (open) => {
      onOpenChange == null ? void 0 : onOpenChange(open);
      if (!open) {
        onClose == null ? void 0 : onClose();
      }
    },
    onSelectionChange: (keys) => {
      onSelectionChange == null ? void 0 : onSelectionChange(keys);
      if (onChange && typeof onChange === "function" && domRef.current) {
        const event = {
          target: {
            ...domRef.current,
            value: Array.from(keys).join(","),
            name: domRef.current.name
          }
        };
        onChange(event);
      }
    }
  });
  state = {
    ...state,
    ...originalProps.isDisabled && {
      disabledKeys: /* @__PURE__ */ new Set([...state.collection.getKeys()])
    }
  };
  (0, import_use_safe_layout_effect.useSafeLayoutEffect)(() => {
    var _a2;
    if (!((_a2 = domRef.current) == null ? void 0 : _a2.value))
      return;
    state.setSelectedKeys(/* @__PURE__ */ new Set([...state.selectedKeys, domRef.current.value]));
  }, [domRef.current]);
  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    descriptionProps,
    errorMessageProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails
  } = (0, import_use_aria_multiselect.useMultiSelect)(
    { ...props, disallowEmptySelection, isDisabled: originalProps.isDisabled },
    state,
    triggerRef
  );
  const isInvalid = originalProps.isInvalid || validationState === "invalid" || isAriaInvalid;
  const { isPressed, buttonProps } = (0, import_use_aria_button.useAriaButton)(triggerProps, triggerRef);
  const { focusProps, isFocused, isFocusVisible } = (0, import_focus.useFocusRing)();
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled: originalProps.isDisabled });
  const labelPlacement = (0, import_react.useMemo)(() => {
    var _a2;
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !label) {
      return "outside";
    }
    return (_a2 = originalProps.labelPlacement) != null ? _a2 : "inside";
  }, [originalProps.labelPlacement, label]);
  const hasPlaceholder = !!placeholder;
  const shouldLabelBeOutside = labelPlacement === "outside-left" || labelPlacement === "outside" && (hasPlaceholder || !!originalProps.isMultiline);
  const shouldLabelBeInside = labelPlacement === "inside";
  const isOutsideLeft = labelPlacement === "outside-left";
  const isFilled = state.isOpen || hasPlaceholder || !!((_d = state.selectedItems) == null ? void 0 : _d.length) || !!startContent || !!endContent || !!originalProps.isMultiline;
  const hasValue = !!((_e = state.selectedItems) == null ? void 0 : _e.length);
  const hasLabel = !!label;
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.select)({
      ...variantProps,
      isInvalid,
      labelPlacement,
      disableAnimation,
      className
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), isInvalid, labelPlacement, disableAnimation, className]
  );
  (0, import_react.useEffect)(() => {
    if (state.isOpen && popoverRef.current && listBoxRef.current) {
      let selectedItem = listBoxRef.current.querySelector("[aria-selected=true] [data-label=true]");
      let scrollShadow = scrollShadowRef.current;
      if (selectedItem && scrollShadow && selectedItem.parentElement) {
        let scrollShadowRect = scrollShadow == null ? void 0 : scrollShadow.getBoundingClientRect();
        let scrollShadowHeight = scrollShadowRect.height;
        scrollShadow.scrollTop = selectedItem.parentElement.offsetTop - scrollShadowHeight / 2 + selectedItem.parentElement.clientHeight / 2;
      }
    }
  }, [state.isOpen, disableAnimation]);
  const errorMessage = typeof props.errorMessage === "function" ? props.errorMessage({ isInvalid, validationErrors, validationDetails }) : props.errorMessage || (validationErrors == null ? void 0 : validationErrors.join(" "));
  const hasHelper = !!description || !!errorMessage;
  (0, import_react.useEffect)(() => {
    if (state.isOpen && popoverRef.current && triggerRef.current) {
      let selectRect = triggerRef.current.getBoundingClientRect();
      let popover = popoverRef.current;
      popover.style.width = selectRect.width + "px";
    }
  }, [state.isOpen]);
  const getBaseProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      "data-slot": "base",
      "data-filled": (0, import_shared_utils.dataAttr)(isFilled),
      "data-has-value": (0, import_shared_utils.dataAttr)(hasValue),
      "data-has-label": (0, import_shared_utils.dataAttr)(hasLabel),
      "data-has-helper": (0, import_shared_utils.dataAttr)(hasHelper),
      "data-invalid": (0, import_shared_utils.dataAttr)(isInvalid),
      className: slots.base({
        class: (0, import_shared_utils.clsx)(baseStyles, props2.className)
      }),
      ...props2
    }),
    [slots, hasHelper, hasValue, hasLabel, isFilled, baseStyles]
  );
  const getTriggerProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: triggerRef,
        "data-slot": "trigger",
        "data-open": (0, import_shared_utils.dataAttr)(state.isOpen),
        "data-disabled": (0, import_shared_utils.dataAttr)(originalProps == null ? void 0 : originalProps.isDisabled),
        "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
        "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
        "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
        className: slots.trigger({ class: classNames == null ? void 0 : classNames.trigger }),
        ...(0, import_utils.mergeProps)(
          buttonProps,
          focusProps,
          hoverProps,
          (0, import_react_utils.filterDOMProps)(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          (0, import_react_utils.filterDOMProps)(props2)
        )
      };
    },
    [
      slots,
      triggerRef,
      state.isOpen,
      classNames == null ? void 0 : classNames.trigger,
      originalProps == null ? void 0 : originalProps.isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
      shouldFilterDOMProps
    ]
  );
  const getHiddenSelectProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      state,
      triggerRef,
      selectRef: domRef,
      selectionMode,
      label: originalProps == null ? void 0 : originalProps.label,
      name: originalProps == null ? void 0 : originalProps.name,
      isRequired: originalProps == null ? void 0 : originalProps.isRequired,
      autoComplete: originalProps == null ? void 0 : originalProps.autoComplete,
      isDisabled: originalProps == null ? void 0 : originalProps.isDisabled,
      onChange,
      ...props2
    }),
    [
      state,
      selectionMode,
      originalProps == null ? void 0 : originalProps.label,
      originalProps == null ? void 0 : originalProps.autoComplete,
      originalProps == null ? void 0 : originalProps.name,
      originalProps == null ? void 0 : originalProps.isDisabled,
      triggerRef
    ]
  );
  const getLabelProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      "data-slot": "label",
      className: slots.label({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.label, props2.className)
      }),
      ...labelProps,
      ...props2
    }),
    [slots, classNames == null ? void 0 : classNames.label, labelProps]
  );
  const getValueProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      "data-slot": "value",
      className: slots.value({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.value, props2.className)
      }),
      ...valueProps,
      ...props2
    }),
    [slots, classNames == null ? void 0 : classNames.value, valueProps]
  );
  const getListboxWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => ({
      "data-slot": "listboxWrapper",
      className: slots.listboxWrapper({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.listboxWrapper, props2 == null ? void 0 : props2.className)
      }),
      ...(0, import_utils.mergeProps)(slotsProps.scrollShadowProps, props2)
    }),
    [slots.listboxWrapper, classNames == null ? void 0 : classNames.listboxWrapper, slotsProps.scrollShadowProps]
  );
  const getListboxProps = (props2 = {}) => {
    return {
      state,
      ref: listBoxRef,
      "data-slot": "listbox",
      className: slots.listbox({
        class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.listbox, props2 == null ? void 0 : props2.className)
      }),
      ...(0, import_utils.mergeProps)(slotsProps.listboxProps, props2, menuProps)
    };
  };
  const getPopoverProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      var _a2, _b2;
      const popoverProps2 = (0, import_utils.mergeProps)(slotsProps.popoverProps, props2);
      return {
        state,
        triggerRef,
        ref: popoverRef,
        "data-slot": "popover",
        scrollRef: listBoxRef,
        triggerType: "listbox",
        classNames: {
          content: slots.popoverContent({
            class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.popoverContent, props2.className)
          })
        },
        ...popoverProps2,
        offset: state.selectedItems && state.selectedItems.length > 0 ? state.selectedItems.length * 1e-8 + (((_a2 = slotsProps.popoverProps) == null ? void 0 : _a2.offset) || 0) : (_b2 = slotsProps.popoverProps) == null ? void 0 : _b2.offset,
        shouldCloseOnInteractOutside: (popoverProps2 == null ? void 0 : popoverProps2.shouldCloseOnInteractOutside) ? popoverProps2.shouldCloseOnInteractOutside : (element) => (0, import_aria_utils.ariaShouldCloseOnInteractOutside)(element, domRef, state)
      };
    },
    [
      slots,
      classNames == null ? void 0 : classNames.popoverContent,
      slotsProps.popoverProps,
      triggerRef,
      state,
      state.selectedItems
    ]
  );
  const getSelectorIconProps = (0, import_react.useCallback)(
    () => ({
      "data-slot": "selectorIcon",
      "aria-hidden": (0, import_shared_utils.dataAttr)(true),
      "data-open": (0, import_shared_utils.dataAttr)(state.isOpen),
      className: slots.selectorIcon({ class: classNames == null ? void 0 : classNames.selectorIcon })
    }),
    [slots, classNames == null ? void 0 : classNames.selectorIcon, state.isOpen]
  );
  const getInnerWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "innerWrapper",
        className: slots.innerWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.innerWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.innerWrapper]
  );
  const getHelperWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "helperWrapper",
        className: slots.helperWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.helperWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.helperWrapper]
  );
  const getDescriptionProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        "data-slot": "description",
        className: slots.description({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description]
  );
  const getMainWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "mainWrapper",
        className: slots.mainWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.mainWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.mainWrapper]
  );
  const getErrorMessageProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        "data-slot": "errorMessage",
        className: slots.errorMessage({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, errorMessageProps, classNames == null ? void 0 : classNames.errorMessage]
  );
  const getSpinnerProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "aria-hidden": (0, import_shared_utils.dataAttr)(true),
        "data-slot": "spinner",
        color: "current",
        size: "sm",
        ...spinnerProps,
        ...props2,
        ref: spinnerRef,
        className: slots.spinner({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.spinner, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, spinnerRef, spinnerProps, classNames == null ? void 0 : classNames.spinner]
  );
  selectData.set(state, {
    isDisabled: originalProps == null ? void 0 : originalProps.isDisabled,
    isRequired: originalProps == null ? void 0 : originalProps.isRequired,
    name: originalProps == null ? void 0 : originalProps.name,
    validationBehavior: "native"
  });
  return {
    Component,
    domRef,
    state,
    label,
    name,
    triggerRef,
    isLoading,
    placeholder,
    startContent,
    endContent,
    description,
    selectorIcon,
    hasHelper,
    labelPlacement,
    hasPlaceholder,
    renderValue,
    selectionMode,
    disableAnimation,
    isOutsideLeft,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    isInvalid,
    errorMessage,
    getBaseProps,
    getTriggerProps,
    getLabelProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    getMainWrapperProps,
    getListboxWrapperProps,
    getHiddenSelectProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getSelectorIconProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  selectData,
  useSelect
});
