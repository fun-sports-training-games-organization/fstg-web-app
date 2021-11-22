import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import { Redirect } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
// import { User } from 'firebase/auth';
// import { useSelector } from 'react-redux';
// import { RootReducerState } from '../reducers/authReducer';

const ManageExercises: FC = () => {
    // const user = useSelector<RootReducerState, User | undefined>((state: RootReducerState) => {
    //     return state.rootReducer.user;
    // });
    // const auth = useSelector((state: any) => state.firebase.auth);
    // const { t } = useTranslation();

    // if (user) {
    return (
        <Stack padding={3} spacing={3}>
            <Typography mt={3} ml={3} variant={'h3'} sx={{ textTransform: 'none' }}>
                {/*{t('page.home.welcome', user.displayName ? user.displayName : '')}*/}
            </Typography>
            <ExerciseList />
        </Stack>
    );
    // } else {
    //     return <Redirect to={'/login'} />;
    // }
};

export default ManageExercises;
