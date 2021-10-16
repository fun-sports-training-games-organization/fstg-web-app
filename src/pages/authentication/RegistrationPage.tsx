import { FC, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import PasswordField from '../../components/PasswordField';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/TextField';
import { Button } from '@mui/material';
import logger from '../../logging/logger';
import AuthContainer from '../../components/AuthContainer';
import { useTranslation } from 'react-i18next';

const RegistrationPage: FC = () => {
    const { t } = useTranslation();
    // const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signUpWithEmailAndPassword = () => {
        if (error !== '') {
            setError('');
        }
        const auth = getAuth();
        // setRegistering(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // logging.info(result);
                console.log(result);
                // setRegistering(false);
                history.push('/login');
            })
            .catch((error) => {
                console.error(error);
                // TODO : error handling...
                // setRegistering(false);
            });
    };

    return (
        <AuthContainer header={t('page.register.header')}>
            <form>
                <TextField
                    id={'email-field'}
                    label={t('common.email')}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <PasswordField
                    id={'password-field'}
                    autoComplete={'new-password'}
                    label={t('common.password')}
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <PasswordField
                    id={'confirm-password-field'}
                    autoComplete={'new-password'}
                    label={t('page.register.label.confirmPassword')}
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        logger.warn('hello warn');
                    }}
                />
                <Button variant={'contained'} color={'primary'} fullWidth onClick={() => signUpWithEmailAndPassword()}>
                    {t('page.register.button.register')}
                </Button>
            </form>
        </AuthContainer>
    );
};

export default RegistrationPage;
