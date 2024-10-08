import { MenuItemSelectedIconProps, MenuItemBaseProps } from './base/menu-item-base.js';
import * as _nextui_org_theme from '@nextui-org/theme';
import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { Node } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';
import '@react-aria/menu';
import '@nextui-org/aria-utils';

interface Props<T extends object> extends MenuItemBaseProps<T> {
    item: Node<T>;
    state: TreeState<T>;
}
type UseMenuItemProps<T extends object> = Props<T> & Omit<HTMLNextUIProps<"li">, keyof Props<T>>;
declare function useMenuItem<T extends object>(originalProps: UseMenuItemProps<T>): {
    Component: _nextui_org_system.As<any>;
    domRef: react.RefObject<HTMLLIElement>;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        selectedIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        shortcut: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        selectedIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        shortcut: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
            disableAnimation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: _nextui_org_theme.SlotsToClasses<"base" | "title" | "wrapper" | "description" | "selectedIcon" | "shortcut"> | undefined;
    isSelectable: boolean;
    isSelected: boolean;
    isDisabled: boolean | undefined;
    rendered: react.ReactNode;
    shortcut: react.ReactNode;
    description: react.ReactNode;
    startContent: react.ReactNode;
    endContent: react.ReactNode;
    selectedIcon: react.ReactNode | ((props: MenuItemSelectedIconProps) => react.ReactNode);
    disableAnimation: boolean;
    getItemProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    hideSelectedIcon: boolean;
    getDescriptionProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getKeyboardShortcutProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getSelectedIconProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseMenuReturn = ReturnType<typeof useMenuItem>;

export { UseMenuItemProps, UseMenuReturn, useMenuItem };
