import * as tailwind_variants from 'tailwind-variants';
import * as _react_stately_combobox from '@react-stately/combobox';
import { FilterFn } from '@react-stately/combobox';
import * as react from 'react';
import { ReactNode } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, DOMAttributes, HTMLNextUIProps } from '@nextui-org/system';
import { AutocompleteVariantProps, SlotsToClasses, AutocompleteSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { ComboBoxProps } from '@react-types/combobox';
import { PopoverProps } from '@nextui-org/popover';
import { ListboxProps } from '@nextui-org/listbox';
import { InputProps } from '@nextui-org/input';
import { ScrollShadowProps } from '@nextui-org/scroll-shadow';
import { ButtonProps } from '@nextui-org/button';
import { AsyncLoadable } from '@react-types/shared';

interface Props<T> extends Omit<HTMLNextUIProps<"input">, keyof ComboBoxProps<T>> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The ref to the scroll element. Useful when having async loading of items.
     */
    scrollRef?: ReactRef<HTMLElement | null>;
    /**
     * The icon that represents the autocomplete open state. Usually a chevron icon.
     */
    selectorIcon?: ReactNode;
    /**
     * The icon that represents the clear button. Usually a cross icon.
     */
    clearIcon?: ReactNode;
    /**
     * Whether to display a top and bottom arrow indicators when the listbox is scrollable.
     * @default true
     */
    showScrollIndicators?: boolean;
    /**
     * Props to be passed to the scroll shadow component. This component
     * adds a shadow to the top and bottom of the listbox when it is scrollable.
     *
     * @default { hideScrollBar: true, offset: 15 }
     */
    scrollShadowProps?: Partial<ScrollShadowProps>;
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
     * Props to be passed to the input component.
     *
     * @default { disableAnimation: false }
     */
    inputProps?: Partial<InputProps>;
    /**
     * Whether the clear button should be hidden.
     * @default false
     * @deprecated Use `isClearable` instead.
     */
    disableClearable?: boolean;
    /**
     * Props to be passed to the selector button component.
     * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
     */
    selectorButtonProps?: Partial<ButtonProps>;
    /**
     * Props to be passed to the clear button component.
     * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
     */
    clearButtonProps?: Partial<ButtonProps>;
    /**
     * The filter options to use when filtering items based on user input.
     * @default {sensitivity: 'base'}
     */
    filterOptions?: Intl.CollatorOptions;
    /**
     * Whether the autocomplete allows the menu to be open when the collection is empty.
     * @default true
     */
    allowsEmptyCollection?: boolean;
    /**
     * Whether the autocomplete menu should close on blur.
     * @default true
     * */
    shouldCloseOnBlur?: boolean;
    /**
     * Classes object to style the autocomplete and its children.
     */
    classNames?: SlotsToClasses<AutocompleteSlots>;
    /**
     * The filter function used to determine if a option should be included in the autocomplete list.
     * */
    defaultFilter?: FilterFn;
    /**
     * Callback fired when the select menu is closed.
     */
    onClose?: () => void;
}
type UseAutocompleteProps<T> = Props<T> & Omit<InputProps, "children" | "value" | "isClearable" | "defaultValue" | "classNames"> & ComboBoxProps<T> & AsyncLoadable & AutocompleteVariantProps;
declare function useAutocomplete<T extends object>(originalProps: UseAutocompleteProps<T>): {
    Component: _nextui_org_system.As<any>;
    inputRef: react.RefObject<HTMLInputElement>;
    label: ReactNode;
    state: _react_stately_combobox.ComboBoxState<T>;
    slots: {
        base: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        listboxWrapper: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        listbox: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        popoverContent: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        endContentWrapper: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        clearButton: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        selectorButton: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        listboxWrapper: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        listbox: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        popoverContent: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        endContentWrapper: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        clearButton: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        selectorButton: (slotProps?: ({
            isClearable?: boolean | undefined;
            disableAnimation?: boolean | undefined;
            disableSelectorIconRotation?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    classNames: SlotsToClasses<"base" | "clearButton" | "listbox" | "listboxWrapper" | "popoverContent" | "endContentWrapper" | "selectorButton"> | undefined;
    isLoading: boolean | undefined;
    clearIcon: ReactNode;
    isOpen: boolean;
    endContent: ReactNode;
    isClearable: boolean | undefined;
    disableAnimation: boolean;
    allowsCustomValue: boolean;
    selectorIcon: ReactNode;
    getBaseProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getInputProps: () => InputProps;
    getListBoxProps: () => ListboxProps<object>;
    getPopoverProps: (props?: DOMAttributes) => PopoverProps;
    getEmptyPopoverProps: () => {
        ref: react.RefObject<HTMLDivElement>;
        className: string;
    };
    getClearButtonProps: () => ButtonProps;
    getSelectorButtonProps: () => ButtonProps;
    getListBoxWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
    getEndContentWrapperProps: PropGetter<Record<string, unknown>, DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseAutocompleteReturn = ReturnType<typeof useAutocomplete>;

export { UseAutocompleteProps, UseAutocompleteReturn, useAutocomplete };
