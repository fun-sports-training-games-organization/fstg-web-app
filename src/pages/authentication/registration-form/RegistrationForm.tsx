import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContextProvider';
import TextField from '../../../components/atoms/text-field/TextField';
import PasswordField from '../../../components/molecules/password-field/PasswordField';

interface State {
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegistrationErrorState {
    usernameError: string;
    firstNameError: string;
    lastNameError: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
}

const RegistrationForm: FC = () => {
    const { t } = useTranslation();
    const { registerWithEmail } = useAuth();

    const [state, setState] = useState<State>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorState, setErrorState] = useState<RegistrationErrorState>({
        firstNameError: '',
        lastNameError: '',
        usernameError: '',
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
                    autoFocus
                    id={'username-field'}
                    label={t('form.label.registration.username')}
                    value={state.username}
                    name={'username'}
                    onChange={handleChangeEvent}
                    error={!!errorState.usernameError}
                    helperText={errorState.usernameError}
                />
                <TextField
                    fullWidth
                    id={'first-name-field'}
                    label={t('form.label.registration.firstName')}
                    value={state.firstName}
                    name={'firstName'}
                    required
                    onChange={handleChangeEvent}
                    error={!!errorState.firstNameError}
                    helperText={errorState.firstNameError}
                />
                <TextField
                    fullWidth
                    id={'last-name-field'}
                    label={t('form.label.registration.lastName')}
                    value={state.lastName}
                    name={'lastName'}
                    required
                    onChange={handleChangeEvent}
                    error={!!errorState.lastNameError}
                    helperText={errorState.lastNameError}
                />
                <TextField
                    fullWidth
                    id={'email-field'}
                    label={t('form.label.registration.email')}
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
                    label={t('form.label.registration.password')}
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
                    label={t('form.label.registration.confirmPassword')}
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
                    {t('form.button.registration.register')}
                </Button>
            </Stack>
        </form>
    );
};

export default RegistrationForm;
