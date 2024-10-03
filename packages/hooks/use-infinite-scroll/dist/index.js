"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useInfiniteScroll: () => useInfiniteScroll
});
module.exports = __toCommonJS(src_exports);
var import_lodash = __toESM(require("lodash.debounce"));
var import_react = require("react");
function useInfiniteScroll(props = {}) {
  const {
    hasMore = true,
    distance = 250,
    isEnabled = true,
    shouldUseLoader = true,
    onLoadMore
  } = props;
  const scrollContainerRef = (0, import_react.useRef)(null);
  const loaderRef = (0, import_react.useRef)(null);
  const observerRef = (0, import_react.useRef)(null);
  const isLoadingRef = (0, import_react.useRef)(false);
  const loadMore = (0, import_react.useCallback)(() => {
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
  (0, import_react.useLayoutEffect)(() => {
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
    const debouncedCheckIfNearBottom = (0, import_lodash.default)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useInfiniteScroll
});
