import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextField from '../../components/atoms/text-field/TextField';
import { useAuth } from '../../contexts/AuthContextProvider';
import useEntityManager from '../../hooks/useEntityManager';

interface State {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    password: string;
    confirmPassword: string;
}

type UserProfile = {
    firstName?: string;
    lastName?: string;
    username?: string;
};

const RegistrationForm: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const entityManager = useEntityManager<UserProfile>('users');

    const [state, setState] = useState<State>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        user &&
            user.uid &&
            user.email &&
            entityManager.findById(user?.uid).then((u: UserProfile) => {
                const { firstName, lastName, username } = u;
                const { email } = user;
                setState({ ...state, firstName, lastName, username, email });
            });
    }, [user, entityManager, setState, state]);

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
        <form>
            <Stack padding={2} spacing={2} alignItems={'center'}>
                <TextField
                    fullWidth
                    autoFocus
                    id={'username-field'}
                    label={t('form.label.registration.username')}
                    value={state.username}
                    name={'username'}
                    readOnly
                    onChange={handleChangeEvent}
                />
                <TextField
                    fullWidth
                    id={'first-name-field'}
                    label={t('form.label.registration.firstName')}
                    value={state.firstName}
                    name={'firstName'}
                    required
                    readOnly
                    onChange={handleChangeEvent}
                />
                <TextField
                    fullWidth
                    id={'last-name-field'}
                    label={t('form.label.registration.lastName')}
                    value={state.lastName}
                    name={'lastName'}
                    required
                    readOnly
                    onChange={handleChangeEvent}
                />
                <TextField
                    fullWidth
                    id={'email-field'}
                    label={t('form.label.registration.email')}
                    value={state.email}
                    name={'email'}
                    required
                    readOnly
                    onChange={handleChangeEvent}
                />
                {/*<Button*/}
                {/*    type={'submit'}*/}
                {/*    variant={'contained'}*/}
                {/*    color={'primary'}*/}
                {/*    fullWidth*/}
                {/*    disabled={!state.email || !state.password || !state.confirmPassword}*/}
                {/*>*/}
                {/*    {t('form.button.registration.register')}*/}
                {/*</Button>*/}
            </Stack>
        </form>
    );
};

export default RegistrationForm;
