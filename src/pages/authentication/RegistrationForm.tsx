import { ChangeEvent, FC, useState } from 'react';
import PasswordField from '../../components/molecules/PasswordField';
import { Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

interface State {
    email: string;
    password: string;
    confirmPassword: string;
}

interface ErrorState {
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
}

const RegistrationForm: FC = () => {
    const { t } = useTranslation();
    const firebase = useFirebase();
    const history = useHistory();
    const { registerWithEmail } = useAuth();

    const [state, setState] = useState<State>({ email: '', password: '', confirmPassword: '' });
    const [errorState, setErrorState] = useState<ErrorState>({
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });

    const signUpWithEmailAndPassword = () => {
        const { email, password } = state;
        // registerWithEmail(email, password);
        firebase
            .createUser({ email, password, signIn: false })
            .then(() => {
                console.log('');
                // history.push('/');
            })
            .catch((error) => {
                console.log(error);
                const { code } = error;
                if (code === 'auth/email-already-in-use') {
                    setErrorState({ ...errorState, emailError: t('auth.message.registration.emailAlreadyExists') });
                }
            });
    };

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
        <form>
            <Stack padding={2} spacing={2} alignItems={'center'}>
                <TextField
                    fullWidth
                    id={'email-field'}
                    label={t('common.email')}
                    value={state.email}
                    name={'email'}
                    required
                    onChange={handleChangeEvent}
                    // error={!!errorState.emailError}
                    // helperText={'email already in use!'}
                />
                <PasswordField
                    id={'password-field'}
                    autoComplete={'new-password'}
                    label={t('common.password')}
                    name={'password'}
                    value={state.password}
                    required
                    onChange={handleChangeEvent}
                    // error={!!errorState.passwordError}
                />
                <PasswordField
                    id={'confirm-password-field'}
                    autoComplete={'new-password'}
                    label={t('page.register.label.confirmPassword')}
                    value={state.confirmPassword}
                    name={'confirmPassword'}
                    required
                    onChange={handleChangeEvent}
                    // error={!!errorState.confirmPasswordError}
                />
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    disabled={!state.email || !state.password || !state.confirmPassword}
                    onClick={signUpWithEmailAndPassword}
                >
                    {t('page.register.button.register')}
                </Button>
            </Stack>
        </form>
    );
};

export default RegistrationForm;
