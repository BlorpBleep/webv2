import * as _react_types_shared from '@react-types/shared';
import * as React$1 from 'react';
import { Key, ReactNode } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, DOMAttributes, HTMLNextUIProps, SharedSelection } from '@nextui-org/system';
import { SelectVariantProps, SlotsToClasses, SelectSlots } from '@nextui-org/theme';
import { HiddenSelectProps } from './hidden-select.js';
import { ReactRef } from '@nextui-org/react-utils';
import { ListboxProps } from '@nextui-org/listbox';
import { PopoverProps } from '@nextui-org/popover';
import { ScrollShadowProps } from '@nextui-org/scroll-shadow';
import { MultiSelectState, MultiSelectProps } from '@nextui-org/use-aria-multiselect';
import { SpinnerProps } from '@nextui-org/spinner';
import 'react/jsx-runtime';

type SelectedItemProps<T = object> = {
    /** A unique key for the item. */
    key?: Key;
    /** The props passed to the item. */
    props?: Record<string, any>;
    /** The item data. */
    data?: T | null;
    /** An accessibility label for this item. */
    "aria-label"?: string;
    /** The rendered contents of this item (e.g. JSX). */
    rendered?: ReactNode;
    /** A string value for this item, used for features like typeahead. */
    textValue?: string;
    /** The type of item this item represents. */
    type?: string;
};
type SelectedItems<T = object> = Array<SelectedItemProps<T>>;
interface Props<T> extends Omit<HTMLNextUIProps<"select">, keyof SelectVariantProps> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLSelectElement | null>;
    /**
     * The ref to the scroll element. Useful when having async loading of items.
     */
    scrollRef?: ReactRef<HTMLElement | null>;
    /**
     * The ref to the spinner element.
     */
    spinnerRef?: ReactRef<HTMLElement | null>;
    /**
     * Whether the select is required.
     * @default false
     */
    isRequired?: boolean;
    /**
     * The icon that represents the select open state. Usually a chevron icon.
     */
    selectorIcon?: ReactNode;
    /**
     * Element to be rendered in the left side of the select.
     */
    startContent?: React.ReactNode;
    /**
     * Element to be rendered in the right side of the select.
     */
    endContent?: ReactNode;
    /**
     * The placeholder for the select to display when no option is selected.
     * @default "Select an option"
     */
    placeholder?: string;
    /**
     * Whether to display a top and bottom arrow indicators when the listbox is scrollable.
     * @default true
     */
    showScrollIndicators?: boolean;
    /**
     * Props to be passed to the popover component.
     *
     * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 5 }
     */
    popoverProps?: Partial<PopoverProps>;
    /**
     * Props to be passed to the listbox component.
     *
     * @default { disableAnimation: false }
     */
    listboxProps?: Partial<ListboxProps>;
    /**
     * Props to be passed to the scroll shadow component. This component
     * adds a shadow to the top and bottom of the listbox when it is scrollable.
     *
     * @default { hideScrollBar: true, offset: 15 }
     */
    scrollShadowProps?: Partial<ScrollShadowProps>;
    /**
     * Props to be passed to the spinner component.
     *
     * @default { size: "sm" , color: "current" }
     */
    spinnerProps?: Partial<SpinnerProps>;
    /**
     * Function to render the value of the select. It renders the selected item by default.
     * @param value
     * @returns
     */
    renderValue?: (items: SelectedItems<T>) => ReactNode;
    /**
     * Callback fired when the select menu is closed.
     */
    onClose?: () => void;
    /**
     * Classes object to style the select and its children.
     */
    classNames?: SlotsToClasses<SelectSlots>;
    /**
     * Handler that is called when the selection changes.
     */
    onSelectionChange?: (keys: SharedSelection) => void;
}
interface SelectData {
    isDisabled?: boolean;
    isRequired?: boolean;
    name?: string;
    validationBehavior?: "aria" | "native";
}
declare const selectData: WeakMap<MultiSelectState<any>, SelectData>;
type UseSelectProps<T> = Omit<Props<T>, keyof Omit<MultiSelectProps<T>, "onSelectionChange">> & Omit<MultiSelectProps<T>, "onSelectionChange"> & SelectVariantProps;
declare function useSelect<T extends object>(originalProps: UseSelectProps<T>): {
    Component: _nextui_org_system.As<any>;
    domRef: React$1.RefObject<HTMLSelectElement>;
    state: MultiSelectState<T>;
    label: ReactNode;
    name: string | undefined;
    triggerRef: React$1.RefObject<HTMLElement>;
    isLoading: boolean | undefined;
    placeholder: string | undefined;
    startContent: ReactNode;
    endContent: ReactNode;
    description: ReactNode;
    selectorIcon: ReactNode;
    hasHelper: boolean;
    labelPlacement: "outside" | "outside-left" | "inside" | undefined;
    hasPlaceholder: boolean;
    renderValue: ((items: SelectedItems<T>) => ReactNode) | undefined;
    selectionMode: _react_types_shared.SelectionMode;
    disableAnimation: boolean;
    isOutsideLeft: boolean;
    shouldLabelBeOutside: boolean;
    shouldLabelBeInside: boolean;
    isInvalid: boolean;
    errorMessage: ReactNode;
    getBaseProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getTriggerProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getLabelProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getValueProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getListboxProps: (props?: any) => ListboxProps<object>;
    getPopoverProps: (props?: DOMAttributes) => PopoverProps;
    getSpinnerProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getMainWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getListboxWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getHiddenSelectProps: (props?: {}) => HiddenSelectProps<T>;
    getInnerWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getHelperWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getDescriptionProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getErrorMessageProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getSelectorIconProps: () => {
        "data-slot": string;
        "aria-hidden": boolean | "true" | "false";
        "data-open": boolean | "true" | "false";
        className: string;
    };
};
type UseSelectReturn = ReturnType<typeof useSelect>;

export { SelectedItemProps, SelectedItems, UseSelectProps, UseSelectReturn, selectData, useSelect };
