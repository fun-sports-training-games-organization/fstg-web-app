import { WrappedFieldProps } from 'redux-form/lib/Field';
import TextField from '../text-field/TextField';
import PasswordField from '../password-field/PasswordField';
import FileChooser from '../file-input/FileChooser';
import EmailField from '../email-field/EmailField';

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

export const renderEmailField = (props: WrappedFieldProps & { label: string | undefined }): JSX.Element => {
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
