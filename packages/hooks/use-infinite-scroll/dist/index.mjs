// src/index.ts
import debounce from "lodash.debounce";
import { useLayoutEffect, useRef, useCallback } from "react";
function useInfiniteScroll(props = {}) {
  const {
    hasMore = true,
    distance = 250,
    isEnabled = true,
    shouldUseLoader = true,
    onLoadMore
  } = props;
  const scrollContainerRef = useRef(null);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const loadMore = useCallback(() => {
    let timer;
    if (!isLoadingRef.current && hasMore && onLoadMore) {
      isLoadingRef.current = true;
      onLoadMore();
      timer = setTimeout(() => {
        isLoadingRef.current = false;
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [hasMore, onLoadMore]);
  useLayoutEffect(() => {
    const scrollContainerNode = scrollContainerRef.current;
    if (!isEnabled || !scrollContainerNode || !hasMore)
      return;
    if (shouldUseLoader) {
      const loaderNode = loaderRef.current;
      if (!loaderNode)
        return;
      const options = {
        root: scrollContainerNode,
        rootMargin: `0px 0px ${distance}px 0px`,
        threshold: 0.1
      };
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      }, options);
      observer.observe(loaderNode);
      observerRef.current = observer;
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
    const debouncedCheckIfNearBottom = debounce(() => {
      if (scrollContainerNode.scrollHeight - scrollContainerNode.scrollTop <= scrollContainerNode.clientHeight + distance) {
        loadMore();
      }
    }, 100);
    scrollContainerNode.addEventListener("scroll", debouncedCheckIfNearBottom);
    return () => {
      scrollContainerNode.removeEventListener("scroll", debouncedCheckIfNearBottom);
    };
  }, [hasMore, distance, isEnabled, shouldUseLoader, loadMore]);
  return [loaderRef, scrollContainerRef];
}
export {
  useInfiniteScroll
};
