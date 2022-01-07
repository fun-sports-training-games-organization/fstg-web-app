import { Avatar, Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import WorkoutIcon from '../../../../assets/workout_plan_3.png';
import DashboardCard from '../dashboard-card/DashboardCard';
import * as React from 'react';
import EmptyCard from '../../blank-slate/template/empty-card/EmptyCard';
import WorkoutPlan from '../../../../assets/workout_plan_2.png';
import * as navigate from '../../../../util/navigation-util';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useEntityManager from '../../../../hooks/useEntityManager';
import PageTitle from '../../../atoms/page-title/PageTitle';
import WorkoutCardItem from './WorkoutCardItem';
import { Workout } from '../../../../model/Workout.model';
import Loader from '../../../atoms/loader/Loader';

const WorkoutCard = (): JSX.Element => {
    const history = useHistory();
    const { t } = useTranslation();
    const { entities: workouts, loading } = useEntityManager<Workout>('workouts');
    const WorkoutTitle = <PageTitle translationKey={'page.dashboard.blankWorkout.title'} align={'center'} />;
    const goToWorkoutPage = () => navigate.toManageWorkouts(history);

    return loading ? (
        <Loader />
    ) : workouts.length > 0 ? (
        <DashboardCard cardProps={{ elevation: 5 }} cardHeaderProps={{ title: WorkoutTitle }}>
            <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'space-between'}>
                <Grid item xs={4}>
                    <Avatar
                        style={{
                            verticalAlign: 'center',
                            textAlign: 'center',
                            marginLeft: 30,
                            height: 200,
                            width: 200
                        }}
                        src={WorkoutIcon}
                        alt={'workout icon'}
                        // width={200}
                        // height={200}
                    />
                </Grid>
                <Grid item xs={6}>
                    <List>
                        {workouts.slice(0, 3).map((workout) => (
                            <WorkoutCardItem key={workout.id} workout={workout} />
                        ))}
                        <ListItem disablePadding>
                            <ListItemButton onClick={goToWorkoutPage}>
                                <ListItemText primary="See More..." />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </DashboardCard>
    ) : (
        <EmptyCard
            title={WorkoutTitle}
            message={
                <Stack spacing={2} alignItems={'center'}>
                    <Avatar style={{ height: 200, width: 200, padding: 25, background: '#63a5f5' }} src={WorkoutPlan} />
                    <Typography align={'justify'} variant={'body1'}>
                        {t('page.dashboard.blankWorkout.message')}
                    </Typography>
                </Stack>
            }
            buttonText={t('page.dashboard.blankWorkout.button')}
            buttonAction={goToWorkoutPage}
        />
    );
};

export default WorkoutCard;
