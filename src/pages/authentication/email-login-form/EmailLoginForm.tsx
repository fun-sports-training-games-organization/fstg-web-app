import React, { ChangeEvent, FC, useState } from 'react';
import { Stack, Button, Link, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContextProvider';
import PasswordField from '../../../components/molecules/password-field/PasswordField';

const EmailLoginForm: FC = () => {
    const { t } = useTranslation();
    const { loginWithEmail, sendResetPasswordLink } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [forgotPasswordMode, setForgotPasswordMode] = useState<boolean>(false);

    const signIn = () => {
        loginWithEmail(email, password);
        setPassword('');
        setEmail('');
    };
    const resetPassword = () => {
        sendResetPasswordLink(email);
        setPassword('');
        setEmail('');
    };

    return (
        <form>
            <Stack spacing={2}>
                <TextField
                    autoFocus
                    fullWidth
                    id={'email-field'}
                    label={t('common.email')}
                    value={email}
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />
                {!forgotPasswordMode && (
                    <PasswordField
                        id={'password-field'}
                        autoComplete={'new-password'}
                        label={t('common.password')}
                        value={password}
                        required
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    disabled={(!forgotPasswordMode && !email) || (!forgotPasswordMode && !password)}
                    onClick={(e) => {
                        e.preventDefault();
                        forgotPasswordMode ? resetPassword() : signIn();
                    }}
                >
                    {t(forgotPasswordMode ? 'page.login.button.reset' : 'page.login.button.login')}
                </Button>
            </Stack>
        </form>
    );
};

export default EmailLoginForm;
