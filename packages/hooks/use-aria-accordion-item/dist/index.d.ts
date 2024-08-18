import { ButtonHTMLAttributes, Key, RefObject } from 'react';
import { Node, DOMAttributes } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';

interface AccordionItemAriaProps<T> {
    item: Node<T>;
    isDisabled?: boolean;
}
interface AccordionItemAria {
    /** Props for the accordion item button. */
    buttonProps: ButtonHTMLAttributes<HTMLElement>;
    /** Props for the accordion item content element. */
    regionProps: DOMAttributes;
}
/**
 * @deprecated use useReactAriaAccordionItem instead from @nextui-org/use-aria-accordion
 */
declare function useAriaAccordionItem<T>(props: AccordionItemAriaProps<T>, state: TreeState<T> & {
    focusedKey?: Key | null;
}, ref: RefObject<HTMLButtonElement>): AccordionItemAria;

export { AccordionItemAria, AccordionItemAriaProps, useAriaAccordionItem };
