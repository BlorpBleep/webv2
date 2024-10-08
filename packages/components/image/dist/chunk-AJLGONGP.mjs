"use client";

// src/use-image.ts
import { useCallback } from "react";
import {
  mapPropsVariants,
  useProviderContext
} from "@nextui-org/system";
import { image } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { useImage as useImageBase } from "@nextui-org/use-image";
import { useMemo } from "react";
function useImage(originalProps) {
  var _a, _b;
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, image.variantKeys);
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
  const imageStatus = useImageBase({
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
  const domRef = useDOMRef(ref);
  const { w, h } = useMemo(() => {
    return {
      w: props.width ? typeof props.width === "number" ? `${props.width}px` : props.width : "fit-content",
      h: props.height ? typeof props.height === "number" ? `${props.height}px` : props.height : "auto"
    };
  }, [props == null ? void 0 : props.width, props == null ? void 0 : props.height]);
  const showFallback = (!src || !isImgLoaded) && !!fallbackSrc;
  const showSkeleton = isLoading && !disableSkeleton;
  const slots = useMemo(
    () => image({
      ...variantProps,
      disableAnimation,
      showSkeleton
    }),
    [objectToDeps(variantProps), disableAnimation, showSkeleton]
  );
  const baseStyles = clsx(className, classNames == null ? void 0 : classNames.img);
  const getImgProps = (props2 = {}) => {
    const imgStyles = clsx(baseStyles, props2 == null ? void 0 : props2.className);
    return {
      src,
      ref: domRef,
      "data-loaded": dataAttr(isImgLoaded),
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
  const getWrapperProps = useCallback(() => {
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
  const getBlurredImgProps = useCallback(() => {
    return {
      src,
      "aria-hidden": dataAttr(true),
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

export {
  useImage
};
