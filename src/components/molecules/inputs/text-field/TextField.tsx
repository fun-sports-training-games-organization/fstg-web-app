import React, { FC } from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material';

type OwnProps = {
    helperText?: string; // this is text that shows underneath the outlined input
    error?: boolean; // if true, the text underneath (if any) will show in 'error' color
    shrinkLabel?: boolean; // this forces the label to shrink and sit on the top left of the text field and creates a notch in the outlined input as well
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
