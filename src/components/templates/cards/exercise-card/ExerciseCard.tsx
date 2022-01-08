import { Avatar, Button, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import Dumbbells from '../../../../assets/dumbbells.png';
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
import ExerciseCardItem from './ExerciseCardItem';
import Loader from '../../../atoms/loader/Loader';

const ExerciseCard = (): JSX.Element => {
    const history = useHistory();
    const { t } = useTranslation();
    const { entities: exercises, loading } = useEntityManager<Exercise>('exercises');

    const goToExercisePage = () => navigate.toExercises(history);
    const ExerciseTitle = <PageTitle translationKey={'page.dashboard.blankExercise.title'} align={'center'} />;
    return loading ? (
        <Loader />
    ) : exercises.length > 0 ? (
        <DashboardCard cardProps={{ elevation: 5 }} cardHeaderProps={{ title: ExerciseTitle }}>
            <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'space-between'}>
                <Grid item md={1} />
                <Grid item xs={4}>
                    <img
                        style={{
                            verticalAlign: 'center',
                            textAlign: 'center',
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                        src={Dumbbells}
                        alt={'dumbbells  icon'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <List>
                        {exercises.slice(0, 3).map((exercise) => (
                            <ExerciseCardItem key={exercise.id} exercise={exercise} />
                        ))}
                        <ListItem disablePadding sx={{ marginTop: 1 }}>
                            <Button variant={'contained'} onClick={goToExercisePage} color={'primary'}>
                                {t('page.dashboard.showMore')}
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </DashboardCard>
    ) : (
        <EmptyCard
            title={ExerciseTitle}
            message={
                <Stack spacing={2} alignItems={'center'}>
                    <Avatar style={{ height: 200, width: 200 }} src={Fitness} />
                    <Typography align={'justify'} variant={'body1'}>
                        {t('page.dashboard.blankExercise.message')}
                    </Typography>
                </Stack>
            }
            buttonText={t('page.dashboard.blankExercise.button')}
            buttonAction={goToExercisePage}
        />
    );
};

export default ExerciseCard;
