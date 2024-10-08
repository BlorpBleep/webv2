"use client";

// src/use-listbox-item.ts
import { useMemo, useRef, useCallback } from "react";
import { listboxItem } from "@nextui-org/theme";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { useFocusRing } from "@react-aria/focus";
import { filterDOMProps } from "@nextui-org/react-utils";
import { clsx, dataAttr, objectToDeps, removeEvents } from "@nextui-org/shared-utils";
import { useOption } from "@react-aria/listbox";
import { mergeProps } from "@react-aria/utils";
import { useHover, usePress } from "@react-aria/interactions";
import { useIsMobile } from "@nextui-org/use-is-mobile";
function useListboxItem(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, listboxItem.variantKeys);
  const {
    as,
    item,
    state,
    description,
    startContent,
    endContent,
    isVirtualized,
    selectedIcon,
    className,
    classNames,
    autoFocus,
    onPress,
    onClick,
    shouldHighlightOnFocus,
    hideSelectedIcon = false,
    isReadOnly = false,
    ...otherProps
  } = props;
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const domRef = useRef(null);
  const Component = as || (originalProps.href ? "a" : "li");
  const shouldFilterDOMProps = typeof Component === "string";
  const { rendered, key } = item;
  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";
  const isMobile = useIsMobile();
  const { pressProps, isPressed } = usePress({
    ref: domRef,
    isDisabled,
    onPress
  });
  const { isHovered, hoverProps } = useHover({
    isDisabled
  });
  const { isFocusVisible, focusProps } = useFocusRing({
    autoFocus
  });
  const { isFocused, isSelected, optionProps, labelProps, descriptionProps } = useOption(
    {
      key,
      isDisabled,
      "aria-label": props["aria-label"],
      isVirtualized
    },
    state,
    domRef
  );
  let itemProps = optionProps;
  const slots = useMemo(
    () => listboxItem({
      ...variantProps,
      isDisabled,
      disableAnimation
    }),
    [objectToDeps(variantProps), isDisabled, disableAnimation]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  if (isReadOnly) {
    itemProps = removeEvents(itemProps);
  }
  const isHighlighted = useMemo(() => {
    if (shouldHighlightOnFocus && isFocused) {
      return true;
    }
    return isMobile ? isHovered || isPressed : isHovered;
  }, [isHovered, isPressed, isFocused, isMobile, shouldHighlightOnFocus]);
  const getItemProps = (props2 = {}) => ({
    ref: domRef,
    ...mergeProps(
      { onClick },
      itemProps,
      isReadOnly ? {} : mergeProps(focusProps, pressProps),
      hoverProps,
      filterDOMProps(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      props2
    ),
    "data-selectable": dataAttr(isSelectable),
    "data-focus": dataAttr(isFocused),
    "data-hover": dataAttr(isHighlighted),
    "data-disabled": dataAttr(isDisabled),
    "data-selected": dataAttr(isSelected),
    "data-pressed": dataAttr(isPressed),
    "data-focus-visible": dataAttr(isFocusVisible),
    className: slots.base({ class: clsx(baseStyles, props2.className) })
  });
  const getLabelProps = (props2 = {}) => ({
    ...mergeProps(labelProps, props2),
    "data-label": dataAttr(true),
    className: slots.title({ class: classNames == null ? void 0 : classNames.title })
  });
  const getDescriptionProps = (props2 = {}) => ({
    ...mergeProps(descriptionProps, props2),
    className: slots.description({ class: classNames == null ? void 0 : classNames.description })
  });
  const getWrapperProps = (props2 = {}) => ({
    ...mergeProps(props2),
    className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper })
  });
  const getSelectedIconProps = useCallback(
    (props2 = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-disabled": dataAttr(isDisabled),
        className: slots.selectedIcon({ class: classNames == null ? void 0 : classNames.selectedIcon }),
        ...props2
      };
    },
    [isDisabled, slots, classNames]
  );
  return {
    Component,
    domRef,
    slots,
    classNames,
    isSelectable,
    isSelected,
    isDisabled,
    rendered,
    description,
    startContent,
    endContent,
    selectedIcon,
    hideSelectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getSelectedIconProps
  };
}

export {
  useListboxItem
};
