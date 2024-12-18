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

// src/input.tsx
var input_exports = {};
__export(input_exports, {
  default: () => input_default
});
module.exports = __toCommonJS(input_exports);
var import_shared_icons = require("@nextui-org/shared-icons");
var import_react2 = require("react");
var import_system2 = require("@nextui-org/system");

// src/use-input.ts
var import_system = require("@nextui-org/system");
var import_use_safe_layout_effect = require("@nextui-org/use-safe-layout-effect");
var import_focus = require("@react-aria/focus");
var import_theme = require("@nextui-org/theme");
var import_react_utils = require("@nextui-org/react-utils");
var import_interactions = require("@react-aria/interactions");
var import_shared_utils = require("@nextui-org/shared-utils");
var import_utils = require("@react-stately/utils");
var import_react = require("react");
var import_utils2 = require("@react-aria/utils");
var import_textfield = require("@react-aria/textfield");
function useInput(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.input.variantKeys);
  const {
    ref,
    as,
    type,
    label,
    baseRef,
    wrapperRef,
    description,
    className,
    classNames,
    autoFocus,
    startContent,
    endContent,
    onClear,
    onChange,
    validationState,
    validationBehavior = (_a = globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _a : "aria",
    innerWrapperRef: innerWrapperRefProp,
    onValueChange = () => {
    },
    ...otherProps
  } = props;
  const handleValueChange = (0, import_react.useCallback)(
    (value) => {
      onValueChange(value != null ? value : "");
    },
    [onValueChange]
  );
  const [isFocusWithin, setFocusWithin] = (0, import_react.useState)(false);
  const Component = as || "div";
  const disableAnimation = (_c = (_b = originalProps.disableAnimation) != null ? _b : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _c : false;
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const baseDomRef = (0, import_react_utils.useDOMRef)(baseRef);
  const inputWrapperRef = (0, import_react_utils.useDOMRef)(wrapperRef);
  const innerWrapperRef = (0, import_react_utils.useDOMRef)(innerWrapperRefProp);
  const [inputValue, setInputValue] = (0, import_utils.useControlledState)(
    props.value,
    (_d = props.defaultValue) != null ? _d : "",
    handleValueChange
  );
  const isFilledByDefault = ["date", "time", "month", "week", "range"].includes(type);
  const isFilled = !(0, import_shared_utils.isEmpty)(inputValue) || isFilledByDefault;
  const isFilledWithin = isFilled || isFocusWithin;
  const isHiddenType = type === "hidden";
  const isMultiline = originalProps.isMultiline;
  const isFileTypeInput = type === "file";
  const baseStyles = (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.base, className, isFilled ? "is-filled" : "");
  const handleClear = (0, import_react.useCallback)(() => {
    var _a2;
    setInputValue("");
    onClear == null ? void 0 : onClear();
    (_a2 = domRef.current) == null ? void 0 : _a2.focus();
  }, [setInputValue, onClear]);
  (0, import_use_safe_layout_effect.useSafeLayoutEffect)(() => {
    if (!domRef.current)
      return;
    setInputValue(domRef.current.value);
  }, [domRef.current]);
  const {
    labelProps,
    inputProps,
    isInvalid: isAriaInvalid,
    validationErrors,
    validationDetails,
    descriptionProps,
    errorMessageProps
  } = (0, import_textfield.useTextField)(
    {
      ...originalProps,
      validationBehavior,
      autoCapitalize: originalProps.autoCapitalize,
      value: inputValue,
      "aria-label": (0, import_shared_utils.safeAriaLabel)(
        originalProps["aria-label"],
        originalProps.label,
        originalProps.placeholder
      ),
      inputElementType: isMultiline ? "textarea" : "input",
      onChange: setInputValue
    },
    domRef
  );
  if (isFileTypeInput) {
    delete inputProps.value;
    delete inputProps.onChange;
  }
  const { isFocusVisible, isFocused, focusProps } = (0, import_focus.useFocusRing)({
    autoFocus,
    isTextInput: true
  });
  const { isHovered, hoverProps } = (0, import_interactions.useHover)({ isDisabled: !!(originalProps == null ? void 0 : originalProps.isDisabled) });
  const { focusProps: clearFocusProps, isFocusVisible: isClearButtonFocusVisible } = (0, import_focus.useFocusRing)();
  const { focusWithinProps } = (0, import_interactions.useFocusWithin)({
    onFocusWithinChange: setFocusWithin
  });
  const { pressProps: clearPressProps } = (0, import_interactions.usePress)({
    isDisabled: !!(originalProps == null ? void 0 : originalProps.isDisabled),
    onPress: handleClear
  });
  const isInvalid = validationState === "invalid" || originalProps.isInvalid || isAriaInvalid;
  const labelPlacement = (0, import_react.useMemo)(() => {
    var _a2;
    if (isFileTypeInput) {
      if (!originalProps.labelPlacement)
        return "outside";
      if (originalProps.labelPlacement === "inside") {
        (0, import_shared_utils.warn)("Input with file type doesn't support inside label. Converting to outside ...");
        return "outside";
      }
    }
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !label) {
      return "outside";
    }
    return (_a2 = originalProps.labelPlacement) != null ? _a2 : "inside";
  }, [originalProps.labelPlacement, label]);
  const errorMessage = typeof props.errorMessage === "function" ? props.errorMessage({ isInvalid, validationErrors, validationDetails }) : props.errorMessage || (validationErrors == null ? void 0 : validationErrors.join(" "));
  const isClearable = !!onClear || originalProps.isClearable;
  const hasElements = !!label || !!description || !!errorMessage;
  const hasPlaceholder = !!props.placeholder;
  const hasLabel = !!label;
  const hasHelper = !!description || !!errorMessage;
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const shouldLabelBeInside = labelPlacement === "inside";
  const isPlaceholderShown = domRef.current ? (!domRef.current.value || domRef.current.value === "" || !inputValue || inputValue === "") && hasPlaceholder : false;
  const isOutsideLeft = labelPlacement === "outside-left";
  const hasStartContent = !!startContent;
  const isLabelOutside = shouldLabelBeOutside ? labelPlacement === "outside-left" || hasPlaceholder || labelPlacement === "outside" && hasStartContent : false;
  const isLabelOutsideAsPlaceholder = labelPlacement === "outside" && !hasPlaceholder && !hasStartContent;
  const slots = (0, import_react.useMemo)(
    () => (0, import_theme.input)({
      ...variantProps,
      isInvalid,
      labelPlacement,
      isClearable,
      disableAnimation
    }),
    [
      (0, import_shared_utils.objectToDeps)(variantProps),
      isInvalid,
      labelPlacement,
      isClearable,
      hasStartContent,
      disableAnimation
    ]
  );
  const getBaseProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({ class: baseStyles }),
        "data-slot": "base",
        "data-filled": (0, import_shared_utils.dataAttr)(
          isFilled || hasPlaceholder || hasStartContent || isPlaceholderShown || isFileTypeInput
        ),
        "data-filled-within": (0, import_shared_utils.dataAttr)(
          isFilledWithin || hasPlaceholder || hasStartContent || isPlaceholderShown || isFileTypeInput
        ),
        "data-focus-within": (0, import_shared_utils.dataAttr)(isFocusWithin),
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
        "data-readonly": (0, import_shared_utils.dataAttr)(originalProps.isReadOnly),
        "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
        "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
        "data-required": (0, import_shared_utils.dataAttr)(originalProps.isRequired),
        "data-invalid": (0, import_shared_utils.dataAttr)(isInvalid),
        "data-disabled": (0, import_shared_utils.dataAttr)(originalProps.isDisabled),
        "data-has-elements": (0, import_shared_utils.dataAttr)(hasElements),
        "data-has-helper": (0, import_shared_utils.dataAttr)(hasHelper),
        "data-has-label": (0, import_shared_utils.dataAttr)(hasLabel),
        "data-has-value": (0, import_shared_utils.dataAttr)(!isPlaceholderShown),
        "data-hidden": (0, import_shared_utils.dataAttr)(isHiddenType),
        ...focusWithinProps,
        ...props2
      };
    },
    [
      slots,
      baseStyles,
      isFilled,
      isFocused,
      isHovered,
      isInvalid,
      hasHelper,
      hasLabel,
      hasElements,
      isPlaceholderShown,
      hasStartContent,
      isFocusWithin,
      isFocusVisible,
      isFilledWithin,
      hasPlaceholder,
      focusWithinProps,
      isHiddenType,
      originalProps.isReadOnly,
      originalProps.isRequired,
      originalProps.isDisabled
    ]
  );
  const getLabelProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        "data-slot": "label",
        className: slots.label({ class: classNames == null ? void 0 : classNames.label }),
        ...labelProps,
        ...props2
      };
    },
    [slots, labelProps, classNames == null ? void 0 : classNames.label]
  );
  const getInputProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: domRef,
        "data-slot": "input",
        "data-filled": (0, import_shared_utils.dataAttr)(isFilled),
        "data-filled-within": (0, import_shared_utils.dataAttr)(isFilledWithin),
        "data-has-start-content": (0, import_shared_utils.dataAttr)(hasStartContent),
        "data-has-end-content": (0, import_shared_utils.dataAttr)(!!endContent),
        className: slots.input({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.input, isFilled ? "is-filled" : "")
        }),
        ...(0, import_utils2.mergeProps)(
          focusProps,
          inputProps,
          (0, import_react_utils.filterDOMProps)(otherProps, {
            enabled: true,
            labelable: true,
            omitEventNames: new Set(Object.keys(inputProps))
          }),
          props2
        ),
        "aria-readonly": (0, import_shared_utils.dataAttr)(originalProps.isReadOnly),
        onChange: (0, import_utils2.chain)(inputProps.onChange, onChange)
      };
    },
    [
      slots,
      inputValue,
      focusProps,
      inputProps,
      otherProps,
      isFilled,
      isFilledWithin,
      hasStartContent,
      endContent,
      classNames == null ? void 0 : classNames.input,
      originalProps.isReadOnly,
      originalProps.isRequired,
      onChange
    ]
  );
  const getInputWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ref: inputWrapperRef,
        "data-slot": "input-wrapper",
        "data-hover": (0, import_shared_utils.dataAttr)(isHovered),
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isFocusVisible),
        "data-focus": (0, import_shared_utils.dataAttr)(isFocused),
        className: slots.inputWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.inputWrapper, isFilled ? "is-filled" : "")
        }),
        ...(0, import_utils2.mergeProps)(props2, hoverProps),
        onClick: (e) => {
          if (domRef.current && e.currentTarget === e.target) {
            domRef.current.focus();
          }
        },
        style: {
          cursor: "text",
          ...props2.style
        }
      };
    },
    [slots, isHovered, isFocusVisible, isFocused, inputValue, classNames == null ? void 0 : classNames.inputWrapper]
  );
  const getInnerWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ref: innerWrapperRef,
        "data-slot": "inner-wrapper",
        onClick: (e) => {
          if (domRef.current && e.currentTarget === e.target) {
            domRef.current.focus();
          }
        },
        className: slots.innerWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.innerWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.innerWrapper]
  );
  const getMainWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "main-wrapper",
        className: slots.mainWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.mainWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.mainWrapper]
  );
  const getHelperWrapperProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        "data-slot": "helper-wrapper",
        className: slots.helperWrapper({
          class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.helperWrapper, props2 == null ? void 0 : props2.className)
        })
      };
    },
    [slots, classNames == null ? void 0 : classNames.helperWrapper]
  );
  const getDescriptionProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...descriptionProps,
        "data-slot": "description",
        className: slots.description({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.description, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, classNames == null ? void 0 : classNames.description]
  );
  const getErrorMessageProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        ...errorMessageProps,
        "data-slot": "error-message",
        className: slots.errorMessage({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.errorMessage, props2 == null ? void 0 : props2.className) })
      };
    },
    [slots, errorMessageProps, classNames == null ? void 0 : classNames.errorMessage]
  );
  const getClearButtonProps = (0, import_react.useCallback)(
    (props2 = {}) => {
      return {
        ...props2,
        role: "button",
        tabIndex: 0,
        "aria-label": "clear input",
        "data-slot": "clear-button",
        "data-focus-visible": (0, import_shared_utils.dataAttr)(isClearButtonFocusVisible),
        className: slots.clearButton({ class: (0, import_shared_utils.clsx)(classNames == null ? void 0 : classNames.clearButton, props2 == null ? void 0 : props2.className) }),
        ...(0, import_utils2.mergeProps)(clearPressProps, clearFocusProps)
      };
    },
    [slots, isClearButtonFocusVisible, clearPressProps, clearFocusProps, classNames == null ? void 0 : classNames.clearButton]
  );
  return {
    Component,
    classNames,
    domRef,
    label,
    description,
    startContent,
    endContent,
    labelPlacement,
    isClearable,
    hasHelper,
    hasStartContent,
    isLabelOutside,
    isOutsideLeft,
    isLabelOutsideAsPlaceholder,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    hasPlaceholder,
    isInvalid,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getMainWrapperProps,
    getInputWrapperProps,
    getInnerWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps
  };
}

// src/input.tsx
var Input = (0, import_system2.forwardRef)((props, ref) => {
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasHelper,
    isOutsideLeft,
    shouldLabelBeOutside,
    errorMessage,
    isInvalid,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps
  } = useInput({ ...props, ref });
  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;
  const end = (0, import_react2.useMemo)(() => {
    if (isClearable) {
      return <span {...getClearButtonProps()}>{endContent || <import_shared_icons.CloseFilledIcon />}</span>;
    }
    return endContent;
  }, [isClearable, getClearButtonProps]);
  const helperWrapper = (0, import_react2.useMemo)(() => {
    if (!hasHelper)
      return null;
    return <div {...getHelperWrapperProps()}>{isInvalid && errorMessage ? <div {...getErrorMessageProps()}>{errorMessage}</div> : description ? <div {...getDescriptionProps()}>{description}</div> : null}</div>;
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps
  ]);
  const innerWrapper = (0, import_react2.useMemo)(() => {
    return <div {...getInnerWrapperProps()}>
      {startContent}
      <input {...getInputProps()} />
      {end}
    </div>;
  }, [startContent, end, getInputProps, getInnerWrapperProps]);
  const mainWrapper = (0, import_react2.useMemo)(() => {
    if (shouldLabelBeOutside) {
      return <div {...getMainWrapperProps()}>
        <div {...getInputWrapperProps()}>
          {!isOutsideLeft ? labelContent : null}
          {innerWrapper}
        </div>
        {helperWrapper}
      </div>;
    }
    return <>
      <div {...getInputWrapperProps()}>
        {labelContent}
        {innerWrapper}
      </div>
      {helperWrapper}
    </>;
  }, [
    labelPlacement,
    helperWrapper,
    shouldLabelBeOutside,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps
  ]);
  return <Component {...getBaseProps()}>
    {isOutsideLeft ? labelContent : null}
    {mainWrapper}
  </Component>;
});
Input.displayName = "NextUI.Input";
var input_default = Input;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
