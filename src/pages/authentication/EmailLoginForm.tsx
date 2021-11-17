import React, { FC, useState } from 'react';
import PasswordField from '../../components/PasswordField';
import { Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContextProvider';

const EmailLoginForm: FC = () => {
    const { t } = useTranslation();
    const { loggedInSuccessfully, loginFailed } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const signIn = () => {
        // signInWithEmailAndPassword(auth, email, password).then(loggedInSuccessfully).catch(loginFailed);
    };

    return (
        <Stack padding={2} spacing={2} alignItems={'center'}>
            <TextField
                fullWidth
                id={'email-field'}
                label={t('common.email')}
                value={email}
                required
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <PasswordField
                id={'password-field'}
                autoComplete={'new-password'}
                label={t('common.password')}
                value={password}
                required
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                fullWidth
                disabled={!email || !password}
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
            >
                {t('page.login.button.login')}
            </Button>
        </Stack>
    );
};

export default EmailLoginForm;
