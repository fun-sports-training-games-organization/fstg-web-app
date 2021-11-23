import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type OwnProps = {
    value: Date | null | unknown;
    setValue: Dispatch<SetStateAction<Date | null | unknown>>;
    label?: string | ReactNode;
};
const SecondsTimePicker = ({ value, setValue, label }: OwnProps): JSX.Element => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                ampmInClock
                views={['minutes', 'seconds']}
                inputFormat="mm:ss"
                mask="__:__"
                label={label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
            />
        </LocalizationProvider>
    );
};

export default SecondsTimePicker;
