import { FC } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    alphaNumeric,
    email,
    maxLength30,
    maxLengthEmail,
    maxLengthPassword,
    minLength2,
    minLengthName,
    minLengthPassword,
    mustContainLowercase,
    mustContainSymbol,
    mustContainUppercase,
    required
} from '../../../../util/validation';
import i18n from 'i18next';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../../../config/firebase';
import { LoadingButton } from '@mui/lab';
import { renderPasswordField, renderTextField } from '../../../molecules/inputs/redux-fields/ReduxFields';
import EditIcon from '@mui/icons-material/Edit';
import { lower, name } from '../../../../util/normalize';

export interface RegistrationFormFields {
    nickname?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const asyncValidate = async (values: RegistrationFormFields) => {
    if (values.email) {
        const providers = values.email && (await fetchSignInMethodsForEmail(auth, values.email));
        if (providers && providers.length > 0) {
            await Promise.reject({ email: i18n.t('auth.message.registration.emailAlreadyExists') });
        }
    }
};

const validate = (values: RegistrationFormFields) => {
    const error: RegistrationFormFields = {};
    error.confirmPassword =
        values.password !== values.confirmPassword ? i18n.t('validation.passwordsDoNotMatch') : undefined;
    return error;
};

const RegistrationForm: FC<InjectedFormProps<RegistrationFormFields>> = (
    props: InjectedFormProps<RegistrationFormFields>
) => {
    const { handleSubmit, pristine, submitting } = props;
    const { t } = useTranslation();

    return (
        <Form onSubmit={handleSubmit}>
            <Stack padding={2} spacing={2} alignItems={'center'}>
                <Field
                    name={'nickname'}
                    validate={[alphaNumeric, minLength2, maxLength30]}
                    component={renderTextField}
                    normalize={lower}
                    label={t('form.label.registration.nickname')}
                />
                <Field
                    name={'firstName'}
                    component={renderTextField}
                    validate={[required, minLengthName, maxLength30]}
                    normalize={name}
                    validationMessage={'Required'}
                    label={t('form.label.registration.firstName')}
                />
                <Field
                    name={'lastName'}
                    component={renderTextField}
                    validate={[required, minLengthName, maxLength30]}
                    normalize={name}
                    validationMessage={'Required'}
                    label={t('form.label.registration.lastName')}
                />
                <Field
                    autoComplete={'email'}
                    name={'email'}
                    component={renderTextField}
                    validate={[required, email, maxLengthEmail]}
                    normalize={lower}
                    label={t('form.label.registration.email')}
                />
                <Field
                    autoComplete={'new-password'}
                    name={'password'}
                    component={renderPasswordField}
                    validate={[
                        required,
                        minLengthPassword,
                        maxLengthPassword,
                        mustContainSymbol,
                        mustContainLowercase,
                        mustContainUppercase
                    ]}
                    label={t('form.label.registration.password')}
                />
                <Field
                    name={'confirmPassword'}
                    component={renderPasswordField}
                    validate={[required]}
                    label={t('form.label.registration.confirmPassword')}
                />
                <LoadingButton
                    loading={submitting}
                    loadingPosition="start"
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    disabled={pristine || submitting}
                    startIcon={<EditIcon />}
                    // disabled={!state.email || !state.password || !state.confirmPassword}
                >
                    {t('form.button.registration.register')}
                </LoadingButton>
            </Stack>
        </Form>
    );
};

export default reduxForm({ form: 'registrationForm', validate, asyncValidate })(RegistrationForm);
