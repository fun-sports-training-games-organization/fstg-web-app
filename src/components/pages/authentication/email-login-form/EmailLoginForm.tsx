import React, { FC, useState } from 'react';
import { Button, Link, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import { email, maxLengthEmail, required } from '../../../../util/validation';
import { renderPasswordField, renderTextField } from '../../../molecules/ReduxFields';
import LoadingButton from '../../../molecules/loading-button/LoadingButton';

export type EmailLoginFormField = { email?: string; password?: string };

const EmailLoginForm: FC<InjectedFormProps<EmailLoginFormField>> = (props: InjectedFormProps<EmailLoginFormField>) => {
    const { handleSubmit, pristine, submitting } = props;
    const { t } = useTranslation();
    const [forgotPasswordMode, setForgotPasswordMode] = useState<boolean>(false);

    return (
        <Form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Field
                    autoComplete={'email'}
                    autoFocus
                    fullWidth
                    name={'email'}
                    label={t('form.label.login.email')}
                    validate={[required, email, maxLengthEmail]}
                    component={renderTextField}
                />
                {!forgotPasswordMode && (
                    <Field
                        autoComplete={'current-password'}
                        label={t('form.label.login.password')}
                        name={'password'}
                        validate={[required]}
                        component={renderPasswordField}
                    />
                )}
                {!forgotPasswordMode && (
                    <Link onClick={() => setForgotPasswordMode(true)}>{t('page.login.forgotPassword')}</Link>
                )}
                {forgotPasswordMode && (
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        fullWidth
                        onClick={() => setForgotPasswordMode(false)}
                    >
                        {t('global.back')}
                    </Button>
                )}
                <LoadingButton loading={submitting} disabled={pristine || submitting}>
                    {t(forgotPasswordMode ? 'page.login.button.reset' : 'page.login.button.login')}
                </LoadingButton>
            </Stack>
        </Form>
    );
};

export default reduxForm({ form: 'loginForm' })(EmailLoginForm);
