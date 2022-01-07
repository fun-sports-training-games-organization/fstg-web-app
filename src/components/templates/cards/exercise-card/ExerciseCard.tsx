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
import useEntityManager from '../../../../hooks/useEntityManager';
import { Exercise } from '../../../../model/Exercise.model';
import * as navigate from '../../../../util/navigation-util';
import { useHistory } from 'react-router-dom';
import EmptyCard from '../../blank-slate/template/empty-card/EmptyCard';
import Fitness from '../../../../assets/fitness.png';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../../atoms/page-title/PageTitle';

const ExerciseCard = (): JSX.Element => {
    const history = useHistory();
    const { t } = useTranslation();
    const { entities: exercises } = useEntityManager<Exercise>('exercises');

    return exercises.length > 0 ? (
        <DashboardCard cardProps={{ elevation: 5 }} cardHeaderProps={{ title: 'Exercises' }}>
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
                                <ListItemText primary="Weight Lifts" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DirectionsRun />
                                </ListItemIcon>
                                <ListItemText primary="Jogging" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Pool />
                                </ListItemIcon>
                                <ListItemText primary="Swimming" />
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
            title={<PageTitle translationKey={'page.dashboard.blankExercise.title'} align={'center'} />}
            message={
                <Stack spacing={2} alignItems={'center'}>
                    <Avatar style={{ height: 200, width: 200 }} src={Fitness} />
                    <Typography align={'justify'} variant={'body1'}>
                        {t('page.dashboard.blankExercise.message')}
                    </Typography>
                </Stack>
            }
            buttonText={t('page.dashboard.blankExercise.button')}
            buttonAction={() => navigate.toExercises(history)}
        />
    );
};

export default ExerciseCard;
