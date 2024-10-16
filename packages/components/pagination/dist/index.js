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
  Pagination: () => pagination_default,
  PaginationCursor: () => pagination_cursor_default,
  PaginationItem: () => pagination_item_default,
  PaginationItemType: () => import_use_pagination5.PaginationItemType,
  usePagination: () => usePagination,
  usePaginationItem: () => usePaginationItem
});
module.exports = __toCommonJS(src_exports);

// src/pagination.tsx
var import_react3 = require("react");
var import_i18n2 = require("@react-aria/i18n");
var import_system4 = require("@nextui-org/system");
var import_use_pagination3 = require("@nextui-org/use-pagination");
var import_shared_icons = require("@nextui-org/shared-icons");
var import_shared_utils4 = require("@nextui-org/shared-utils");

// src/use-pagination.ts
var import_shared_utils = require("@nextui-org/shared-utils");
var import_i18n = require("@react-aria/i18n");
var import_use_pagination = require("@nextui-org/use-pagination");
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_use_pagination2 = require("@nextui-org/use-pagination");
var import_scroll_into_view_if_needed = __toESM(require("scroll-into-view-if-needed"));
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var CURSOR_TRANSITION_TIMEOUT = 300;
function usePagination(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.pagination.variantKeys);
  const {
    as,
    ref,
    classNames,
    dotsJump = 5,
    loop = false,
    showControls = false,
    total = 1,
    initialPage = 1,
    page,
    siblings,
    boundaries,
    onChange,
    className,
    renderItem,
    getItemAriaLabel: getItemAriaLabelProp,
    ...otherProps
  } = props;
  const Component = as || "nav";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const cursorRef = (0, import_react.useRef)(null);
  const itemsRef = (0, import_react.useRef)();
  const cursorTimer = (0, import_react.useRef)();
  const { direction } = (0, import_i18n.useLocale)();
  const isRTL = direction === "rtl";
  const disableAnimation = (_b = (_a = originalProps == null ? void 0 : originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const disableCursorAnimation = (_d = (_c = originalProps == null ? void 0 : originalProps.disableCursorAnimation) != null ? _c : disableAnimation) != null ? _d : false;
  function getItemsRefMap() {
    if (!itemsRef.current) {
      itemsRef.current = /* @__PURE__ */ new Map();
    }
    return itemsRef.current;
  }
  function getItemRef(node, value) {
    const map = getItemsRefMap();
    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }
  function scrollTo(value, skipAnimation) {
    const map = getItemsRefMap();
    const node = map.get(value);
    if (!node || !cursorRef.current)
      return;
    cursorTimer.current && clearTimeout(cursorTimer.current);
    (0, import_scroll_into_view_if_needed.default)(node, {
      scrollMode: "always",
      behavior: "smooth",
      block: "start",
      inline: "start",
      boundary: domRef.current
    });
    const { offsetLeft } = node;
    if (skipAnimation) {
      cursorRef.current.setAttribute("data-moving", "false");
      cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1)`;
      return;
    }
    cursorRef.current.setAttribute("data-moving", "true");
    cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1.1)`;
    cursorTimer.current = setTimeout(() => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translateX(${offsetLeft}px) scale(1)`;
      }
      cursorTimer.current = setTimeout(() => {
        var _a2;
        (_a2 = cursorRef.current) == null ? void 0 : _a2.setAttribute("data-moving", "false");
        cursorTimer.current && clearTimeout(cursorTimer.current);
      }, CURSOR_TRANSITION_TIMEOUT);
    }, CURSOR_TRANSITION_TIMEOUT);
  }
  const { range, activePage, setPage, previous, next, first, last } = (0, import_use_pagination2.usePagination)({
    page,
    total,
    initialPage,
    siblings,
    boundaries,
    showControls,
    onChange
  });
  const activePageRef = (0, import_react.useRef)(activePage);
  (0, import_react.useEffect)(() => {
    if (activePage && !disableAnimation) {
      scrollTo(activePage, activePage === activePageRef.current);
    }
    activePageRef.current = activePage;
  }, [
    activePage,
    disableAnimation,
    disableCursorAnimation,
    originalProps.dotsJump,
    originalProps.isCompact,
    originalProps.showControls
  ]);
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.pagination)({
      ...variantProps,
      disableAnimation,
      disableCursorAnimation
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableCursorAnimation, disableAnimation]
  );
  const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
  const onNext = () => {
    if (loop && activePage === (isRTL ? 1 : total)) {
      return first();
    }
    return next();
  };
  const onPrevious = () => {
    if (loop && activePage === (isRTL ? total : 1)) {
      return last();
    }
    return previous();
  };
  const getBaseProps = (props2 = {}) => {
    return {
      ...props2,
      ref: domRef,
      role: "navigation",
      "aria-label": props2["aria-label"] || "pagination navigation",
      "data-slot": "base",
      "data-controls": (0, import_shared_utils2.dataAttr)(showControls),
      "data-loop": (0, import_shared_utils2.dataAttr)(loop),
      "data-dots-jump": dotsJump,
      "data-total": total,
      "data-active-page": activePage,
      className: slots.base({ class: (0, import_shared_utils2.clsx)(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...otherProps
    };
  };
  const getWrapperProps = (props2 = {}) => {
    return {
      ...props2,
      "data-slot": "wrapper",
      className: slots.wrapper({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.wrapper, props2 == null ? void 0 : props2.className) })
    };
  };
  const getItemAriaLabel = (page2) => {
    if (!page2)
      return;
    if (getItemAriaLabelProp) {
      return getItemAriaLabelProp(page2);
    }
    switch (page2) {
      case import_use_pagination.PaginationItemType.DOTS:
        return "dots element";
      case import_use_pagination.PaginationItemType.PREV:
        return "previous page button";
      case import_use_pagination.PaginationItemType.NEXT:
        return "next page button";
      case "first":
        return "first page button";
      case "last":
        return "last page button";
      default:
        return `pagination item ${page2}`;
    }
  };
  const getItemProps = (props2 = {}) => {
    return {
      ...props2,
      ref: (node) => getItemRef(node, props2.value),
      "data-slot": "item",
      isActive: props2.value === activePage,
      className: slots.item({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.item, props2 == null ? void 0 : props2.className) }),
      onPress: () => {
        if (props2.value !== activePage) {
          setPage(props2.value);
        }
      }
    };
  };
  const getCursorProps = (props2 = {}) => {
    return {
      ...props2,
      ref: cursorRef,
      activePage,
      "data-slot": "cursor",
      className: slots.cursor({ class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.cursor, props2 == null ? void 0 : props2.className) })
    };
  };
  return {
    Component,
    showControls,
    dotsJump,
    slots,
    classNames,
    loop,
    total,
    range,
    activePage,
    getItemRef,
    disableAnimation,
    disableCursorAnimation,
    setPage,
    onPrevious,
    onNext,
    renderItem,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps,
    getItemAriaLabel
  };
}

// src/pagination-item.tsx
var import_system2 = require("@nextui-org/system");

// src/use-pagination-item.ts
var import_react2 = require("react");
var import_shared_utils3 = require("@nextui-org/shared-utils");
var import_utils = require("@react-aria/utils");
var import_react_utils2 = require("@nextui-org/react-utils");
var import_interactions = require("@react-aria/interactions");
var import_focus = require("@react-aria/focus");
function usePaginationItem(props) {
  const {
    as,
    ref,
    value,
    children,
    isActive,
    isDisabled,
    onPress,
    onClick,
    getAriaLabel,
    className,
    ...otherProps
  } = props;
  const isLink = !!(props == null ? void 0 : props.href);
  const Component = as || isLink ? "a" : "li";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = (0, import_react_utils2.useDOMRef)(ref);
  const router = (0, import_utils.useRouter)();
  const ariaLabel = (0, import_react2.useMemo)(
    () => isActive ? `${getAriaLabel == null ? void 0 : getAriaLabel(value)} active` : getAriaLabel == null ? void 0 : getAriaLabel(value),
    [value, isActive]
  );
  const { isPressed, pressProps } = (0, import_interactions.usePress)({
    isDisabled,
    onPress
  });
  const { focusProps, isFocused, isFocusVisible } = (0, import_focus.useFocusRing)({});
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled });
  const getItemProps = (props2 = {}) => {
    return {
      ref: domRef,
      role: "button",
      tabIndex: isDisabled ? -1 : 0,
      "aria-label": ariaLabel,
      "aria-current": (0, import_shared_utils3.dataAttr)(isActive),
      "aria-disabled": (0, import_shared_utils3.dataAttr)(isDisabled),
      "data-disabled": (0, import_shared_utils3.dataAttr)(isDisabled),
      "data-active": (0, import_shared_utils3.dataAttr)(isActive),
      "data-focus": (0, import_shared_utils3.dataAttr)(isFocused),
      "data-hover": (0, import_shared_utils3.dataAttr)(isHovered),
      "data-pressed": (0, import_shared_utils3.dataAttr)(isPressed),
      "data-focus-visible": (0, import_shared_utils3.dataAttr)(isFocusVisible),
      ...(0, import_utils.mergeProps)(
        props2,
        pressProps,
        focusProps,
        hoverProps,
        (0, import_react_utils2.filterDOMProps)(otherProps, {
          enabled: shouldFilterDOMProps
        })
      ),
      className: (0, import_shared_utils3.clsx)(className, props2.className),
      onClick: (e) => {
        (0, import_utils.chain)(pressProps == null ? void 0 : pressProps.onClick, onClick)(e);
        if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && !e.isDefaultPrevented() && (0, import_utils.shouldClientNavigate)(e.currentTarget, e) && props2.href) {
          e.preventDefault();
          router.open(e.currentTarget, e, props2.href, props2.routerOptions);
        }
      }
    };
  };
  return {
    Component,
    children,
    ariaLabel,
    isFocused,
    isFocusVisible,
    getItemProps
  };
}

// src/pagination-item.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PaginationItem = (0, import_system2.forwardRef)((props, ref) => {
  const { Component, children, getItemProps } = usePaginationItem({ ...props, ref });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...getItemProps(), children });
});
PaginationItem.displayName = "NextUI.PaginationItem";
var pagination_item_default = PaginationItem;

// src/pagination-cursor.tsx
var import_system3 = require("@nextui-org/system");
var import_react_utils3 = require("@nextui-org/react-utils");
var import_jsx_runtime2 = require("react/jsx-runtime");
var PaginationCursor = (0, import_system3.forwardRef)((props, ref) => {
  const { as, activePage, ...otherProps } = props;
  const Component = as || "span";
  const domRef = (0, import_react_utils3.useDOMRef)(ref);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { ref: domRef, "aria-hidden": true, ...otherProps, children: activePage });
});
PaginationCursor.displayName = "NextUI.PaginationCursor";
var pagination_cursor_default = PaginationCursor;

// src/pagination.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var import_react4 = require("react");
var Pagination = (0, import_system4.forwardRef)((props, ref) => {
  const {
    Component,
    dotsJump,
    slots,
    classNames,
    total,
    range,
    loop,
    activePage,
    disableCursorAnimation,
    disableAnimation,
    renderItem: renderItemProp,
    onNext,
    onPrevious,
    setPage,
    getItemAriaLabel,
    getItemRef,
    getBaseProps,
    getWrapperProps,
    getItemProps,
    getCursorProps
  } = usePagination({ ...props, ref });
  const { direction } = (0, import_i18n2.useLocale)();
  const isRTL = direction === "rtl";
  const renderItem = (0, import_react3.useCallback)(
    (value, index) => {
      const isBefore = index < range.indexOf(activePage);
      if (renderItemProp && typeof renderItemProp === "function") {
        let page = typeof value == "number" ? value : index;
        if (value === import_use_pagination3.PaginationItemType.NEXT) {
          page = activePage + 1;
        }
        if (value === import_use_pagination3.PaginationItemType.PREV) {
          page = activePage - 1;
        }
        if (value === import_use_pagination3.PaginationItemType.DOTS) {
          page = isBefore ? activePage - dotsJump >= 1 ? activePage - dotsJump : 1 : activePage + dotsJump <= total ? activePage + dotsJump : total;
        }
        const itemChildren = {
          [import_use_pagination3.PaginationItemType.PREV]: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_shared_icons.ChevronIcon, {}),
          [import_use_pagination3.PaginationItemType.NEXT]: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            import_shared_icons.ChevronIcon,
            {
              className: slots.chevronNext({
                class: classNames == null ? void 0 : classNames.chevronNext
              })
            }
          ),
          [import_use_pagination3.PaginationItemType.DOTS]: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_shared_icons.EllipsisIcon, { className: slots == null ? void 0 : slots.ellipsis({ class: classNames == null ? void 0 : classNames.ellipsis }) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_shared_icons.ForwardIcon,
              {
                className: slots == null ? void 0 : slots.forwardIcon({ class: classNames == null ? void 0 : classNames.forwardIcon }),
                "data-before": (0, import_shared_utils4.dataAttr)(isBefore)
              }
            )
          ] })
        };
        return renderItemProp({
          value,
          index,
          key: `${value}-${index}`,
          page,
          total,
          children: typeof value === "number" ? value : itemChildren[value],
          activePage,
          dotsJump,
          isBefore,
          isActive: value === activePage,
          isPrevious: value === activePage - 1,
          isNext: value === activePage + 1,
          isFirst: value === 1,
          isLast: value === total,
          onNext,
          onPrevious,
          setPage,
          onPress: () => setPage(page),
          ref: typeof value === "number" ? (node) => getItemRef(node, value) : void 0,
          className: slots.item({ class: classNames == null ? void 0 : classNames.item }),
          getAriaLabel: getItemAriaLabel
        });
      }
      if (value === import_use_pagination3.PaginationItemType.PREV) {
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          pagination_item_default,
          {
            className: slots.prev({
              class: classNames == null ? void 0 : classNames.prev
            }),
            "data-slot": "prev",
            getAriaLabel: getItemAriaLabel,
            isDisabled: !loop && activePage === (isRTL ? total : 1),
            value,
            onPress: onPrevious,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_shared_icons.ChevronIcon, {})
          },
          import_use_pagination3.PaginationItemType.PREV
        );
      }
      if (value === import_use_pagination3.PaginationItemType.NEXT) {
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          pagination_item_default,
          {
            className: slots.next({
              class: (0, import_shared_utils4.clsx)(classNames == null ? void 0 : classNames.next)
            }),
            "data-slot": "next",
            getAriaLabel: getItemAriaLabel,
            isDisabled: !loop && activePage === (isRTL ? 1 : total),
            value,
            onPress: onNext,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_shared_icons.ChevronIcon,
              {
                className: slots.chevronNext({
                  class: classNames == null ? void 0 : classNames.chevronNext
                })
              }
            )
          },
          import_use_pagination3.PaginationItemType.NEXT
        );
      }
      if (value === import_use_pagination3.PaginationItemType.DOTS) {
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          pagination_item_default,
          {
            className: slots.item({
              class: (0, import_shared_utils4.clsx)(classNames == null ? void 0 : classNames.item, "group")
            }),
            "data-slot": "item",
            getAriaLabel: getItemAriaLabel,
            value,
            onPress: () => isBefore ? setPage(activePage - dotsJump >= 1 ? activePage - dotsJump : 1) : setPage(activePage + dotsJump <= total ? activePage + dotsJump : total),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_shared_icons.EllipsisIcon, { className: slots == null ? void 0 : slots.ellipsis({ class: classNames == null ? void 0 : classNames.ellipsis }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                import_shared_icons.ForwardIcon,
                {
                  className: slots == null ? void 0 : slots.forwardIcon({ class: classNames == null ? void 0 : classNames.forwardIcon }),
                  "data-before": (0, import_shared_utils4.dataAttr)(isRTL ? !isBefore : isBefore)
                }
              )
            ]
          },
          import_use_pagination3.PaginationItemType.DOTS + isBefore
        );
      }
      return /* @__PURE__ */ (0, import_react4.createElement)(pagination_item_default, { ...getItemProps({ value }), key: value, getAriaLabel: getItemAriaLabel }, value);
    },
    [
      isRTL,
      activePage,
      dotsJump,
      getItemProps,
      loop,
      range,
      renderItemProp,
      slots,
      classNames,
      total
    ]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component, { ...getBaseProps(), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("ul", { ...getWrapperProps(), children: [
    !disableCursorAnimation && !disableAnimation && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(pagination_cursor_default, { ...getCursorProps() }),
    range.map(renderItem)
  ] }) });
});
Pagination.displayName = "NextUI.Pagination";
var pagination_default = Pagination;

// src/index.ts
var import_use_pagination5 = require("@nextui-org/use-pagination");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pagination,
  PaginationCursor,
  PaginationItem,
  PaginationItemType,
  usePagination,
  usePaginationItem
});
