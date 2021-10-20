import { FC, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import PasswordField from '../../components/PasswordField';
import { useHistory } from 'react-router-dom';
import { Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContextProvider';

const EmailLoginForm: FC = () => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    // const {  } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signIn = () => {
        if (error !== '') {
            setError('');
        }
        const auth = getAuth();
        // setRegistering(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((user: UserCredential) => {
                // setAuthenticated(true);
                // setUser(user);
                // logging.info(result);
                console.log(user);
                // setRegistering(false);
                history.push('/login');
            })
            .catch((error) => {
                console.error(error.code);
                // 'auth/wrong-password'
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    enqueueSnackbar('Incorrect credentials', { variant: 'error' });
                }

                // TODO : error handling...
                // setRegistering(false);
            });
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
