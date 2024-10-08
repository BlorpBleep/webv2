import * as react from 'react';
import { ReactNode } from 'react';
import * as tailwind_variants from 'tailwind-variants';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps, PropGetter } from '@nextui-org/system';
import { SlotsToClasses, UserSlots } from '@nextui-org/theme';
import { AvatarProps } from '@nextui-org/avatar';
import { ReactRef } from '@nextui-org/react-utils';

interface Props {
    /**
     * Ref to the DOM node.
     */
    ref?: ReactRef<HTMLDivElement | null>;
    /**
     * The user name.
     */
    name: ReactNode | string;
    /**
     * The user information, like email, phone, etc.
     */
    description?: ReactNode | string;
    /**
     * Whether the user can be focused.
     * @default false
     */
    isFocusable?: boolean;
    /**
     * The user avatar props
     * @see https://nextui.org/docs/components/avatar
     */
    avatarProps?: Partial<AvatarProps>;
    /**
     * Classname or List of classes to change the classNames of the avatar.
     * if `className` is passed, it will be added to the base slot.
     *
     * @example
     * ```ts
     * <User classNames={{
     *    base:"base-classes",
     *    wrapper: "wrapper-classes",
     *    name: "name-classes",
     *    description: "description-classes",
     * }} />
     * ```
     */
    classNames?: SlotsToClasses<UserSlots>;
}
type UseUserProps = Props & Omit<HTMLNextUIProps<"div">, "children">;
declare function useUser(props: UseUserProps): {
    Component: _nextui_org_system.As<any>;
    className: string | undefined;
    slots: {
        base: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        name: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {
        base: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        wrapper: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        name: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
        description: (slotProps?: ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({
            [x: string]: string | number | undefined;
            [x: number]: string | number | undefined;
        } & tailwind_variants.ClassProp<ClassValue>) | ({} & tailwind_variants.ClassProp<ClassValue>) | undefined) => string;
    } & {};
    name: ReactNode;
    description: ReactNode;
    classNames: SlotsToClasses<"base" | "description" | "name" | "wrapper"> | undefined;
    baseStyles: string;
    avatarProps: {
        ref?: ReactRef<HTMLSpanElement | null> | undefined;
        imgRef?: ReactRef<HTMLImageElement> | undefined;
        name?: string | undefined;
        src?: string | undefined;
        alt?: string | undefined;
        icon?: ReactNode;
        isFocusable: boolean;
        ignoreFallback?: boolean | undefined;
        showFallback?: boolean | undefined;
        getInitials?: ((name: string) => string) | undefined;
        fallback?: ReactNode;
        onError?: (() => void) | undefined;
        ImgComponent?: react.ElementType<any> | undefined;
        imgProps?: react.ImgHTMLAttributes<HTMLImageElement> | undefined;
        classNames?: SlotsToClasses<"base" | "img" | "name" | "icon" | "fallback"> | undefined;
        style?: react.CSSProperties | undefined;
        title?: string | undefined;
        as?: _nextui_org_system.As<any> | undefined;
        key?: react.Key | null | undefined;
        children?: ReactNode;
        id?: string | undefined;
        role?: react.AriaRole | undefined;
        tabIndex?: number | undefined;
        accessKey?: string | undefined;
        autoFocus?: boolean | undefined;
        className?: string | undefined;
        content?: string | undefined;
        contentEditable?: (boolean | "true" | "false") | "inherit" | undefined;
        contextMenu?: string | undefined;
        dir?: string | undefined;
        draggable?: (boolean | "true" | "false") | undefined;
        hidden?: boolean | undefined;
        inputMode?: "text" | "none" | "search" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
        itemProp?: string | undefined;
        itemRef?: string | undefined;
        itemScope?: boolean | undefined;
        itemType?: string | undefined;
        lang?: string | undefined;
        placeholder?: string | undefined;
        radioGroup?: string | undefined;
        rel?: string | undefined;
        spellCheck?: (boolean | "true" | "false") | undefined;
        translate?: "yes" | "no" | undefined;
        onCopy?: react.ClipboardEventHandler<HTMLSpanElement> | undefined;
        onCut?: react.ClipboardEventHandler<HTMLSpanElement> | undefined;
        onPaste?: react.ClipboardEventHandler<HTMLSpanElement> | undefined;
        onLoad?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onWheel?: react.WheelEventHandler<HTMLSpanElement> | undefined;
        onScroll?: react.UIEventHandler<HTMLSpanElement> | undefined;
        onCompositionEnd?: react.CompositionEventHandler<HTMLSpanElement> | undefined;
        onCompositionStart?: react.CompositionEventHandler<HTMLSpanElement> | undefined;
        onCompositionUpdate?: react.CompositionEventHandler<HTMLSpanElement> | undefined;
        onKeyDown?: react.KeyboardEventHandler<HTMLSpanElement> | undefined;
        onKeyPress?: react.KeyboardEventHandler<HTMLSpanElement> | undefined;
        onKeyUp?: react.KeyboardEventHandler<HTMLSpanElement> | undefined;
        onFocus?: react.FocusEventHandler<HTMLSpanElement> | undefined;
        onBlur?: react.FocusEventHandler<HTMLSpanElement> | undefined;
        onChange?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onInput?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onSubmit?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onClick?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onContextMenu?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onDoubleClick?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onDrag?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragEnd?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragEnter?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragExit?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragLeave?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragOver?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragStart?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDrop?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onMouseDown?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseEnter?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseLeave?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseMove?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseOut?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseOver?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseUp?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onPointerDown?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerEnter?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerLeave?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerUp?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onSelect?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onTouchCancel?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onTouchEnd?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onTouchMove?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onTouchStart?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onAnimationStart?: react.AnimationEventHandler<HTMLSpanElement> | undefined;
        onAnimationEnd?: react.AnimationEventHandler<HTMLSpanElement> | undefined;
        onAnimationIteration?: react.AnimationEventHandler<HTMLSpanElement> | undefined;
        onTransitionEnd?: react.TransitionEventHandler<HTMLSpanElement> | undefined;
        'aria-label'?: string | undefined;
        'aria-labelledby'?: string | undefined;
        'aria-describedby'?: string | undefined;
        'aria-details'?: string | undefined;
        'aria-activedescendant'?: string | undefined;
        'aria-atomic'?: (boolean | "true" | "false") | undefined;
        'aria-autocomplete'?: "list" | "none" | "inline" | "both" | undefined;
        'aria-busy'?: (boolean | "true" | "false") | undefined;
        'aria-checked'?: boolean | "true" | "false" | "mixed" | undefined;
        'aria-colcount'?: number | undefined;
        'aria-colindex'?: number | undefined;
        'aria-colspan'?: number | undefined;
        'aria-controls'?: string | undefined;
        'aria-current'?: boolean | "time" | "true" | "false" | "step" | "page" | "location" | "date" | undefined;
        'aria-disabled'?: (boolean | "true" | "false") | undefined;
        'aria-dropeffect'?: "link" | "none" | "copy" | "execute" | "move" | "popup" | undefined;
        'aria-errormessage'?: string | undefined;
        'aria-expanded'?: (boolean | "true" | "false") | undefined;
        'aria-flowto'?: string | undefined;
        'aria-grabbed'?: (boolean | "true" | "false") | undefined;
        'aria-haspopup'?: boolean | "dialog" | "menu" | "grid" | "listbox" | "tree" | "true" | "false" | undefined;
        'aria-hidden'?: (boolean | "true" | "false") | undefined;
        'aria-invalid'?: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
        'aria-keyshortcuts'?: string | undefined;
        'aria-level'?: number | undefined;
        'aria-live'?: "off" | "assertive" | "polite" | undefined;
        'aria-modal'?: (boolean | "true" | "false") | undefined;
        'aria-multiline'?: (boolean | "true" | "false") | undefined;
        'aria-multiselectable'?: (boolean | "true" | "false") | undefined;
        'aria-orientation'?: "horizontal" | "vertical" | undefined;
        'aria-owns'?: string | undefined;
        'aria-placeholder'?: string | undefined;
        'aria-posinset'?: number | undefined;
        'aria-pressed'?: boolean | "true" | "false" | "mixed" | undefined;
        'aria-readonly'?: (boolean | "true" | "false") | undefined;
        'aria-relevant'?: "text" | "all" | "additions" | "additions removals" | "additions text" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
        'aria-required'?: (boolean | "true" | "false") | undefined;
        'aria-roledescription'?: string | undefined;
        'aria-rowcount'?: number | undefined;
        'aria-rowindex'?: number | undefined;
        'aria-rowspan'?: number | undefined;
        'aria-selected'?: (boolean | "true" | "false") | undefined;
        'aria-setsize'?: number | undefined;
        'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined;
        'aria-valuemax'?: number | undefined;
        'aria-valuemin'?: number | undefined;
        'aria-valuenow'?: number | undefined;
        'aria-valuetext'?: string | undefined;
        dangerouslySetInnerHTML?: {
            __html: string | TrustedHTML;
        } | undefined;
        onCopyCapture?: react.ClipboardEventHandler<HTMLSpanElement> | undefined;
        onCutCapture?: react.ClipboardEventHandler<HTMLSpanElement> | undefined;
        onPasteCapture?: react.ClipboardEventHandler<HTMLSpanElement> | undefined;
        onCompositionEndCapture?: react.CompositionEventHandler<HTMLSpanElement> | undefined;
        onCompositionStartCapture?: react.CompositionEventHandler<HTMLSpanElement> | undefined;
        onCompositionUpdateCapture?: react.CompositionEventHandler<HTMLSpanElement> | undefined;
        onFocusCapture?: react.FocusEventHandler<HTMLSpanElement> | undefined;
        onBlurCapture?: react.FocusEventHandler<HTMLSpanElement> | undefined;
        onChangeCapture?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onBeforeInput?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onBeforeInputCapture?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onInputCapture?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onReset?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onResetCapture?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onSubmitCapture?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onInvalid?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onInvalidCapture?: react.FormEventHandler<HTMLSpanElement> | undefined;
        onLoadCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onErrorCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onKeyDownCapture?: react.KeyboardEventHandler<HTMLSpanElement> | undefined;
        onKeyPressCapture?: react.KeyboardEventHandler<HTMLSpanElement> | undefined;
        onKeyUpCapture?: react.KeyboardEventHandler<HTMLSpanElement> | undefined;
        onAbort?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onAbortCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onCanPlay?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onCanPlayCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onCanPlayThrough?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onCanPlayThroughCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onDurationChange?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onDurationChangeCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onEmptied?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onEmptiedCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onEncrypted?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onEncryptedCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onEnded?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onEndedCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onLoadedData?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onLoadedDataCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onLoadedMetadata?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onLoadedMetadataCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onLoadStart?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onLoadStartCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onPause?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onPauseCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onPlay?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onPlayCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onPlaying?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onPlayingCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onProgress?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onProgressCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onRateChange?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onRateChangeCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onResize?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onResizeCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onSeeked?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onSeekedCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onSeeking?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onSeekingCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onStalled?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onStalledCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onSuspend?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onSuspendCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onTimeUpdate?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onTimeUpdateCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onVolumeChange?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onVolumeChangeCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onWaiting?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onWaitingCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onAuxClick?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onAuxClickCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onClickCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onContextMenuCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onDoubleClickCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onDragCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragEndCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragEnterCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragExitCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragLeaveCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragOverCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDragStartCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onDropCapture?: react.DragEventHandler<HTMLSpanElement> | undefined;
        onMouseDownCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseMoveCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseOutCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseOverCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onMouseUpCapture?: react.MouseEventHandler<HTMLSpanElement> | undefined;
        onSelectCapture?: react.ReactEventHandler<HTMLSpanElement> | undefined;
        onTouchCancelCapture?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onTouchEndCapture?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onTouchMoveCapture?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onTouchStartCapture?: react.TouchEventHandler<HTMLSpanElement> | undefined;
        onPointerDownCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerMove?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerMoveCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerUpCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerCancel?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerCancelCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerEnterCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerLeaveCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerOver?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerOverCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerOut?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onPointerOutCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onGotPointerCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onGotPointerCaptureCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onLostPointerCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onLostPointerCaptureCapture?: react.PointerEventHandler<HTMLSpanElement> | undefined;
        onScrollCapture?: react.UIEventHandler<HTMLSpanElement> | undefined;
        onWheelCapture?: react.WheelEventHandler<HTMLSpanElement> | undefined;
        onAnimationStartCapture?: react.AnimationEventHandler<HTMLSpanElement> | undefined;
        onAnimationEndCapture?: react.AnimationEventHandler<HTMLSpanElement> | undefined;
        onAnimationIterationCapture?: react.AnimationEventHandler<HTMLSpanElement> | undefined;
        onTransitionEndCapture?: react.TransitionEventHandler<HTMLSpanElement> | undefined;
        prefix?: string | undefined;
        suppressContentEditableWarning?: boolean | undefined;
        suppressHydrationWarning?: boolean | undefined;
        nonce?: string | undefined;
        about?: string | undefined;
        datatype?: string | undefined;
        inlist?: any;
        property?: string | undefined;
        resource?: string | undefined;
        rev?: string | undefined;
        typeof?: string | undefined;
        vocab?: string | undefined;
        autoCapitalize?: string | undefined;
        autoCorrect?: string | undefined;
        autoSave?: string | undefined;
        itemID?: string | undefined;
        results?: number | undefined;
        security?: string | undefined;
        unselectable?: "on" | "off" | undefined;
        is?: string | undefined;
        color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
        size?: "sm" | "md" | "lg" | undefined;
        disableAnimation?: boolean | undefined;
        radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
        isBordered?: boolean | undefined;
        isDisabled?: boolean | undefined;
    };
    getUserProps: PropGetter<Record<string, unknown>, _nextui_org_system.DOMAttributes<_nextui_org_system.DOMElement>>;
};
type UseUserReturn = ReturnType<typeof useUser>;

export { UseUserProps, UseUserReturn, useUser };
