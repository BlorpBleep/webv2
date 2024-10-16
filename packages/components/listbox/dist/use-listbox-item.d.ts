import { ListboxItemSelectedIconProps, ListboxItemBaseProps } from './base/listbox-item-base.js';
import * as _nextui_org_theme from '@nextui-org/theme';
import * as tailwind_variants from 'tailwind-variants';
import * as react from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { Node } from '@react-types/shared';
import { ListState } from '@react-stately/list';
import '@react-aria/listbox';
import '@nextui-org/aria-utils';

interface Props<T extends object> extends ListboxItemBaseProps<T> {
    item: Node<T>;
    state: ListState<T>;
}
type UseListboxItemProps<T extends object> = Props<T> & Omit<HTMLNextUIProps<"li">, keyof Props<T>>;
declare function useListboxItem<T extends object>(originalProps: UseListboxItemProps<T>): {
    Component: _nextui_org_system.As<any>;
    domRef: react.RefObject<HTMLLIElement>;
    slots: {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        selectedIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        shortcut: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        title: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        selectedIcon: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        shortcut: (slotProps?: ({
            color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
            variant?: "solid" | "bordered" | "light" | "faded" | "flat" | "shadow" | undefined;
            disableAnimation?: boolean | undefined;
            showDivider?: boolean | undefined;
            isDisabled?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: _nextui_org_theme.SlotsToClasses<"base" | "title" | "description" | "wrapper" | "selectedIcon" | "shortcut"> | undefined;
    isSelectable: boolean;
    isSelected: boolean;
    isDisabled: boolean | undefined;
    rendered: react.ReactNode;
    description: react.ReactNode;
    startContent: react.ReactNode;
    endContent: react.ReactNode;
    selectedIcon: react.ReactNode | ((props: ListboxItemSelectedIconProps) => react.ReactNode);
    hideSelectedIcon: boolean;
    disableAnimation: boolean;
    getItemProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getDescriptionProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getSelectedIconProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseListboxItemReturn = ReturnType<typeof useListboxItem>;

export { UseListboxItemProps, UseListboxItemReturn, useListboxItem };
