import * as React from 'react';
import { FC, ReactNode } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker, { TimePickerProps } from '@mui/lab/TimePicker';

type OwnProps = {
    label?: string | ReactNode;
};
const SecondsTimePicker: FC<Omit<TimePickerProps, 'renderInput'>> = ({
    label,
    ...rest
}: OwnProps & Omit<TimePickerProps, 'renderInput'>): JSX.Element => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                ampmInClock={false}
                views={['minutes', 'seconds']}
                inputFormat="mm:ss"
                mask="__:__"
                label={label}
                renderInput={(params: TextFieldProps) => <TextField fullWidth {...params} />}
                {...rest}
            />
        </LocalizationProvider>
    );
};

export default SecondsTimePicker;
