import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import ExerciseIcon from '../../../../assets/exercise.png';
import { DirectionsRun, FitnessCenter, Pool } from '@mui/icons-material';
import DashboardCard from '../dashboard-card/DashboardCard';
import * as React from 'react';
import EmptyCard from '../../blank-slate/template/empty-card/EmptyCard';
import WorkoutPlan from '../../../../assets/workout_plan_2.png';
import * as navigate from '../../../../util/navigation-util';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useEntityManager from '../../../../hooks/useEntityManager';
import { Exercise } from '../../../../model/Exercise.model';
import PageTitle from '../../../atoms/page-title/PageTitle';

const WorkoutCard = (): JSX.Element => {
    const history = useHistory();
    const { t } = useTranslation();
    const { entities: workouts } = useEntityManager<Exercise>('workouts');

    return workouts.length > 0 ? (
        <DashboardCard cardProps={{ elevation: 5 }} cardHeaderProps={{ title: 'Workouts' }}>
            <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'space-between'}>
                <Grid item xs={4}>
                    <img
                        style={{ verticalAlign: 'center', textAlign: 'center' }}
                        src={ExerciseIcon}
                        alt={'exercise icon'}
                        width={75}
                        height={75}
                    />
                </Grid>
                <Grid item xs={8}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FitnessCenter />
                                </ListItemIcon>
                                <ListItemText primary="Usual Workout" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DirectionsRun />
                                </ListItemIcon>
                                <ListItemText primary="Evening Workout" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Pool />
                                </ListItemIcon>
                                <ListItemText primary="Morning Workout" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="See More..." />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </DashboardCard>
    ) : (
        <EmptyCard
            title={<PageTitle translationKey={'page.dashboard.blankWorkout.title'} align={'center'} />}
            message={
                <Stack spacing={2} alignItems={'center'}>
                    <Avatar style={{ height: 200, width: 200, padding: 25, background: '#63a5f5' }} src={WorkoutPlan} />
                    <Typography align={'justify'} variant={'body1'}>
                        {t('page.dashboard.blankWorkout.message')}
                    </Typography>
                </Stack>
            }
            buttonText={t('page.dashboard.blankWorkout.button')}
            buttonAction={() => navigate.toManageWorkouts(history)}
        />
    );
};

export default WorkoutCard;
