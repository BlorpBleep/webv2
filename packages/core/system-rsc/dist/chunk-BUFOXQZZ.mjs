import {
  mapPropsVariants
} from "./chunk-DRE2DOBH.mjs";

// src/extend-variants.js
import * as React from "react";
import { tv } from "@nextui-org/theme";
import clsx from "clsx";
function getSlots(variants) {
  return variants ? Object.values(variants).flatMap(Object.values).reduce((acc, slot) => {
    if (typeof slot === "object" && slot !== null && !(slot instanceof String)) {
      Object.keys(slot).forEach((key) => {
        if (!acc.hasOwnProperty(key)) {
          acc[key] = "";
        }
      });
    }
    return acc;
  }, {}) : {};
}
function getClassNamesWithProps({
  props = {},
  variants,
  slots,
  defaultVariants,
  compoundVariants,
  hasSlots,
  opts
}) {
  var _a, _b, _c;
  const keys = [];
  if (defaultVariants && typeof defaultVariants === "object") {
    for (const key in defaultVariants) {
      const value = defaultVariants[key];
      const propValue = props == null ? void 0 : props[key];
      if (propValue && propValue !== value) {
        keys.push(key);
      }
    }
  }
  const customTv = tv(
    {
      variants,
      defaultVariants: defaultVariants && typeof defaultVariants === "object" ? Object.keys(defaultVariants).filter((k) => !keys.includes(k)).reduce((o, k) => {
        o[k] = defaultVariants[k];
        return o;
      }, []) : defaultVariants,
      compoundVariants,
      ...hasSlots && { slots }
    },
    {
      twMerge: (_a = opts.twMerge) != null ? _a : true,
      twMergeConfig: (_b = opts.twMergeConfig) != null ? _b : {}
    }
  );
  const [baseProps, variantProps] = mapPropsVariants(props, customTv.variantKeys, false);
  const newProps = { ...defaultVariants, ...baseProps };
  let classNames = {};
  const result = customTv(variantProps);
  if (!hasSlots) {
    newProps.className = clsx(result, props.className);
  } else {
    Object.entries(result).forEach(([key, value]) => {
      const slotResult = value();
      if (typeof slotResult === "string") {
        classNames[key] = slotResult;
      }
    });
    Object.entries((_c = props.classNames) != null ? _c : {}).forEach(([key, value]) => {
      classNames[key] = clsx(classNames[key], value);
    });
  }
  if (Object.keys(classNames).length !== 0) {
    newProps.classNames = classNames;
  }
  return newProps;
}
function extendVariants(BaseComponent, styles = {}, opts = {}) {
  const { variants, defaultVariants, compoundVariants } = styles || {};
  const slots = getSlots(variants);
  const hasSlots = typeof slots === "object" && Object.keys(slots).length !== 0;
  const ForwardedComponent = React.forwardRef((originalProps = {}, ref) => {
    const newProps = React.useMemo(
      () => getClassNamesWithProps(
        {
          slots,
          variants,
          compoundVariants,
          props: originalProps,
          defaultVariants,
          hasSlots,
          opts
        },
        [originalProps]
      )
    );
    return React.createElement(BaseComponent, { ...originalProps, ...newProps, ref });
  });
  if (BaseComponent.getCollectionNode) {
    ForwardedComponent.getCollectionNode = (itemProps) => {
      const newProps = getClassNamesWithProps({
        slots,
        variants,
        compoundVariants,
        props: itemProps,
        defaultVariants,
        hasSlots,
        opts
      });
      return BaseComponent.getCollectionNode({ ...itemProps, ...newProps });
    };
  }
  ForwardedComponent.displayName = `Extended(${BaseComponent.displayName || BaseComponent.name})`;
  return ForwardedComponent;
}

export {
  extendVariants
};
