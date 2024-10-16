import * as _react_types_shared from '@react-types/shared';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter, SharedSelection } from '@nextui-org/system';
import { AriaMenuProps } from '@react-types/menu';
import { AriaMenuOptions } from '@react-aria/menu';
import { MenuVariantProps, SlotsToClasses, MenuSlots } from '@nextui-org/theme';
import { TreeState } from '@react-stately/tree';
import { ReactRef } from '@nextui-org/react-utils';
import { ReactNode } from 'react';
import { MenuItemProps } from './menu-item.js';
import './use-menu-item.js';
import './base/menu-item-base.js';
import '@nextui-org/aria-utils';
import 'tailwind-variants';

interface Props<T> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The controlled state of the menu.
     */
    state?: TreeState<T>;
    /**
     * The menu aria props.
     */
    menuProps?: AriaMenuOptions<T>;
    /**
     * The menu items variant.
     */
    variant?: MenuItemProps["variant"];
    /**
     * The menu items color.
     */
    color?: MenuItemProps["color"];
    /**
     * Whether to hide the check icon when the items are selected.
     * @default false
     */
    hideSelectedIcon?: boolean;
    /**
     * Provides content to include a component in the top of the table.
     */
    topContent?: ReactNode;
    /**
     * Provides content to include a component in the bottom of the table.
     */
    bottomContent?: ReactNode;
    /**
     * Whether to not display the empty content when there are no items.
     * @default false
     */
    hideEmptyContent?: boolean;
    /**
     *  Provides content to display when there are no items.
     * @default "No items."
     */
    emptyContent?: React.ReactNode;
    /**
     * Whether to disable the items animation.
     * @default false
     */
    disableAnimation?: boolean;
    /**
     * Whether the menu should close when the menu item is selected.
     * @default true
     */
    closeOnSelect?: MenuItemProps["closeOnSelect"];
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Listbox classNames={{
     *    base:"base-classes",
     *    emptyContent: "empty-content-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<MenuSlots>;
    /**
     * The menu items classNames.
     */
    itemClasses?: MenuItemProps["classNames"];
    /**
     * Handler that is called when the selection changes.
     */
    onSelectionChange?: (keys: SharedSelection) => void;
}
type UseMenuProps<T = object> = Props<T> & Omit<HTMLNextUIProps<"ul">, keyof AriaMenuProps<T>> & Omit<AriaMenuProps<T>, "onSelectionChange"> & MenuVariantProps;
declare function useMenu<T extends object>(props: UseMenuProps<T>): {
    Component: _nextui_org_system.As<any>;
    state: TreeState<T>;
    variant: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    disableAnimation: boolean;
    onAction: ((key: _react_types_shared.Key) => void) | undefined;
    onClose: (() => void) | undefined;
    topContent: ReactNode;
    bottomContent: ReactNode;
    closeOnSelect: boolean | undefined;
    className: string | undefined;
    itemClasses: SlotsToClasses<"base" | "title" | "wrapper" | "description" | "selectedIcon" | "shortcut"> | undefined;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getListProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    hideEmptyContent: boolean;
    hideSelectedIcon: boolean;
    getEmptyContentProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseMenuReturn = ReturnType<typeof useMenu>;

export { UseMenuProps, UseMenuReturn, useMenu };
