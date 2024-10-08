"use client";
import {
  pagination_cursor_default
} from "./chunk-SDEB5NXU.mjs";
import {
  pagination_item_default
} from "./chunk-5E6ZQJ3X.mjs";
import {
  usePagination
} from "./chunk-AOWPLK3C.mjs";

// src/pagination.tsx
import { useCallback } from "react";
import { useLocale } from "@react-aria/i18n";
import { forwardRef } from "@nextui-org/system";
import { PaginationItemType } from "@nextui-org/use-pagination";
import { ChevronIcon, EllipsisIcon, ForwardIcon } from "@nextui-org/shared-icons";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createElement } from "react";
var Pagination = forwardRef((props, ref) => {
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
  const { direction } = useLocale();
  const isRTL = direction === "rtl";
  const renderItem = useCallback(
    (value, index) => {
      const isBefore = index < range.indexOf(activePage);
      if (renderItemProp && typeof renderItemProp === "function") {
        let page = typeof value == "number" ? value : index;
        if (value === PaginationItemType.NEXT) {
          page = activePage + 1;
        }
        if (value === PaginationItemType.PREV) {
          page = activePage - 1;
        }
        if (value === PaginationItemType.DOTS) {
          page = isBefore ? activePage - dotsJump >= 1 ? activePage - dotsJump : 1 : activePage + dotsJump <= total ? activePage + dotsJump : total;
        }
        const itemChildren = {
          [PaginationItemType.PREV]: /* @__PURE__ */ jsx(ChevronIcon, {}),
          [PaginationItemType.NEXT]: /* @__PURE__ */ jsx(
            ChevronIcon,
            {
              className: slots.chevronNext({
                class: classNames == null ? void 0 : classNames.chevronNext
              })
            }
          ),
          [PaginationItemType.DOTS]: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(EllipsisIcon, { className: slots == null ? void 0 : slots.ellipsis({ class: classNames == null ? void 0 : classNames.ellipsis }) }),
            /* @__PURE__ */ jsx(
              ForwardIcon,
              {
                className: slots == null ? void 0 : slots.forwardIcon({ class: classNames == null ? void 0 : classNames.forwardIcon }),
                "data-before": dataAttr(isBefore)
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
      if (value === PaginationItemType.PREV) {
        return /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsx(ChevronIcon, {})
          },
          PaginationItemType.PREV
        );
      }
      if (value === PaginationItemType.NEXT) {
        return /* @__PURE__ */ jsx(
          pagination_item_default,
          {
            className: slots.next({
              class: clsx(classNames == null ? void 0 : classNames.next)
            }),
            "data-slot": "next",
            getAriaLabel: getItemAriaLabel,
            isDisabled: !loop && activePage === (isRTL ? 1 : total),
            value,
            onPress: onNext,
            children: /* @__PURE__ */ jsx(
              ChevronIcon,
              {
                className: slots.chevronNext({
                  class: classNames == null ? void 0 : classNames.chevronNext
                })
              }
            )
          },
          PaginationItemType.NEXT
        );
      }
      if (value === PaginationItemType.DOTS) {
        return /* @__PURE__ */ jsxs(
          pagination_item_default,
          {
            className: slots.item({
              class: clsx(classNames == null ? void 0 : classNames.item, "group")
            }),
            "data-slot": "item",
            getAriaLabel: getItemAriaLabel,
            value,
            onPress: () => isBefore ? setPage(activePage - dotsJump >= 1 ? activePage - dotsJump : 1) : setPage(activePage + dotsJump <= total ? activePage + dotsJump : total),
            children: [
              /* @__PURE__ */ jsx(EllipsisIcon, { className: slots == null ? void 0 : slots.ellipsis({ class: classNames == null ? void 0 : classNames.ellipsis }) }),
              /* @__PURE__ */ jsx(
                ForwardIcon,
                {
                  className: slots == null ? void 0 : slots.forwardIcon({ class: classNames == null ? void 0 : classNames.forwardIcon }),
                  "data-before": dataAttr(isRTL ? !isBefore : isBefore)
                }
              )
            ]
          },
          PaginationItemType.DOTS + isBefore
        );
      }
      return /* @__PURE__ */ createElement(pagination_item_default, { ...getItemProps({ value }), key: value, getAriaLabel: getItemAriaLabel }, value);
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
  return /* @__PURE__ */ jsx(Component, { ...getBaseProps(), children: /* @__PURE__ */ jsxs("ul", { ...getWrapperProps(), children: [
    !disableCursorAnimation && !disableAnimation && /* @__PURE__ */ jsx(pagination_cursor_default, { ...getCursorProps() }),
    range.map(renderItem)
  ] }) });
});
Pagination.displayName = "NextUI.Pagination";
var pagination_default = Pagination;

export {
  pagination_default
};
