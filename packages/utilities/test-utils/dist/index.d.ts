export { mocks } from './mocks/index.js';
export { blur, focus } from './focus.js';
export { FocusableElement, hasDisplayNone, hasFocusWithin, hasNegativeTabIndex, hasTabIndex, isActiveElement, isContentEditable, isDisabled, isFocusable, isHidden, isInputElement, isTabbable } from './tabbable.js';
export { getActiveElement, getOwnerDocument, isElement, isHTMLElement } from './dom.js';
export { drag } from './drag.js';
export { triggerPress, type } from './events.js';
export { keyCodes, pointerMap } from './constants.js';
import './mocks/image.js';
import '@testing-library/user-event/system/pointer/shared';
