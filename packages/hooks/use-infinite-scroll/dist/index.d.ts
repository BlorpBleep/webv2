import * as react from 'react';

interface UseInfiniteScrollProps {
    /**
     * Whether the infinite scroll is enabled.
     * @default true
     */
    isEnabled?: boolean;
    /**
     * Whether there are more items to load, the observer will disconnect when there are no more items to load.
     */
    hasMore?: boolean;
    /**
     * The distance in pixels before the end of the items that will trigger a call to load more.
     * @default 250
     */
    distance?: number;
    /**
     * Use loader element for the scroll detection.
     */
    shouldUseLoader?: boolean;
    /**
     * Callback to load more items.
     */
    onLoadMore?: () => void;
}
declare function useInfiniteScroll(props?: UseInfiniteScrollProps): readonly [react.RefObject<HTMLElement>, react.RefObject<HTMLElement>];
type UseInfiniteScrollReturn = ReturnType<typeof useInfiniteScroll>;

export { UseInfiniteScrollProps, UseInfiniteScrollReturn, useInfiniteScroll };
