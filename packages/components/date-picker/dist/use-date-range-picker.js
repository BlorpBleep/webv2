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

// src/use-date-range-picker.ts
var use_date_range_picker_exports = {};
__export(use_date_range_picker_exports, {
  useDateRangePicker: () => useDateRangePicker
});
module.exports = __toCommonJS(use_date_range_picker_exports);
var import_system2 = require("@nextui-org/system");
var import_react2 = require("react");
var import_datepicker = require("@react-stately/datepicker");
var import_datepicker2 = require("@react-aria/datepicker");
var import_shared_utils2 = require("@nextui-org/shared-utils");
var import_utils3 = require("@react-aria/utils");
var import_theme2 = require("@nextui-org/theme");
var import_aria_utils = require("@nextui-org/aria-utils");

// src/use-date-picker-base.ts
var import_shared_utils = require("@nextui-org/shared-utils");
var import_theme = require("@nextui-org/theme");
var import_react = require("react");
var import_system = require("@nextui-org/system");
var import_utils = require("@react-aria/utils");
var import_react_utils = require("@nextui-org/react-utils");
var import_i18n = require("@react-aria/i18n");
var import_utils2 = require("@react-stately/utils");

// intl/messages.ts
var messages_default = {
  "ar-AE": {
    endTime: "\u0648\u0642\u062A \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",
    startTime: "\u0648\u0642\u062A \u0627\u0644\u0628\u062F\u0621",
    time: "\u0627\u0644\u0648\u0642\u062A"
  },
  "bg-BG": {
    endTime: "\u041A\u0440\u0430\u0435\u043D \u0447\u0430\u0441",
    startTime: "\u041D\u0430\u0447\u0430\u043B\u0435\u043D \u0447\u0430\u0441",
    time: "\u0412\u0440\u0435\u043C\u0435"
  },
  "cs-CZ": {
    endTime: "Kone\u010Dn\xFD \u010Das",
    startTime: "Po\u010D\xE1te\u010Dn\xED \u010Das",
    time: "\u010Cas"
  },
  "da-DK": {
    endTime: "Sluttidspunkt",
    startTime: "Starttidspunkt",
    time: "Klokkesl\xE6t"
  },
  "de-DE": {
    endTime: "Endzeit",
    startTime: "Startzeit",
    time: "Uhrzeit"
  },
  "el-GR": {
    endTime: "\u03A7\u03C1\u03CC\u03BD\u03BF\u03C2 \u03BB\u03AE\u03BE\u03B7\u03C2",
    startTime: "\u038F\u03C1\u03B1 \u03AD\u03BD\u03B1\u03C1\u03BE\u03B7\u03C2",
    time: "\u03A7\u03C1\u03CC\u03BD\u03BF\u03C2"
  },
  "en-US": {
    time: "Time",
    startTime: "Start time",
    endTime: "End time"
  },
  "es-ES": {
    endTime: "Hora de finalizaci\xF3n",
    startTime: "Hora de inicio",
    time: "Hora"
  },
  "et-EE": {
    endTime: "L\xF5puaeg",
    startTime: "Algusaeg",
    time: "Aeg"
  },
  "fi-FI": {
    endTime: "P\xE4\xE4ttymisaika",
    startTime: "Alkamisaika",
    time: "Aika"
  },
  "fr-FR": {
    endTime: "Heure de fin",
    startTime: "Heure de d\xE9but",
    time: "Heure"
  },
  "he-IL": {
    endTime: "\u05E9\u05E2\u05EA \u05E1\u05D9\u05D5\u05DD",
    startTime: "\u05E9\u05E2\u05EA \u05D4\u05EA\u05D7\u05DC\u05D4",
    time: "\u05D6\u05DE\u05DF"
  },
  "hr-HR": {
    endTime: "Vrijeme zavr\u0161etka",
    startTime: "Vrijeme po\u010Detka",
    time: "Vrijeme"
  },
  "hu-HU": {
    endTime: "Befejez\xE9s ideje",
    startTime: "Kezd\xE9s ideje",
    time: "Id\u0151"
  },
  "it-IT": {
    endTime: "Ora di fine",
    startTime: "Ora di inizio",
    time: "Ora"
  },
  "ja-JP": {
    endTime: "\u7D42\u4E86\u6642\u523B",
    startTime: "\u958B\u59CB\u6642\u523B",
    time: "\u6642\u523B"
  },
  "ko-KR": {
    endTime: "\uC885\uB8CC \uC2DC\uAC04",
    startTime: "\uC2DC\uC791 \uC2DC\uAC04",
    time: "\uC2DC\uAC04"
  },
  "it-LT": {
    endTime: "Pabaigos laikas",
    startTime: "Prad\u017Eios laikas",
    time: "Laikas"
  },
  "lv-LV": {
    endTime: "Beigu laiks",
    startTime: "S\u0101kuma laiks",
    time: "Laiks"
  },
  "nb-NO": {
    endTime: "Sluttid",
    startTime: "Starttid",
    time: "Tid"
  },
  "nl-NL": {
    endTime: "Eindtijd",
    startTime: "Starttijd",
    time: "Tijd"
  },
  "pl-PL": {
    endTime: "Godzina ko\u0144cowa",
    startTime: "Godzina pocz\u0105tkowa",
    time: "Godzina"
  },
  "pt-BR": {
    endTime: "Hora final",
    startTime: "Hora inicial",
    time: "Hora"
  },
  "pt-PT": {
    endTime: "Terminar tempo",
    startTime: "Iniciar tempo",
    time: "Tempo"
  },
  "ro-RO": {
    endTime: "Ora de sf\xE2r\u0219it",
    startTime: "Ora de \xEEnceput",
    time: "Ora"
  },
  "ru-RU": {
    endTime: "\u0412\u0440\u0435\u043C\u044F \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F",
    startTime: "\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u0447\u0430\u043B\u0430",
    time: "\u0412\u0440\u0435\u043C\u044F"
  },
  "sk-SK": {
    endTime: "\u010Cas ukon\u010Denia",
    startTime: "\u010Cas za\u010Diatku",
    time: "\u010Cas"
  },
  "sl-SI": {
    endTime: "Kon\u010Dni \u010Das",
    startTime: "Za\u010Detni \u010Das",
    time: "\u010Cas"
  },
  "sr-SP": {
    endTime: "Zavr\u0161no vreme",
    startTime: "Po\u010Detno vreme",
    time: "Vreme"
  },
  "sv-SE": {
    endTime: "Sluttid",
    startTime: "Starttid",
    time: "Tid"
  },
  "tr-TR": {
    endTime: "Biti\u015F saati",
    startTime: "Ba\u015Flang\u0131\xE7 saati",
    time: "Saat"
  },
  "uk-UA": {
    endTime: "\u0427\u0430\u0441 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F",
    startTime: "\u0427\u0430\u0441 \u043F\u043E\u0447\u0430\u0442\u043A\u0443",
    time: "\u0427\u0430\u0441"
  },
  "zh-CN": {
    endTime: "\u7ED3\u675F\u65F6\u95F4",
    startTime: "\u5F00\u59CB\u65F6\u95F4",
    time: "\u65F6\u95F4"
  },
  "zh-TW": {
    endTime: "\u7D50\u675F\u6642\u9593",
    startTime: "\u958B\u59CB\u6642\u9593",
    time: "\u6642\u9593"
  }
};

// src/use-date-picker-base.ts
function useDatePickerBase(originalProps) {
  var _a, _b, _c, _d;
  const globalContext = (0, import_system.useProviderContext)();
  const [props, variantProps] = (0, import_system.mapPropsVariants)(originalProps, import_theme.dateInput.variantKeys);
  const {
    as,
    ref,
    label,
    endContent,
    selectorIcon,
    inputRef,
    isInvalid,
    errorMessage,
    description,
    startContent,
    validationState,
    validationBehavior,
    visibleMonths = 1,
    pageBehavior = "visible",
    calendarWidth = 256,
    isDateUnavailable,
    shouldForceLeadingZeros,
    showMonthAndYearPickers = false,
    selectorButtonProps: userSelectorButtonProps = {},
    popoverProps: userPopoverProps = {},
    timeInputProps: userTimeInputProps = {},
    calendarProps: userCalendarProps = {},
    CalendarTopContent,
    CalendarBottomContent,
    createCalendar
  } = props;
  const {
    isHeaderExpanded,
    isHeaderDefaultExpanded,
    onHeaderExpandedChange,
    ...restUserCalendarProps
  } = userCalendarProps;
  const handleHeaderExpandedChange = (0, import_react.useCallback)(
    (isExpanded) => {
      onHeaderExpandedChange == null ? void 0 : onHeaderExpandedChange(isExpanded || false);
    },
    [onHeaderExpandedChange]
  );
  const [isCalendarHeaderExpanded, setIsCalendarHeaderExpanded] = (0, import_utils2.useControlledState)(isHeaderExpanded, isHeaderDefaultExpanded != null ? isHeaderDefaultExpanded : false, handleHeaderExpandedChange);
  const domRef = (0, import_react_utils.useDOMRef)(ref);
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  let stringFormatter = (0, import_i18n.useLocalizedStringFormatter)(messages_default);
  const isDefaultColor = originalProps.color === "default" || !originalProps.color;
  const hasMultipleMonths = visibleMonths > 1;
  const placeholder = originalProps == null ? void 0 : originalProps.placeholderValue;
  const timePlaceholder = placeholder && "hour" in placeholder ? placeholder : null;
  const timeMinValue = originalProps.minValue && "hour" in originalProps.minValue ? originalProps.minValue : null;
  const timeMaxValue = originalProps.maxValue && "hour" in originalProps.maxValue ? originalProps.maxValue : null;
  const slotsProps = {
    popoverProps: (0, import_utils.mergeProps)(
      {
        offset: 13,
        placement: "bottom",
        triggerScaleOnOpen: false,
        disableAnimation
      },
      userPopoverProps
    ),
    selectorButtonProps: (0, import_utils.mergeProps)(
      {
        isIconOnly: true,
        radius: "full",
        size: "sm",
        variant: "light",
        disableAnimation
      },
      userSelectorButtonProps
    ),
    calendarProps: (0, import_utils.mergeProps)(
      {
        showHelper: false,
        visibleMonths,
        pageBehavior,
        isDateUnavailable,
        showMonthAndYearPickers,
        isHeaderExpanded: isCalendarHeaderExpanded,
        onHeaderExpandedChange: setIsCalendarHeaderExpanded,
        color: isDefaultColor ? "primary" : originalProps.color,
        disableAnimation
      },
      restUserCalendarProps
    )
  };
  const dateInputProps = {
    as,
    label,
    ref: domRef,
    inputRef,
    description,
    startContent,
    validationState,
    shouldForceLeadingZeros,
    isInvalid,
    errorMessage,
    validationBehavior,
    "data-invalid": (0, import_shared_utils.dataAttr)(originalProps == null ? void 0 : originalProps.isInvalid)
  };
  const timeInputProps = {
    ...userTimeInputProps,
    size: "sm",
    labelPlacement: "outside-left",
    label: (userTimeInputProps == null ? void 0 : userTimeInputProps.label) || stringFormatter.format("time"),
    placeholderValue: timePlaceholder,
    hourCycle: props.hourCycle,
    hideTimeZone: props.hideTimeZone,
    validationBehavior
  };
  const popoverProps = {
    ...slotsProps.popoverProps,
    children: (_d = (_c = slotsProps.popoverProps) == null ? void 0 : _c.children) != null ? _d : [],
    triggerRef: domRef
  };
  const calendarProps = {
    ...slotsProps.calendarProps,
    calendarWidth,
    "data-slot": "calendar"
  };
  const selectorButtonProps = {
    ...slotsProps.selectorButtonProps,
    "data-slot": "selector-button"
  };
  const selectorIconProps = {
    "data-slot": "selector-icon"
  };
  const onClose = () => {
    if (isHeaderExpanded === void 0) {
      setIsCalendarHeaderExpanded(false);
    }
  };
  return {
    domRef,
    endContent,
    selectorIcon,
    createCalendar,
    stringFormatter,
    hasMultipleMonths,
    slotsProps,
    timeMinValue,
    timeMaxValue,
    visibleMonths,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    variantProps,
    dateInputProps,
    timeInputProps,
    popoverProps,
    calendarProps,
    userTimeInputProps,
    selectorButtonProps,
    selectorIconProps,
    onClose
  };
}

// src/use-date-range-picker.ts
function useDateRangePicker({
  as,
  isInvalid: isInvalidProp,
  description,
  startContent,
  endContent,
  selectorIcon,
  errorMessage,
  className,
  classNames,
  ...originalProps
}) {
  var _a, _b;
  const globalContext = (0, import_system2.useProviderContext)();
  const validationBehavior = (_b = (_a = originalProps.validationBehavior) != null ? _a : globalContext == null ? void 0 : globalContext.validationBehavior) != null ? _b : "aria";
  const {
    domRef,
    slotsProps,
    createCalendar,
    stringFormatter,
    timeMinValue,
    timeMaxValue,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    timeInputProps,
    popoverProps,
    calendarProps,
    variantProps,
    userTimeInputProps,
    hasMultipleMonths,
    selectorButtonProps,
    selectorIconProps
  } = useDatePickerBase({ ...originalProps, validationBehavior });
  let state = (0, import_datepicker.useDateRangePickerState)({
    ...originalProps,
    validationBehavior,
    shouldCloseOnSelect: () => !state.hasTime
  });
  const popoverTriggerRef = (0, import_react2.useRef)(null);
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps: ariaCalendarProps,
    validationDetails,
    validationErrors,
    descriptionProps,
    errorMessageProps,
    isInvalid: isAriaInvalid
  } = (0, import_datepicker2.useDateRangePicker)({ ...originalProps, validationBehavior }, state, domRef);
  const isInvalid = isInvalidProp || isAriaInvalid;
  const slots = (0, import_react2.useMemo)(
    () => (0, import_theme2.dateRangePicker)({
      ...variantProps,
      className
    }),
    [(0, import_shared_utils2.objectToDeps)(variantProps), className]
  );
  const timeGranularity = state.granularity === "hour" || state.granularity === "minute" || state.granularity === "second" ? state.granularity : null;
  const showTimeField = !!timeGranularity;
  const labelPlacement = (0, import_react2.useMemo)(() => {
    var _a2;
    if ((!originalProps.labelPlacement || originalProps.labelPlacement === "inside") && !originalProps.label) {
      return "outside";
    }
    return (_a2 = originalProps.labelPlacement) != null ? _a2 : "inside";
  }, [originalProps.labelPlacement, originalProps.label]);
  const shouldLabelBeOutside = labelPlacement === "outside" || labelPlacement === "outside-left";
  const getStartTimeInputProps = () => {
    var _a2, _b2, _c;
    if (!showTimeField)
      return {};
    return {
      ...timeInputProps,
      label: stringFormatter.format("startTime"),
      value: ((_a2 = state.timeRange) == null ? void 0 : _a2.start) || null,
      onChange: (v) => state.setTime("start", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
      classNames: {
        base: slots.timeInput({
          class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.timeInput, (_b2 = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _b2.base)
        }),
        label: slots.timeInputLabel({
          class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.timeInputLabel, (_c = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _c.label)
        })
      }
    };
  };
  const getEndTimeInputProps = () => {
    var _a2, _b2, _c;
    if (!showTimeField)
      return {};
    return {
      ...timeInputProps,
      label: stringFormatter.format("endTime"),
      value: ((_a2 = state.timeRange) == null ? void 0 : _a2.end) || null,
      onChange: (v) => state.setTime("end", v),
      granularity: timeGranularity,
      minValue: timeMinValue,
      maxValue: timeMaxValue,
      classNames: {
        base: slots.timeInput({
          class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.timeInput, (_b2 = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _b2.base)
        }),
        label: slots.timeInputLabel({
          class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.timeInputLabel, (_c = userTimeInputProps == null ? void 0 : userTimeInputProps.classNames) == null ? void 0 : _c.label)
        })
      }
    };
  };
  const getPopoverProps = (props = {}) => {
    var _a2, _b2;
    return {
      state,
      dialogProps,
      ...props,
      ...popoverProps,
      triggerRef: popoverTriggerRef,
      classNames: {
        content: slots.popoverContent({
          class: (0, import_shared_utils2.clsx)(
            classNames == null ? void 0 : classNames.popoverContent,
            (_b2 = (_a2 = slotsProps.popoverProps) == null ? void 0 : _a2.classNames) == null ? void 0 : _b2["content"],
            props.className
          )
        })
      },
      shouldCloseOnInteractOutside: (popoverProps == null ? void 0 : popoverProps.shouldCloseOnInteractOutside) ? popoverProps.shouldCloseOnInteractOutside : (element) => (0, import_aria_utils.ariaShouldCloseOnInteractOutside)(element, popoverTriggerRef, state)
    };
  };
  const getCalendarProps = () => {
    var _a2, _b2;
    return {
      ...ariaCalendarProps,
      ...calendarProps,
      classNames: {
        ...calendarProps.classNames,
        base: slots.calendar({ class: (0, import_theme2.cn)((_a2 = calendarProps == null ? void 0 : calendarProps.classNames) == null ? void 0 : _a2.base, classNames == null ? void 0 : classNames.calendar) }),
        content: slots.calendarContent({
          class: (0, import_theme2.cn)((_b2 = calendarProps == null ? void 0 : calendarProps.classNames) == null ? void 0 : _b2.content, classNames == null ? void 0 : classNames.calendarContent)
        })
      }
    };
  };
  const getSelectorButtonProps = () => {
    return {
      ...buttonProps,
      ...selectorButtonProps,
      onPress: state.toggle,
      className: slots.selectorButton({ class: classNames == null ? void 0 : classNames.selectorButton })
    };
  };
  const getSeparatorProps = () => {
    return {
      "data-slot": "separator",
      className: slots.separator({ class: classNames == null ? void 0 : classNames.separator })
    };
  };
  const getSelectorIconProps = () => {
    return {
      ...selectorIconProps,
      className: slots.selectorIcon({ class: classNames == null ? void 0 : classNames.selectorIcon })
    };
  };
  const baseStyles = (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.base, className);
  const dateInputSlots = (0, import_react2.useMemo)(
    () => (0, import_theme2.dateInput)({
      ...variantProps,
      labelPlacement,
      className
    }),
    [(0, import_shared_utils2.objectToDeps)(variantProps), className]
  );
  const getStartDateInputProps = (props = {}) => {
    return {
      ...startFieldProps,
      isInvalid,
      "data-slot": "start-input",
      slots: dateInputSlots,
      createCalendar,
      ...(0, import_utils3.mergeProps)(variantProps, startFieldProps, {
        fullWidth: true,
        disableAnimation
      }),
      "data-open": (0, import_shared_utils2.dataAttr)(state.isOpen),
      classNames,
      style: {
        ...props.style,
        maxWidth: "fit-content"
      },
      className: dateInputSlots.input({
        class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.input, props == null ? void 0 : props.className)
      })
    };
  };
  const getEndDateInputProps = (props = {}) => {
    return {
      ...endFieldProps,
      isInvalid,
      "data-slot": "end-input",
      slots: dateInputSlots,
      createCalendar,
      ...(0, import_utils3.mergeProps)(variantProps, endFieldProps, {
        fullWidth: true,
        disableAnimation
      }),
      "data-open": (0, import_shared_utils2.dataAttr)(state.isOpen),
      classNames,
      className: dateInputSlots.input({
        class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.input, props == null ? void 0 : props.className)
      })
    };
  };
  const getLabelProps = (props) => {
    return {
      ...props,
      ...labelProps,
      "data-slot": "label",
      className: dateInputSlots.label({
        class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.label, props == null ? void 0 : props.className)
      })
    };
  };
  const getInputWrapperProps = (props = {}) => {
    return {
      ref: domRef,
      ...props,
      ...groupProps,
      "data-slot": "input-wrapper",
      className: dateInputSlots.inputWrapper({
        class: classNames == null ? void 0 : classNames.inputWrapper
      }),
      onClick: labelProps.onClick
    };
  };
  const getInnerWrapperProps = (props) => {
    return {
      ...props,
      ref: popoverTriggerRef,
      "data-slot": "inner-wrapper",
      className: dateInputSlots.innerWrapper({
        class: classNames == null ? void 0 : classNames.innerWrapper
      })
    };
  };
  const getHelperWrapperProps = (props) => {
    return {
      ...props,
      "data-slot": "helper-wrapper",
      className: dateInputSlots.helperWrapper({
        class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.helperWrapper, props == null ? void 0 : props.className)
      })
    };
  };
  const getErrorMessageProps = (props = {}) => {
    return {
      ...props,
      ...errorMessageProps,
      "data-slot": "error-message",
      className: dateInputSlots.errorMessage({
        class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.errorMessage, props == null ? void 0 : props.className)
      })
    };
  };
  const getDescriptionProps = (props = {}) => {
    return {
      ...props,
      ...descriptionProps,
      "data-slot": "description",
      className: dateInputSlots.description({
        class: (0, import_shared_utils2.clsx)(classNames == null ? void 0 : classNames.description, props == null ? void 0 : props.className)
      })
    };
  };
  const getDateInputGroupProps = () => {
    return {
      as,
      label: originalProps.label,
      description,
      endContent,
      errorMessage,
      isInvalid,
      startContent,
      validationDetails,
      validationErrors,
      shouldLabelBeOutside,
      "data-slot": "base",
      "data-required": (0, import_shared_utils2.dataAttr)(originalProps.isRequired),
      "data-disabled": (0, import_shared_utils2.dataAttr)(originalProps.isDisabled),
      "data-readonly": (0, import_shared_utils2.dataAttr)(originalProps.isReadOnly),
      "data-invalid": (0, import_shared_utils2.dataAttr)(isInvalid),
      "data-has-start-content": (0, import_shared_utils2.dataAttr)(!!startContent),
      "data-has-multiple-months": (0, import_shared_utils2.dataAttr)(hasMultipleMonths),
      "data-has-end-content": (0, import_shared_utils2.dataAttr)(!!endContent),
      descriptionProps: getDescriptionProps(),
      errorMessageProps: getErrorMessageProps(),
      groupProps: getInputWrapperProps(),
      helperWrapperProps: getHelperWrapperProps(),
      labelProps: getLabelProps(),
      wrapperProps: getInnerWrapperProps(),
      className: dateInputSlots.base({ class: baseStyles })
    };
  };
  return {
    state,
    label: originalProps.label,
    slots,
    classNames,
    endContent,
    selectorIcon,
    showTimeField,
    isCalendarHeaderExpanded,
    disableAnimation,
    CalendarTopContent,
    CalendarBottomContent,
    getStartDateInputProps,
    getEndDateInputProps,
    getStartTimeInputProps,
    getEndTimeInputProps,
    getPopoverProps,
    getSelectorButtonProps,
    getCalendarProps,
    getSeparatorProps,
    getSelectorIconProps,
    getDateInputGroupProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDateRangePicker
});
