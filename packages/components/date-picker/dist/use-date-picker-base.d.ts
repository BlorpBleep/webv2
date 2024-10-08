import * as _react_types_datepicker from '@react-types/datepicker';
import { AriaDatePickerBaseProps } from '@react-types/datepicker';
import * as _internationalized_date from '@internationalized/date';
import { DateValue } from '@internationalized/date';
import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';
import * as react from 'react';
import { ReactNode } from 'react';
import { DateInputProps, TimeInputProps } from '@nextui-org/date-input';
import { ButtonProps } from '@nextui-org/button';
import { CalendarProps } from '@nextui-org/calendar';
import { PopoverProps } from '@nextui-org/popover';
import { ValueBase } from '@react-types/shared';
import { DatePickerVariantProps } from '@nextui-org/theme';

type NextUIBaseProps<T extends DateValue> = Omit<HTMLNextUIProps<"div">, keyof AriaDatePickerBaseProps<T> | "onChange">;
interface Props<T extends DateValue> extends NextUIBaseProps<T> {
    /**
     * The icon to toggle the date picker popover. Usually a calendar icon.
     */
    selectorIcon?: ReactNode;
    /**
     * Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration.
     * @default visible
     */
    pageBehavior?: CalendarProps["pageBehavior"];
    /**
     * The number of months to display at once. Up to 3 months are supported.
     * Passing a number greater than 1 will disable the `showMonthAndYearPickers` prop.
     *
     * @default 1
     */
    visibleMonths?: CalendarProps["visibleMonths"];
    /**
     * The width to be applied to the calendar component.
     *
     * @default 256
     */
    calendarWidth?: number;
    /**
     * Top content to be rendered in the calendar component.
     */
    CalendarTopContent?: CalendarProps["topContent"];
    /**
     * Bottom content to be rendered in the calendar component.
     */
    CalendarBottomContent?: CalendarProps["bottomContent"];
    /**
     * Whether the calendar should show month and year pickers.
     *
     * @default false
     */
    showMonthAndYearPickers?: CalendarProps["showMonthAndYearPickers"];
    /**
     * Props to be passed to the popover component.
     *
     * @default { placement: "bottom", triggerScaleOnOpen: false, offset: 13 }
     */
    popoverProps?: Partial<PopoverProps>;
    /**
     * Props to be passed to the selector button component.
     * @default { size: "sm", variant: "light", radius: "full", isIconOnly: true }
     */
    selectorButtonProps?: Partial<ButtonProps>;
    /**
     * Props to be passed to the calendar component.
     * @default {}
     */
    calendarProps?: Partial<Omit<CalendarProps, "topContent" | "bottomContent">>;
    /**
     * Props to be passed to the time input component.
     *
     * @default {}
     */
    timeInputProps?: TimeInputProps;
    /**
     * Callback that is called for each date of the calendar. If it returns true, then the date is unavailable.
     */
    isDateUnavailable?: CalendarProps["isDateUnavailable"];
    /**
     * Whether to disable all animations in the date picker. Including the DateInput, Button, Calendar, and Popover.
     *
     * @default false
     */
    disableAnimation?: boolean;
}
type Variants = "color" | "size" | "isDisabled" | "disableAnimation" | "variant" | "radius" | "labelPlacement" | "fullWidth";
type UseDatePickerBaseProps<T extends DateValue> = Props<T> & DatePickerVariantProps & Pick<DateInputProps<T>, Variants | "ref" | "createCalendar" | "startContent" | "endContent" | "inputRef"> & Omit<AriaDatePickerBaseProps<T>, keyof ValueBase<T> | "validate">;
declare function useDatePickerBase<T extends DateValue>(originalProps: UseDatePickerBaseProps<T>): {
    domRef: react.RefObject<HTMLElement>;
    endContent: ReactNode;
    selectorIcon: ReactNode;
    createCalendar: ((calendar: _nextui_org_system.SupportedCalendars) => _internationalized_date.Calendar | null) | undefined;
    stringFormatter: any;
    hasMultipleMonths: boolean;
    slotsProps: {
        popoverProps: UseDatePickerBaseProps<T>["popoverProps"];
        selectorButtonProps: ButtonProps;
        calendarProps: CalendarProps;
    };
    timeMinValue: _internationalized_date.CalendarDateTime | _internationalized_date.ZonedDateTime | null;
    timeMaxValue: _internationalized_date.CalendarDateTime | _internationalized_date.ZonedDateTime | null;
    visibleMonths: number;
    isCalendarHeaderExpanded: boolean | undefined;
    disableAnimation: boolean;
    CalendarTopContent: ReactNode;
    CalendarBottomContent: ReactNode;
    variantProps: {} | Pick<UseDatePickerBaseProps<T>, "color" | "size" | "isDisabled" | "disableAnimation" | "variant" | "radius" | "labelPlacement" | "fullWidth">;
    dateInputProps: DateInputProps<DateValue>;
    timeInputProps: TimeInputProps<_react_types_datepicker.TimeValue>;
    popoverProps: PopoverProps;
    calendarProps: CalendarProps<DateValue>;
    userTimeInputProps: TimeInputProps<_react_types_datepicker.TimeValue>;
    selectorButtonProps: ButtonProps;
    selectorIconProps: {
        "data-slot": string;
    };
    onClose: () => void;
};
type UseDatePickerBaseReturn = ReturnType<typeof useDatePickerBase>;

export { UseDatePickerBaseProps, UseDatePickerBaseReturn, useDatePickerBase };
