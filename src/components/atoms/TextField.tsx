import React, { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

type OwnProps = {
    error?: boolean;
    helperText?: string;
};

export type TextFieldProps = OwnProps & OutlinedInputProps;

const TextField: FC<TextFieldProps> = ({ id, label, helperText, error, ...rest }: TextFieldProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput id={id} label={label} {...rest} />
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default TextField;
