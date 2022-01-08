// import { BaseDateTimePickerProps, DateTimePickerView } from '@mui/lab/DateTimePicker/shared';
// import { InputFieldProps } from '../InputField/InputField.types';
// import { DateType } from '@date-io/type';
import { DatePickerProps as MUIDatePickerProps } from '@mui/lab/DatePicker';
import { SxProps } from '@mui/system';

export type Locale = 'en' | 'de' | 'fr' | 'it';

export interface CustomDatePickerProps {
    locale?: Locale;
    // label: string;
    // selectedDate?: Date | null;
    // // inputValue?: string;
    // handleDateChange: (date: Date | null) => void;
    // invalidDateMessage?: string;
    // variant?: 'outlined' | 'filled' | 'standard';
    // format?: string;
    // openTo?: DateTimePickerView;
    fullWidth?: boolean;
    width?: number;
    inputSx?: SxProps;
    labelSx?: SxProps;
    noBorder?: boolean;
    // disabled?: boolean;
    hideClearButton?: boolean;
    startAdornment?: JSX.Element;
    endAdornment?: JSX.Element;
    // autoFocus?: boolean;
    // placeholder?: string;
    // minDate?: Date;
    // maxDate?: Date;
    // minDateMessage?: React.ReactNode;
    // maxDateMessage?: React.ReactNode;
    // disablePast?: boolean;
    // disableFuture?: boolean;
    withTime?: boolean;
}

type PartialDateTimeProps = Omit<MUIDatePickerProps, 'renderInput'>;

export type DatePickerProps = /*InputFieldProps & */ CustomDatePickerProps & PartialDateTimeProps; // & CustomDatePickerProps;
