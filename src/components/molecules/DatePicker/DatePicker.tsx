import React from 'react';

import { DatePickerProps } from './DatePicker.types';

import { Clear as ClearIcon } from '@mui/icons-material';
import { DatePicker as MUIDatePicker, LocalizationProvider, PickersDay } from '@mui/lab';
import AdapterDateFns from '@date-io/date-fns';

import enLocale from 'date-fns/locale/en-US';
import itLocale from 'date-fns/locale/it';
import deLocale from 'date-fns/locale/de';
import frLocale from 'date-fns/locale/fr-CH';
import { IconButton, TextField } from '@mui/material';
import { PickersDayProps } from '@mui/lab/PickersDay/PickersDay';
import { useTranslation } from 'react-i18next';
import { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput';

const localeMap: Record<string, Locale | string> = {
    en: enLocale,
    fr: frLocale,
    de: deLocale,
    it: itLocale
};

const maskMap: Record<string, string> = {
    de: '__.__.____',
    en: '__/__/____',
    fr: '__.__.____'
};

const DatePicker: React.FC<DatePickerProps> = ({ locale = 'de', ...props }: DatePickerProps) => {
    const {
        fullWidth,
        width,
        hideClearButton,
        startAdornment,
        endAdornment,
        withTime,
        noBorder,
        inputSx,
        labelSx,
        ...rest
    } = props;

    const { i18n } = useTranslation();
    // const InputType = withTime ? DateTimePicker : MUIDatePicker;
    const clearButton = (
        <IconButton
            aria-label={'clear-button'}
            edge="end"
            size="small"
            disabled={props.disabled}
            onClick={(): void => props.onChange(null)}
        >
            <ClearIcon style={{ fill: props.disabled ? 'grey' : 'red' }} />
        </IconButton>
    );

    const DEFAULT_DATE_TIME_FORMAT = 'dd.MM.yyyy HH:mm';
    const DEFAULT_DATE_FORMAT = 'dd.MM.yyyy';

    const renderDay = (
        day: unknown,
        selectedDates: Array<unknown | null>,
        pickersDayProps: PickersDayProps<unknown>
    ) => {
        return <PickersDay {...pickersDayProps} />;
    };

    const args: DatePickerProps = {
        renderDay,
        inputFormat: props.inputFormat ? props.inputFormat : withTime ? DEFAULT_DATE_TIME_FORMAT : DEFAULT_DATE_FORMAT,
        mask: maskMap[locale],
        InputProps: {
            inputProps: {
                startAdornment,
                endAdornment,
                noBorder,
                hideClearButton,
                clearButton,
                inputSx,
                labelSx,
                width,
                fullWidth
            }
        },
        ...rest
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[i18n.language.split('-')[0]]}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MUIDatePicker
                renderInput={(params: MuiTextFieldProps) => <TextField fullWidth error={false} {...params} />}
                {...args}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
