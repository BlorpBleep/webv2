declare function isElement(el: any): el is Element;
declare function isHTMLElement(el: any): el is HTMLElement;
declare function getOwnerDocument(node?: Element | null): Document;
declare function getActiveElement(node?: HTMLElement): HTMLElement;

export { getActiveElement, getOwnerDocument, isElement, isHTMLElement };
