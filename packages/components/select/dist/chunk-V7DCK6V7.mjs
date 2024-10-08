"use client";

// src/use-select.ts
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { select } from "@nextui-org/theme";
import { useDOMRef, filterDOMProps } from "@nextui-org/react-utils";
import { useMemo, useCallback, useRef, useEffect } from "react";
import { useAriaButton } from "@nextui-org/use-aria-button";
import { useFocusRing } from "@react-aria/focus";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import {
  useMultiSelect,
  useMultiSelectState
} from "@nextui-org/use-aria-multiselect";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
import { ariaShouldCloseOnInteractOutside } from "@nextui-org/aria-utils";
var selectData = /* @__PURE__ */ new WeakMap();
function useSelect(originalProps) {
  var _a, _b, _c, _d, _e;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, select.variantKeys);
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
  const scrollShadowRef = useDOMRef(scrollRefProp);
  const slotsProps = {
    popoverProps: mergeProps(
      {
        placement: "bottom",
        triggerScaleOnOpen: false,
        offset: 5,
        disableAnimation
      },
      popoverProps
    ),
    scrollShadowProps: mergeProps(
      {
        ref: scrollShadowRef,
        isEnabled: (_c = originalProps.showScrollIndicators) != null ? _c : true,
        hideScrollBar: true,
        offset: 15
      },
      scrollShadowProps
    ),
    listboxProps: mergeProps(
      {
        disableAnimation
      },
      listboxProps
    )
  };
  const Component = as || "button";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const triggerRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);
  let state = useMultiSelectState({
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
  useSafeLayoutEffect(() => {
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
  } = useMultiSelect(
    { ...props, disallowEmptySelection, isDisabled: originalProps.isDisabled },
    state,
    triggerRef
  );
  const isInvalid = originalProps.isInvalid || validationState === "invalid" || isAriaInvalid;
  const { isPressed, buttonProps } = useAriaButton(triggerProps, triggerRef);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { isHovered, hoverProps } = useHover({ isDisabled: originalProps.isDisabled });
  const labelPlacement = useMemo(() => {
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
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const slots = useMemo(
    () => select({
      ...variantProps,
      isInvalid,
      labelPlacement,
      disableAnimation,
      className
    }),
    [objectToDeps(variantProps), isInvalid, labelPlacement, disableAnimation, className]
  );
  useEffect(() => {
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
  useEffect(() => {
    if (state.isOpen && popoverRef.current && triggerRef.current) {
      let selectRect = triggerRef.current.getBoundingClientRect();
      let popover = popoverRef.current;
      popover.style.width = selectRect.width + "px";
    }
  }, [state.isOpen]);
  const getBaseProps = useCallback(
    (props2 = {}) => ({
      "data-slot": "base",
      "data-filled": dataAttr(isFilled),
      "data-has-value": dataAttr(hasValue),
      "data-has-label": dataAttr(hasLabel),
      "data-has-helper": dataAttr(hasHelper),
      "data-invalid": dataAttr(isInvalid),
      className: slots.base({
        class: clsx(baseStyles, props2.className)
      }),
      ...props2
    }),
    [slots, hasHelper, hasValue, hasLabel, isFilled, baseStyles]
  );
  const getTriggerProps = useCallback(
    (props2 = {}) => {
      return {
        ref: triggerRef,
        "data-slot": "trigger",
        "data-open": dataAttr(state.isOpen),
        "data-disabled": dataAttr(originalProps == null ? void 0 : originalProps.isDisabled),
        "data-focus": dataAttr(isFocused),
        "data-pressed": dataAttr(isPressed),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-hover": dataAttr(isHovered),
        className: slots.trigger({ class: classNames == null ? void 0 : classNames.trigger }),
        ...mergeProps(
          buttonProps,
          focusProps,
          hoverProps,
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps
          }),
          filterDOMProps(props2)
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
  const getHiddenSelectProps = useCallback(
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
  const getLabelProps = useCallback(
    (props2 = {}) => ({
      "data-slot": "label",
      className: slots.label({
        class: clsx(classNames == null ? void 0 : classNames.label, props2.className)
      }),
      ...labelProps,
      ...props2
    }),
    [slots, classNames == null ? void 0 : classNames.label, labelProps]
  );
  const getValueProps = useCallback(
    (props2 = {}) => ({
      "data-slot": "value",
      className: slots.value({
        class: clsx(classNames == null ? void 0 : classNames.value, props2.className)
      }),
      ...valueProps,
      ...props2
    }),
    [slots, classNames == null ? void 0 : classNames.value, valueProps]
  );
  const getListboxWrapperProps = useCallback(
    (props2 = {}) => ({
      "data-slot": "listboxWrapper",
      className: slots.listboxWrapper({
        class: clsx(classNames == null ? void 0 : classNames.listboxWrapper, props2 == null ? void 0 : props2.className)
      }),
      ...mergeProps(slotsProps.scrollShadowProps, props2)
    }),
    [slots.listboxWrapper, classNames == null ? void 0 : classNames.listboxWrapper, slotsProps.scrollShadowProps]
  );
  const getListboxProps = (props2 = {}) => {
    return {
      state,
      ref: listBoxRef,
      "data-slot": "listbox",
      className: slots.listbox({
        class: clsx(classNames == null ? void 0 : classNames.listbox, props2 == null ? void 0 : props2.className)
      }),
      ...mergeProps(slotsProps.listboxProps, props2, menuProps)
    };
  };
  const getPopoverProps = useCallback(
    (props2 = {}) => {
      var _a2, _b2;
      const popoverProps2 = mergeProps(slotsProps.popoverProps, props2);
      return {
        state,
        triggerRef,
        ref: popoverRef,
        "data-slot": "popover",
        scrollRef: listBoxRef,
        triggerType: "listbox",
        classNames: {
          content: slots.popoverContent({
            class: clsx(classNames == null ? void 0 : classNames.popoverContent, props2.className)
          })
        },
        ...popoverProps2,
        offset: state.selectedItems && state.selectedItems.length > 0 ? state.selectedItems.length * 1e-8 + (((_a2 = slotsProps.popoverProps) == null ? void 0 : _a2.offset) || 0) : (_b2 = slotsProps.popoverProps) == null ? void 0 : _b2.offset,
        shouldCloseOnInteractOutside: (popoverProps2 == null ? void 0 : popoverProps2.shouldCloseOnInteractOutside) ? popoverProps2.shouldCloseOnInteractOutside : (element) => ariaShouldCloseOnInteractOutside(element, domRef, state)
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
  const getSelectorIconProps = useCallback(
    () => ({
      "data-slot": "selectorIcon",
      "aria-hidden": dataAttr(true),
      "data-open": dataAttr(state.isOpen),
      className: slots.selectorIcon({ class: classNames == null ? void 0 : classNames.selectorIcon })
    }),
    [slots, classNames == null ? void 0 : classNames.selectorIcon, state.isOpen]
  );
  const getInnerWrapperProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "innerWrapper",
        className: slots.innerWrapper({
          class: clsx(classNames == null ? void 0 : classNames.innerWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.innerWrapper]
  );
  const getHelperWrapperProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "helperWrapper",
        className: slots.helperWrapper({
          class: clsx(classNames == null ? void 0 : classNames.helperWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.helperWrapper]
  );
  const getDescriptionProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        "data-slot": "description",
        className: slots.description({ class: clsx(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description]
  );
  const getMainWrapperProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "mainWrapper",
        className: slots.mainWrapper({
          class: clsx(classNames == null ? void 0 : classNames.mainWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.mainWrapper]
  );
  const getErrorMessageProps = useCallback(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        "data-slot": "errorMessage",
        className: slots.errorMessage({ class: clsx(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, errorMessageProps, classNames == null ? void 0 : classNames.errorMessage]
  );
  const getSpinnerProps = useCallback(
    (props2 = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-slot": "spinner",
        color: "current",
        size: "sm",
        ...spinnerProps,
        ...props2,
        ref: spinnerRef,
        className: slots.spinner({ class: clsx(classNames == null ? void 0 : classNames.spinner, props2 == null ? void 0 : props2.className) })
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

export {
  selectData,
  useSelect
};
