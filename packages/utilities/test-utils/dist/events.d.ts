/**
 * Triggers a simulated press event on the specified element.
 * @param element - The HTML element to trigger the press event on.
 * @param opts - Optional event options.
 */
declare function triggerPress(element: HTMLElement, opts?: {}): void;
/**
 * Triggers a simulated key press event on the active element.
 * @param key - The key to press.
 */
declare function type(key: string): void;

export { triggerPress, type };
