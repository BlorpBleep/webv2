"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/image.tsx
var image_exports = {};
__export(image_exports, {
  default: () => image_default
});
module.exports = __toCommonJS(image_exports);
var import_react3 = require("react");
var import_system2 = require("@nextui-org/system");

// src/use-image.ts
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_use_image = require("@nextui-org/use-image");
var import_react2 = require("react");
function useImage(originalProps) {
  var _a, _b;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.image.variantKeys);
  const {
    ref,
    as,
    src,
    className,
    classNames,
    loading,
    isBlurred,
    fallbackSrc,
    isLoading: isLoadingProp,
    disableSkeleton = !!fallbackSrc,
    removeWrapper = false,
    onError,
    onLoad,
    srcSet,
    sizes,
    crossOrigin,
    ...otherProps
  } = props;
  const imageStatus = (0, import_use_image.useImage)({
    src,
    loading,
    onError,
    onLoad,
    ignoreFallback: false,
    srcSet,
    sizes,
    crossOrigin
  });
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  const isImgLoaded = imageStatus === "loaded" && !isLoadingProp;
  const isLoading = imageStatus === "loading" || isLoadingProp;
  const isZoomed = originalProps.isZoomed;
  const Component = as || "img";
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const { w, h } = (0, import_react2.useMemo)(() => {
    return {
      w: props.width ? typeof props.width === "number" ? `${props.width}px` : props.width : "fit-content",
      h: props.height ? typeof props.height === "number" ? `${props.height}px` : props.height : "auto"
    };
  }, [props == null ? void 0 : props.width, props == null ? void 0 : props.height]);
  const showFallback = (!src || !isImgLoaded) && !!fallbackSrc;
  const showSkeleton = isLoading && !disableSkeleton;
  const slots = (0, import_react2.useMemo)(
    () => (0, import_theme.image)({
      ...variantProps,
      disableAnimation,
      showSkeleton
    }),
    [(0, import_shared_utils.objectToDeps)(variantProps), disableAnimation, showSkeleton]
  );
  const baseStyles = (0, import_shared_utils.clsx)(className, classNames == null ? void 0 : classNames.img);
  const getImgProps = (props2 = {}) => {
    const imgStyles = (0, import_shared_utils.clsx)(baseStyles, props2 == null ? void 0 : props2.className);
    return {
      src,
      ref: domRef,
      "data-loaded": (0, import_shared_utils.dataAttr)(isImgLoaded),
      className: slots.img({ class: imgStyles }),
      loading,
      srcSet,
      sizes,
      crossOrigin,
      ...otherProps,
      style: {
        ...(otherProps == null ? void 0 : otherProps.height) && { height: h },
        ...props2.style,
        ...otherProps.style
      }
    };
  };
  const getWrapperProps = (0, import_react.useCallback)(() => {
    const fallbackStyle = showFallback ? {
      backgroundImage: `url(${fallbackSrc})`
    } : {};
    return {
      className: slots.wrapper({ class: classNames == null ? void 0 : classNames.wrapper }),
      style: {
        ...fallbackStyle,
        maxWidth: w
      }
    };
  }, [slots, showFallback, fallbackSrc, classNames == null ? void 0 : classNames.wrapper]);
  const getBlurredImgProps = (0, import_react.useCallback)(() => {
    return {
      src,
      "aria-hidden": (0, import_shared_utils.dataAttr)(true),
      className: slots.blurredImg({ class: classNames == null ? void 0 : classNames.blurredImg })
    };
  }, [slots, src, classNames == null ? void 0 : classNames.blurredImg]);
  return {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    disableSkeleton,
    fallbackSrc,
    removeWrapper,
    isZoomed,
    isLoading,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps
  };
}

// src/image.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Image = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    isZoomed,
    fallbackSrc,
    removeWrapper,
    disableSkeleton,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps
  } = useImage({
    ...props,
    ref
  });
  const img = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ref: domRef, ...getImgProps() });
  if (removeWrapper) {
    return img;
  }
  const zoomed = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: slots.zoomedWrapper({ class: classNames == null ? void 0 : classNames.zoomedWrapper }), children: img });
  if (isBlurred) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...getWrapperProps(), children: [
      isZoomed ? zoomed : img,
      (0, import_react3.cloneElement)(img, getBlurredImgProps())
    ] });
  }
  if (isZoomed || !disableSkeleton || fallbackSrc) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...getWrapperProps(), children: [
      " ",
      isZoomed ? zoomed : img
    ] });
  }
  return img;
});
Image.displayName = "NextUI.Image";
var image_default = Image;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
