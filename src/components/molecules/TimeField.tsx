import React, { ChangeEvent, useState } from 'react';
import { FC } from 'react';
import TextField from '@mui/material/TextField';
import { Divider, FormLabel, Stack } from '@mui/material';
import { addLeadingZero } from '../../util/number-util';

type OwnProps = {
    label?: string;
    value?: number;
    setValue: (seconds: number) => void;
};
const TimePicker: FC<OwnProps> = ({ label, value, setValue }: OwnProps): JSX.Element => {
    const totalSeconds = value || 0;
    const hr = Math.floor(totalSeconds / 3600); // get hours - in case we need it some time...
    const min = Math.floor((totalSeconds - hr * 3600) / 60); // get minutes
    const sec = totalSeconds - hr * 3600 - min * 60; //  get seconds
    const [minutes, setMinutes] = useState<string>(addLeadingZero(min));
    const [seconds, setSeconds] = useState<string>(addLeadingZero(sec));

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseInt(event.target.value);
        if (numberValue >= 0 && numberValue <= 60) {
            if (event.target.name === 'seconds') {
                setSeconds(addLeadingZero(numberValue));
                const totalSeconds = parseInt(minutes) * 60 + numberValue;
                setValue(totalSeconds);
            } else {
                setMinutes(addLeadingZero(numberValue));
                const totalSeconds = numberValue * 60 + parseInt(seconds);
                setValue(totalSeconds);
            }
        }
    };
    return (
        <>
            {label && <FormLabel>{label}</FormLabel>}
            <Stack direction={'row'} alignItems={'center'}>
                <TextField
                    name="minutes"
                    label="mm"
                    value={minutes}
                    type={'number'}
                    onChange={onChange}
                    inputProps={{ min: 0, max: 60, maxLength: 2 }}
                />
                <Divider orientation={'vertical'}>:</Divider>
                <TextField
                    name="seconds"
                    label="ss"
                    value={seconds}
                    type={'number'}
                    onChange={onChange}
                    inputProps={{ min: 0, max: 60, maxLength: 2 }}
                />
            </Stack>
        </>
    );
};

export default TimePicker;
