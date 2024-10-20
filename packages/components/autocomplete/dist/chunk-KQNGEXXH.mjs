"use client";

// src/use-autocomplete.ts
import { mapPropsVariants, useProviderContext } from "@nextui-org/system";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
import { autocomplete } from "@nextui-org/theme";
import { useFilter } from "@react-aria/i18n";
import { useComboBoxState } from "@react-stately/combobox";
import { useDOMRef } from "@nextui-org/react-utils";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { chain, mergeProps } from "@react-aria/utils";
import { useComboBox } from "@react-aria/combobox";
import { ariaShouldCloseOnInteractOutside } from "@nextui-org/aria-utils";
function useAutocomplete(originalProps) {
  var _a, _b, _c, _d, _e;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, autocomplete.variantKeys);
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const isClearable = originalProps.disableClearable !== void 0 ? !originalProps.disableClearable : originalProps.isReadOnly ? false : originalProps.isClearable;
  const {
    ref,
    as,
    label,
    isLoading,
    menuTrigger = "focus",
    filterOptions = {
      sensitivity: "base"
    },
    children,
    selectorIcon,
    clearIcon,
    scrollRef: scrollRefProp,
    defaultFilter,
    endContent,
    allowsEmptyCollection = true,
    shouldCloseOnBlur = true,
    popoverProps = {},
    inputProps: userInputProps = {},
    scrollShadowProps = {},
    listboxProps = {},
    selectorButtonProps = {},
    clearButtonProps = {},
    showScrollIndicators = true,
    allowsCustomValue = false,
    validationBehavior = (_c = globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _c : "aria",
    className,
    classNames,
    errorMessage,
    onOpenChange,
    onClose,
    isReadOnly = false,
    ...otherProps
  } = props;
  const { contains } = useFilter(filterOptions);
  let state = useComboBoxState({
    ...originalProps,
    children,
    menuTrigger,
    validationBehavior,
    shouldCloseOnBlur,
    allowsEmptyCollection,
    defaultFilter: defaultFilter && typeof defaultFilter === "function" ? defaultFilter : contains,
    onOpenChange: (open, menuTrigger2) => {
      onOpenChange == null ? void 0 : onOpenChange(open, menuTrigger2);
      if (!open) {
        onClose == null ? void 0 : onClose();
      }
    }
  });
  state = {
    ...state,
    ...isReadOnly && {
      disabledKeys: /* @__PURE__ */ new Set([...state.collection.getKeys()])
    }
  };
  const buttonRef = useRef(null);
  const inputWrapperRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);
  const inputRef = useDOMRef(ref);
  const scrollShadowRef = useDOMRef(scrollRefProp);
  const {
    buttonProps,
    inputProps,
    listBoxProps,
    isInvalid: isAriaInvalid,
    validationDetails,
    validationErrors
  } = useComboBox(
    {
      validationBehavior,
      ...originalProps,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef
    },
    state
  );
  const isInvalid = originalProps.isInvalid || isAriaInvalid;
  const slotsProps = {
    inputProps: mergeProps(
      {
        label,
        ref: inputRef,
        wrapperRef: inputWrapperRef,
        onClick: () => {
          if (!state.isOpen && !!state.selectedItem) {
            state.open();
          }
        },
        isClearable: false,
        disableAnimation
      },
      userInputProps
    ),
    popoverProps: mergeProps(
      {
        offset: 5,
        placement: "bottom",
        triggerScaleOnOpen: false,
        disableAnimation
      },
      popoverProps
    ),
    scrollShadowProps: mergeProps(
      {
        ref: scrollShadowRef,
        isEnabled: (_d = showScrollIndicators && state.collection.size > 5) != null ? _d : true,
        hideScrollBar: true,
        offset: 15
      },
      scrollShadowProps
    ),
    listboxProps: mergeProps(
      {
        hideEmptyContent: allowsCustomValue,
        emptyContent: "No results found.",
        disableAnimation
      },
      listboxProps
    ),
    selectorButtonProps: mergeProps(
      {
        isLoading,
        size: "sm",
        variant: "light",
        radius: "full",
        color: isInvalid ? "danger" : originalProps == null ? void 0 : originalProps.color,
        isIconOnly: true,
        disableAnimation
      },
      selectorButtonProps
    ),
    clearButtonProps: mergeProps(
      {
        size: "sm",
        variant: "light",
        radius: "full",
        color: isInvalid ? "danger" : originalProps == null ? void 0 : originalProps.color,
        isIconOnly: true,
        disableAnimation
      },
      clearButtonProps
    )
  };
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const isOpen = ((_e = slotsProps.listboxProps) == null ? void 0 : _e.hideEmptyContent) ? state.isOpen && !!state.collection.size : state.isOpen;
  useSafeLayoutEffect(() => {
    if (!inputRef.current)
      return;
    const key = inputRef.current.value;
    const item = state.collection.getItem(key);
    if (item && state.inputValue !== item.textValue) {
      state.setSelectedKey(key);
      state.setInputValue(item.textValue);
    }
  }, [inputRef.current]);
  useEffect(() => {
    if (isOpen) {
      onFocus(true);
      if (popoverRef.current && inputWrapperRef.current) {
        let rect = inputWrapperRef.current.getBoundingClientRect();
        let popover = popoverRef.current;
        popover.style.width = rect.width + "px";
      }
    }
  }, [isOpen]);
  if (inputProps.onKeyDown) {
    const originalOnKeyDown = inputProps.onKeyDown;
    inputProps.onKeyDown = (e) => {
      if ("continuePropagation" in e) {
        e.stopPropagation = () => {
        };
      }
      return originalOnKeyDown(e);
    };
  }
  const Component = as || "div";
  const slots = useMemo(
    () => autocomplete({
      ...variantProps,
      isClearable,
      disableAnimation,
      className
    }),
    [objectToDeps(variantProps), isClearable, disableAnimation, className]
  );
  const onClear = useCallback(() => {
    state.setInputValue("");
    state.setSelectedKey(null);
  }, [state]);
  const onFocus = useCallback(
    (isFocused) => {
      var _a2;
      (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      state.setFocused(isFocused);
    },
    [state, inputRef]
  );
  const getBaseProps = () => ({
    "data-invalid": dataAttr(isInvalid),
    "data-open": dataAttr(state.isOpen),
    className: slots.base({ class: baseStyles })
  });
  const getSelectorButtonProps = () => {
    var _a2;
    return {
      ref: buttonRef,
      ...mergeProps(buttonProps, slotsProps.selectorButtonProps),
      "data-open": dataAttr(state.isOpen),
      className: slots.selectorButton({
        class: clsx(classNames == null ? void 0 : classNames.selectorButton, (_a2 = slotsProps.selectorButtonProps) == null ? void 0 : _a2.className)
      })
    };
  };
  const getClearButtonProps = () => {
    var _a2, _b2;
    return {
      ...mergeProps(buttonProps, slotsProps.clearButtonProps),
      onPressStart: () => {
      },
      onPress: (e) => {
        var _a3, _b3, _c2;
        (_b3 = (_a3 = slotsProps.clearButtonProps) == null ? void 0 : _a3.onPress) == null ? void 0 : _b3.call(_a3, e);
        if (state.selectedItem) {
          onClear();
        } else {
          if (allowsCustomValue) {
            state.setInputValue("");
            state.close();
          }
        }
        (_c2 = inputRef == null ? void 0 : inputRef.current) == null ? void 0 : _c2.focus();
      },
      "data-visible": !!state.selectedItem || ((_a2 = state.inputValue) == null ? void 0 : _a2.length) > 0,
      className: slots.clearButton({
        class: clsx(classNames == null ? void 0 : classNames.clearButton, (_b2 = slotsProps.clearButtonProps) == null ? void 0 : _b2.className)
      })
    };
  };
  const getInputProps = () => ({
    ...otherProps,
    ...inputProps,
    ...slotsProps.inputProps,
    isInvalid,
    validationBehavior,
    errorMessage: typeof errorMessage === "function" ? errorMessage({ isInvalid, validationErrors, validationDetails }) : errorMessage || (validationErrors == null ? void 0 : validationErrors.join(" ")),
    onClick: chain(slotsProps.inputProps.onClick, otherProps.onClick)
  });
  const getListBoxProps = () => ({
    state,
    ref: listBoxRef,
    ...mergeProps(slotsProps.listboxProps, listBoxProps, {
      shouldHighlightOnFocus: true
    })
  });
  const getPopoverProps = (props2 = {}) => {
    var _a2, _b2;
    const popoverProps2 = mergeProps(slotsProps.popoverProps, props2);
    return {
      state,
      ref: popoverRef,
      triggerRef: inputWrapperRef,
      scrollRef: listBoxRef,
      triggerType: "listbox",
      ...popoverProps2,
      classNames: {
        content: slots.popoverContent({
          class: clsx(
            classNames == null ? void 0 : classNames.popoverContent,
            (_b2 = (_a2 = slotsProps.popoverProps) == null ? void 0 : _a2.classNames) == null ? void 0 : _b2["content"],
            props2.className
          )
        })
      },
      shouldCloseOnInteractOutside: (popoverProps2 == null ? void 0 : popoverProps2.shouldCloseOnInteractOutside) ? popoverProps2.shouldCloseOnInteractOutside : (element) => ariaShouldCloseOnInteractOutside(element, inputWrapperRef, state),
      disableDialogFocus: true
    };
  };
  const getEmptyPopoverProps = () => {
    return {
      ref: popoverRef,
      className: "hidden"
    };
  };
  const getListBoxWrapperProps = (props2 = {}) => {
    var _a2;
    return {
      ...mergeProps(slotsProps.scrollShadowProps, props2),
      className: slots.listboxWrapper({
        class: clsx(
          classNames == null ? void 0 : classNames.listboxWrapper,
          (_a2 = slotsProps.scrollShadowProps) == null ? void 0 : _a2.className,
          props2 == null ? void 0 : props2.className
        )
      })
    };
  };
  const getEndContentWrapperProps = (props2 = {}) => ({
    className: slots.endContentWrapper({
      class: clsx(classNames == null ? void 0 : classNames.endContentWrapper, props2 == null ? void 0 : props2.className)
    }),
    onClick: (e) => {
      const inputFocused = inputRef.current === document.activeElement;
      if (!inputFocused && !state.isFocused && e.currentTarget === e.target) {
        onFocus(true);
      }
    }
  });
  return {
    Component,
    inputRef,
    label,
    state,
    slots,
    classNames,
    isLoading,
    clearIcon,
    isOpen,
    endContent,
    isClearable,
    disableAnimation,
    allowsCustomValue,
    selectorIcon,
    getBaseProps,
    getInputProps,
    getListBoxProps,
    getPopoverProps,
    getEmptyPopoverProps,
    getClearButtonProps,
    getSelectorButtonProps,
    getListBoxWrapperProps,
    getEndContentWrapperProps
  };
}

export {
  useAutocomplete
};
