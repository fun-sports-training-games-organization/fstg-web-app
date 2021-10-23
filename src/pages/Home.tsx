import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContextProvider';
import { Redirect } from 'react-router-dom';

const HomePage: FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    if (user) {
        const { displayName } = user;
        return (
            <Stack>
                <Typography mt={3} ml={3} variant={'h3'} sx={{ textTransform: 'none' }}>
                    {t('page.home.welcome', { displayName })}
                </Typography>
            </Stack>
        );
    } else {
        return <Redirect to={'/login'} />;
    }
};

export default HomePage;
