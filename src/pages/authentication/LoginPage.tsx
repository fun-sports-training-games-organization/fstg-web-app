import { FC, useState } from 'react';
import { auth } from '../../config/firebase';
import PasswordField from '../../components/PasswordField';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/TextField';
import { Button } from '@mui/material';
import AuthContainer from '../../components/AuthContainer';
import { useTranslation } from 'react-i18next';

const LoginPage: FC = () => {
    const { t } = useTranslation();
    // const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signInWithEmailAndPassword = () => {
        if (error !== '') {
            setError('');
        }
        // setAuthenticating(true);
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                // logging.info(result);
                console.log(result);
                // setAuthenticating(false);
                history.push('/home');
            })
            .catch((error) => {
                console.error(error);
                // TODO : error handling...
                // setAuthenticating(false);
            });
    };

    return (
        <AuthContainer header={t('page.login.header')}>
            <form>
                <TextField
                    autoComplete={'username'}
                    id={'email-field'}
                    label={t('common.email')}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <PasswordField
                    autoComplete={'current-password'}
                    id={'password-field'}
                    label={t('common.password')}
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <Button onClick={signInWithEmailAndPassword} variant={'contained'} color={'primary'} fullWidth>
                    {t('page.login.button.login')}
                </Button>
            </form>
        </AuthContainer>
    );
};

export default LoginPage;
