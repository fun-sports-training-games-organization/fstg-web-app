import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { User } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { InitialState } from '../reducers/authReducer';

interface StateProps {
    user?: User;
}

const HomePage: FC = () => {
    const { user } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            user: state.user
        };
    });
    console.log(user);
    const { t } = useTranslation();

    if (user) {
        return (
            <Stack padding={3} spacing={3}>
                <Typography mt={3} ml={3} variant={'h3'} sx={{ textTransform: 'none' }}>
                    {t('page.home.welcome', { user })}
                </Typography>
                <ExerciseList />
            </Stack>
        );
    } else {
        return <Redirect to={'/login'} />;
    }
};

export default HomePage;
