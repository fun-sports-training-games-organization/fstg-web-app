import React, { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

type OwnProps = {
    error?: boolean;
    helperText?: string;
    shrinkLabel?: boolean;
};

export type TextFieldProps = OwnProps & OutlinedInputProps;

const TextField: FC<TextFieldProps> = ({ id, label, helperText, shrinkLabel, error, ...rest }: TextFieldProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel shrink={shrinkLabel} htmlFor={id}>
                {label}
            </InputLabel>
            <OutlinedInput notched={shrinkLabel} id={id} label={label} {...rest} />
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </FormControl>
    );
};

export default TextField;
