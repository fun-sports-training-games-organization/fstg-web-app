import React, { FC } from 'react';
import { FormControl, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

const TextField: FC<OutlinedInputProps> = (props) => {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <OutlinedInput type={'text'} {...props} />
        </FormControl>
    );
};

export default TextField;
