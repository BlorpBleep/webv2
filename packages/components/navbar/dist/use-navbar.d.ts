import * as react from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { PropGetter, HTMLNextUIProps } from '@nextui-org/system';
import { NavbarVariantProps, SlotsToClasses, NavbarSlots } from '@nextui-org/theme';
import { ReactRef } from '@nextui-org/react-utils';
import { HTMLMotionProps } from 'framer-motion';

interface Props extends HTMLNextUIProps<"nav"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLElement | null>;
    /**
     * The parent element where the navbar is placed within.
     * This is used to determine the scroll position and whether the navbar should be hidden or not.
     * @default `window`
     */
    parentRef?: React.RefObject<HTMLElement>;
    /**
     * The height of the navbar.
     * @default "4rem" (64px)
     */
    height?: number | string;
    /**
     * Whether the menu is open.
     * @default false
     */
    isMenuOpen?: boolean;
    /**
     * Whether the menu should be open by default.
     * @default false
     */
    isMenuDefaultOpen?: boolean;
    /**
     * Whether the navbar should hide on scroll or not.
     * @default false
     */
    shouldHideOnScroll?: boolean;
    /**
     * Whether the navbar parent scroll event should be listened to or not.
     * @default false
     */
    disableScrollHandler?: boolean;
    /**
     * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
     * This motion is only available if the `shouldHideOnScroll` prop is set to `true`.
     */
    motionProps?: HTMLMotionProps<"nav">;
    /**
     * The event handler for the menu open state.
     * @param isOpen boolean
     * @returns void
     */
    onMenuOpenChange?: (isOpen: boolean) => void;
    /**
     * The scroll event handler for the navbar. The event fires when the navbar parent element is scrolled.
     * it only works if `disableScrollHandler` is set to `false` or `shouldHideOnScroll` is set to `true`.
     */
    onScrollPositionChange?: (scrollPosition: number) => void;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Navbar classNames={{
     *    base:"base-classes",
     *    wrapper: "wrapper-classes",
     *    brand: "brand-classes",
     *    content: "content-classes",
     *    item: "item-classes",
     *    menu: "menu-classes", // the one that appears when the menu is open
     *    menuItem: "menu-item-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<NavbarSlots>;
}
type UseNavbarProps = Props & NavbarVariantProps;
declare function useNavbar(originalProps: UseNavbarProps): {
    Component: _nextui_org_system.As<any>;
    slots: {
        base: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        toggle: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        srOnly: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        toggleIcon: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        brand: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        item: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        menu: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        menuItem: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        toggle: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        srOnly: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        toggleIcon: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        brand: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        content: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        item: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        menu: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        menuItem: (slotProps?: ({
            disableAnimation?: boolean | undefined;
            maxWidth?: "sm" | "md" | "lg" | "full" | "xl" | "2xl" | undefined;
            position?: "static" | "sticky" | undefined;
            isBordered?: boolean | undefined;
            isBlurred?: boolean | undefined;
            hideOnScroll?: boolean | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    domRef: react.RefObject<HTMLElement>;
    height: string | number;
    isHidden: boolean;
    disableAnimation: boolean;
    shouldHideOnScroll: boolean;
    isMenuOpen: boolean;
    classNames: SlotsToClasses<"base" | "menu" | "content" | "wrapper" | "item" | "toggle" | "srOnly" | "toggleIcon" | "brand" | "menuItem"> | undefined;
    setIsMenuOpen: (value: boolean) => void;
    motionProps: HTMLMotionProps<"nav"> | undefined;
    getBaseProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getWrapperProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseNavbarReturn = ReturnType<typeof useNavbar>;

export { UseNavbarProps, UseNavbarReturn, useNavbar };
