import { FC } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../reducers/authReducer';

const HomePage: FC = () => {
    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);
    const { t } = useTranslation();
    return (
        <Stack>
            Welcome to your home page!
            <Button onClick={() => authDispatcher.logout()}>{t('Logout')}</Button>
        </Stack>
    );
};

export default HomePage;
