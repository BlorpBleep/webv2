"use client";

// src/use-date-picker-base.ts
import { dataAttr } from "@nextui-org/shared-utils";
import { dateInput } from "@nextui-org/theme";
import { useCallback } from "react";
import { mapPropsVariants, useProviderContext } from "@nextui-org/system";
import { mergeProps } from "@react-aria/utils";
import { useDOMRef } from "@nextui-org/react-utils";
import { useLocalizedStringFormatter } from "@react-aria/i18n";
import { useControlledState } from "@react-stately/utils";

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
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, dateInput.variantKeys);
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
  const handleHeaderExpandedChange = useCallback(
    (isExpanded) => {
      onHeaderExpandedChange == null ? void 0 : onHeaderExpandedChange(isExpanded || false);
    },
    [onHeaderExpandedChange]
  );
  const [isCalendarHeaderExpanded, setIsCalendarHeaderExpanded] = useControlledState(isHeaderExpanded, isHeaderDefaultExpanded != null ? isHeaderDefaultExpanded : false, handleHeaderExpandedChange);
  const domRef = useDOMRef(ref);
  const disableAnimation = (_b = (_a = originalProps.disableAnimation) != null ? _a : globalContext == null ? void 0 : globalContext.disableAnimation) != null ? _b : false;
  let stringFormatter = useLocalizedStringFormatter(messages_default);
  const isDefaultColor = originalProps.color === "default" || !originalProps.color;
  const hasMultipleMonths = visibleMonths > 1;
  const placeholder = originalProps == null ? void 0 : originalProps.placeholderValue;
  const timePlaceholder = placeholder && "hour" in placeholder ? placeholder : null;
  const timeMinValue = originalProps.minValue && "hour" in originalProps.minValue ? originalProps.minValue : null;
  const timeMaxValue = originalProps.maxValue && "hour" in originalProps.maxValue ? originalProps.maxValue : null;
  const slotsProps = {
    popoverProps: mergeProps(
      {
        offset: 13,
        placement: "bottom",
        triggerScaleOnOpen: false,
        disableAnimation
      },
      userPopoverProps
    ),
    selectorButtonProps: mergeProps(
      {
        isIconOnly: true,
        radius: "full",
        size: "sm",
        variant: "light",
        disableAnimation
      },
      userSelectorButtonProps
    ),
    calendarProps: mergeProps(
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
    "data-invalid": dataAttr(originalProps == null ? void 0 : originalProps.isInvalid)
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

export {
  useDatePickerBase
};
