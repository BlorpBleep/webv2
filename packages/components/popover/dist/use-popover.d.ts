import * as react from 'react';
import { RefObject } from 'react';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { SlotsToClasses, PopoverSlots, PopoverVariantProps } from '@nextui-org/theme';
import { HTMLMotionProps } from 'framer-motion';
import { ReactRef } from '@nextui-org/react-utils';
import { OverlayTriggerState } from '@react-stately/overlays';
import { OverlayTriggerProps } from '@react-types/overlays';
import { AriaDialogProps } from '@react-aria/dialog';
import { ReactAriaPopoverProps } from './use-aria-popover.js';
import '@react-aria/overlays';
import '@nextui-org/aria-utils';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * The controlled state of the popover.
     */
    state?: OverlayTriggerState;
    /**
     * The ref for the element which the overlay positions itself with respect to.
     */
    triggerRef?: RefObject<HTMLElement>;
    /**
     * Whether the scroll event should be blocked when the overlay is open.
     * @default true
     */
    shouldBlockScroll?: boolean;
    /**
     * Custom props to be passed to the dialog container.
     *
     * @default {}
     */
    dialogProps?: AriaDialogProps;
    /**
     * Type of overlay that is opened by the trigger.
     */
    triggerType?: "dialog" | "menu" | "listbox" | "tree" | "grid";
    /**
     * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
     */
    motionProps?: HTMLMotionProps<"div">;
    /**
     * The container element in which the overlay portal will be placed.
     * @default document.body
     */
    portalContainer?: Element;
    /**
     * Classname or List of classes to change the classNames of the element.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <Popover classNames={{
     *    base:"base-classes",
     *    content: "content-classes",
     *    trigger: "trigger-classes",
     *    backdrop: "backdrop-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<PopoverSlots>;
    /**
     *  Callback fired when the popover is closed.
     */
    onClose?: () => void;
}
type UsePopoverProps = Props & Omit<ReactAriaPopoverProps, "triggerRef" | "popoverRef"> & OverlayTriggerProps & PopoverVariantProps;
declare function usePopover(originalProps: UsePopoverProps): {
    state: OverlayTriggerState;
    Component: _nextui_org_system.As<any>;
    children: react.ReactNode;
    classNames: SlotsToClasses<"base" | "content" | "trigger" | "backdrop" | "arrow"> | undefined;
    showArrow: boolean;
    triggerRef: RefObject<HTMLElement>;
    placement: "center" | "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    isNonModal: boolean;
    popoverRef: RefObject<HTMLDivElement>;
    portalContainer: Element | undefined;
    isOpen: boolean;
    onClose: () => void;
    disableAnimation: boolean;
    shouldBlockScroll: boolean;
    backdrop: "transparent" | "opaque" | "blur";
    motionProps: HTMLMotionProps<"div"> | undefined;
    getBackdropProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getPopoverProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getTriggerProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getDialogProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
    getContentProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UsePopoverReturn = ReturnType<typeof usePopover>;

export { Props, UsePopoverProps, UsePopoverReturn, usePopover };
