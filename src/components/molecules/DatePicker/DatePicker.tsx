import React from 'react';

import { DatePickerProps } from './DatePicker.types';
import { DatePicker as MUIDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@date-io/date-fns';

import enLocale from 'date-fns/locale/en-US';
import itLocale from 'date-fns/locale/it';
import deLocale from 'date-fns/locale/de';
import frLocale from 'date-fns/locale/fr-CH';
import { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput';
import { TextField } from '@mui/material';

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
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MUIDatePicker
                mask={maskMap[locale]}
                renderInput={(params: MuiTextFieldProps) => <TextField fullWidth {...params} error={false} />}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
