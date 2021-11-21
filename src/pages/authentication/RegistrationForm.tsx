import { ChangeEvent, FC, FormEvent, useState } from 'react';
import PasswordField from '../../components/molecules/PasswordField';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContextProvider';
import TextField from '../../components/atoms/TextField';

interface State {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrationErrorState {
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
}

const RegistrationForm: FC = () => {
    const { t } = useTranslation();
    const { registerWithEmail } = useAuth();

    const [state, setState] = useState<State>({ email: '', password: '', confirmPassword: '' });
    const [errorState, setErrorState] = useState<RegistrationErrorState>({
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });

    const signUpWithEmailAndPassword = (e: FormEvent) => {
        e.preventDefault();
        const { email, password } = state;
        registerWithEmail(email, password, errorState, setErrorState);
    };

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
        setErrorState({ ...errorState, [`${event.target.name}Error`]: '' });
    };

    return (
        <form onSubmit={signUpWithEmailAndPassword}>
            <Stack padding={2} spacing={2} alignItems={'center'}>
                <TextField
                    fullWidth
                    id={'email-field'}
                    label={t('common.email')}
                    value={state.email}
                    name={'email'}
                    required
                    onChange={handleChangeEvent}
                    error={!!errorState.emailError}
                    helperText={errorState.emailError}
                />
                <PasswordField
                    id={'password-field'}
                    autoComplete={'new-password'}
                    label={t('common.password')}
                    name={'password'}
                    value={state.password}
                    required
                    onChange={handleChangeEvent}
                    error={!!errorState.passwordError}
                    helperText={errorState.passwordError}
                />
                <PasswordField
                    id={'confirm-password-field'}
                    autoComplete={'new-password'}
                    label={t('page.register.label.confirmPassword')}
                    value={state.confirmPassword}
                    name={'confirmPassword'}
                    required
                    onChange={handleChangeEvent}
                    error={!!errorState.confirmPasswordError}
                    helperText={errorState.confirmPasswordError}
                />
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    fullWidth
                    disabled={!state.email || !state.password || !state.confirmPassword}
                >
                    {t('page.register.button.register')}
                </Button>
            </Stack>
        </form>
    );
};

export default RegistrationForm;
