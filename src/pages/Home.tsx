import { FC } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../reducers/authReducer';
import { useAuth } from '../contexts/AuthContextProvider';

const HomePage: FC = () => {
    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);
    const { logout, user } = useAuth();
    const { t } = useTranslation();
    console.log('loading homepage...');
    return (
        <Stack>
            {`Welcome to ${user?.displayName}!`}
            <Button
                onClick={() => {
                    authDispatcher.logout();
                    logout();
                }}
            >
                {t('Logout')}
            </Button>
        </Stack>
    );
};

export default HomePage;
