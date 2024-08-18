import { pointerKey } from '@testing-library/user-event/system/pointer/shared';

/**
 * Object containing key codes for various keyboard keys.
 */
declare const keyCodes: {
    Enter: number;
    " ": number;
    PageUp: number;
    PageDown: number;
    End: number;
    Home: number;
    ArrowLeft: number;
    ArrowUp: number;
    ArrowRight: number;
    ArrowDown: number;
};
declare const pointerMap: pointerKey[];

export { keyCodes, pointerMap };
