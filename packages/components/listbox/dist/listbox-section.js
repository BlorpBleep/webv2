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

// src/listbox-section.tsx
var listbox_section_exports = {};
__export(listbox_section_exports, {
  default: () => listbox_section_default
});
module.exports = __toCommonJS(listbox_section_exports);
var import_theme2 = require("@nextui-org/theme");
var import_react3 = require("react");
var import_system3 = require("@nextui-org/system");
var import_utils2 = require("@react-aria/utils");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_divider = require("@nextui-org/divider");
var import_listbox2 = require("@react-aria/listbox");

// src/listbox-item.tsx
var import_react2 = require("react");
var import_system2 = require("@nextui-org/system");

// src/use-listbox-item.ts
var import_react = require("react");
var import_theme = require("@nextui-org/theme");
var import_system = require("@nextui-org/system");
var import_focus = require("@react-aria/focus");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_listbox = require("@react-aria/listbox");
var import_utils = require("@react-aria/utils");
var import_interactions = require("@react-aria/interactions");
var import_use_is_mobile = require("@nextui-org/use-is-mobile");
function useListboxItem(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.listboxItem.variantKeys);
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
  const domRef = (0, import_react.useRef)(null);
  const Component = as || (originalProps.href ? "a" : "li");
  const shouldFilterDOMProps = typeof Component === "string";
  const { rendered, key } = item;
  const isDisabled = state.disabledKeys.has(key) || originalProps.isDisabled;
  const isSelectable = state.selectionManager.selectionMode !== "none";
  const isMobile = (0, import_use_is_mobile.useIsMobile)();
  const { pressProps, isPressed } = (0, import_interactions.usePress)({
    ref: domRef,
    isDisabled,
    onPress
  });
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({
    isDisabled
  });
  const { isFocusVisible, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus
  });
  const { isFocused, isSelected, optionProps, labelProps, descriptionProps } = (0, import_listbox.useOption)(
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
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.listboxItem)({
      ...variantProps,
      isDisabled,
      disableAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), isDisabled, disableAnimation]
  );
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className);
  if (isReadOnly) {
    itemProps = (0, import_shared_utils.removeEvents)(itemProps);
  }
  const isHighlighted = (0, import_react.useMemo)(() => {
    if (shouldHighlightOnFocus && isFocused) {
      return true;
    }
    return isMobile ? isHovered || isPressed : isHovered;
  }, [isHovered, isPressed, isFocused, isMobile, shouldHighlightOnFocus]);
  const getItemProps = (props2 = {}) => ({
    ref: domRef,
    ...(0, import_utils.mergeProps)(
      { onClick },
      itemProps,
      isReadOnly ? {} : (0, import_utils.mergeProps)(focusProps, pressProps),
      hoverProps,
      (0, import_react_utils.filterDOMProps)(otherProps, {
        enabled: shouldFilterDOMProps
      }),
      props2
    ),
    "data-selectable": (0, import_shared_utils.dataAttr)(isSelectable),
    "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
    "data-hover": (0, import_shared_utils.dataAttr)(isHighlighted),
    "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
    "data-selected": (0, import_shared_utils.dataAttr)(isSelected),
    "data-pressed": (0, import_shared_utils.dataAttr)(isPressed),
    "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
    className: slots.base({ class: (0, import_shared_utils.clsx)(baseStyles, props2.className) })
  });
  const getLabelProps = (props2 = {}) => ({
    ...(0, import_utils.mergeProps)(labelProps, props2),
    "data-label": (0, import_shared_utils.dataAttr)(true),
    className: slots.title({ class: classNames == null ? void 0 : classNames.title })
  });
  const getDescriptionProps = (props2 = {}) => ({
    ...(0, import_utils.mergeProps)(descriptionProps, props2),
    className: slots.description({ class: classNames == null ? void 0 : classNames.description })
  });
  const getWrapperProps = (props2 = {}) => ({
    ...(0, import_utils.mergeProps)(props2),
    className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper })
  });
  const getSelectedIconProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "aria-hidden": (0, import_shared_utils.dataAttr)(true),
        "data-disabled": (0, import_shared_utils.dataAttr)(isDisabled),
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

// src/listbox-selected-icon.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function ListboxSelectedIcon(props) {
  const { isSelected, disableAnimation, ...otherProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      "aria-hidden": "true",
      "data-selected": isSelected,
      role: "presentation",
      viewBox: "0 0 17 18",
      ...otherProps,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "polyline",
        {
          fill: "none",
          points: "1 9 7 14 15 4",
          stroke: "currentColor",
          strokeDasharray: 22,
          strokeDashoffset: isSelected ? 44 : 66,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1.5,
          style: !disableAnimation ? {
            transition: "stroke-dashoffset 200ms ease"
          } : {}
        }
      )
    }
  );
}

// src/listbox-item.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ListboxItem = (0, import_system2.forwardRef)((props, _) => {
  const {
    Component,
    rendered,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startContent,
    endContent,
    hideSelectedIcon,
    disableAnimation,
    getItemProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getSelectedIconProps
  } = useListboxItem(props);
  const selectedContent = (0, import_react2.useMemo)(() => {
    const defaultIcon = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ListboxSelectedIcon, { disableAnimation, isSelected });
    if (typeof selectedIcon === "function") {
      return selectedIcon({ icon: defaultIcon, isSelected, isDisabled });
    }
    if (selectedIcon)
      return selectedIcon;
    return defaultIcon;
  }, [selectedIcon, isSelected, isDisabled, disableAnimation]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Component, { ...getItemProps(), children: [
    startContent,
    description ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ...getWrapperProps(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getLabelProps(), children: rendered }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getDescriptionProps(), children: description })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getLabelProps(), children: rendered }),
    isSelectable && !hideSelectedIcon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { ...getSelectedIconProps(), children: selectedContent }),
    endContent
  ] });
});
ListboxItem.displayName = "NextUI.ListboxItem";
var listbox_item_default = ListboxItem;

// src/listbox-section.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ListboxSection = (0, import_system3.forwardRef)(
  ({
    item,
    state,
    as,
    variant,
    color,
    disableAnimation,
    className,
    classNames,
    hideSelectedIcon,
    showDivider = false,
    dividerProps = {},
    itemClasses,
    title,
    ...otherProps
  }, _) => {
    const Component = as || "li";
    const slots = (0, import_react3.useMemo)(() => (0, import_theme2.listboxSection)(), []);
    const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
    const dividerStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.divider, dividerProps == null ? void 0 : dividerProps.className);
    const { itemProps, headingProps, groupProps } = (0, import_listbox2.useListBoxSection)({
      heading: item.rendered,
      "aria-label": item["aria-label"]
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      Component,
      {
        "data-slot": "base",
        ...(0, import_utils2.mergeProps)(itemProps, otherProps),
        className: slots.base({ class: baseStyles }),
        children: [
          item.rendered && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "span",
            {
              ...headingProps,
              className: slots.heading({ class: classNames == null ? void 0 : classNames.heading }),
              "data-slot": "heading",
              children: item.rendered
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "ul",
            {
              ...groupProps,
              className: slots.group({ class: classNames == null ? void 0 : classNames.group }),
              "data-has-title": !!item.rendered,
              "data-slot": "group",
              children: [
                [...item.childNodes].map((node) => {
                  const { key: nodeKey, props: nodeProps } = node;
                  let listboxItem2 = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    listbox_item_default,
                    {
                      classNames: itemClasses,
                      color,
                      disableAnimation,
                      hideSelectedIcon,
                      item: node,
                      state,
                      variant,
                      ...nodeProps
                    },
                    nodeKey
                  );
                  if (node.wrapper) {
                    listboxItem2 = node.wrapper(listboxItem2);
                  }
                  return listboxItem2;
                }),
                showDivider && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  import_divider.Divider,
                  {
                    as: "li",
                    className: slots.divider({
                      class: dividerStyles
                    }),
                    ...dividerProps
                  }
                )
              ]
            }
          )
        ]
      },
      item.key
    );
  }
);
ListboxSection.displayName = "NextUI.ListboxSection";
var listbox_section_default = ListboxSection;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
