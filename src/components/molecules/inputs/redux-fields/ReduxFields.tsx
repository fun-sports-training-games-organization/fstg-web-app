import { WrappedFieldProps } from 'redux-form/lib/Field';
import TextField from '../text-field/TextField';
import PasswordField from '../password-field/PasswordField';
import FileChooser from '../file-input/FileChooser';
import EmailField from '../email-field/EmailField';
import { RadioGroup } from '@mui/material';

import React from 'react';
import DatePicker from '../../DatePicker';

export const renderFileChooser = (props: WrappedFieldProps & { label: string | undefined }): JSX.Element => {
    const {
        // eslint-disable-next-line unused-imports/no-unused-vars
        input: { value: omitValue, ...input },
        label
    } = props;

    return <FileChooser {...input} label={label} />;
};

export const renderTextField = (props: WrappedFieldProps & { label: string | undefined }): JSX.Element => {
    const {
        input,
        label,
        meta: { touched, error }
    } = props;
    return <TextField {...input} label={label} helperText={touched && error} error={!!error} />;
};
export const renderNumberField = (props: WrappedFieldProps & { label: string | undefined }): JSX.Element => {
    const {
        input,
        label,
        meta: { touched, error }
    } = props;
    return (
        <TextField
            {...input}
            label={label}
            helperText={touched && error}
            error={!!error}
            inputProps={{ pattern: '[0-9]*' }}
        />
    );
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const renderRadioGroup = ({ input, ...rest }: any): JSX.Element => (
    <RadioGroup {...input} {...rest} value={input.value} onChange={(event, value) => input.onChange(value)} />
);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const renderDatePicker = ({ input, ...rest }: any): JSX.Element => (
    <DatePicker {...input} {...rest} value={input.value} onChange={(value) => input.onChange(value)} />
);

export const renderEmailField = (
    props: WrappedFieldProps & {
        label: string | undefined;
    }
): JSX.Element => {
    const { input, label } = props;
    return <EmailField {...input} label={label} readOnly />;
};

export const renderPasswordField = ({
    input,
    label,
    meta: { touched, error }
}: WrappedFieldProps & { label: string | undefined }): JSX.Element => (
    <PasswordField {...input} label={label} helperText={touched && error} error={!!error} />
);
