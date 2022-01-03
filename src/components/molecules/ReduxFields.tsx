import { WrappedFieldProps } from 'redux-form/lib/Field';
import TextField from '../atoms/text-field/TextField';
import PasswordField from './password-field/PasswordField';

export const renderTextField = (props: WrappedFieldProps & { label: string | undefined }) => {
    const {
        input,
        label,
        meta: { touched, error }
    } = props;
    return <TextField {...input} label={label} helperText={touched && error} error={!!error} />;
};

export const renderPasswordField = ({
    input,
    label,
    meta: { touched, error }
}: WrappedFieldProps & { label: string | undefined }) => (
    <PasswordField {...input} label={label} helperText={touched && error} error={!!error} />
);
