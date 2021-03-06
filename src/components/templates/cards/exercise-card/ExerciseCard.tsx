import { Avatar, Button, Grid, List, ListItem, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import Dumbbells from '../../../../assets/dumbbells.png';
import DashboardCard from '../dashboard-card/DashboardCard';
import * as React from 'react';
import useEntityManager from '../../../../hooks/useEntityManager';
import { Exercise } from '../../../../model/Exercise.model';
import EmptyCard from '../../blank-slate/template/empty-card/EmptyCard';
import Fitness from '../../../../assets/fitness.png';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../../atoms/page-title/PageTitle';
import ExerciseCardItem from './ExerciseCardItem';
import Loader from '../../../atoms/loader/Loader';
import { DraggableProps } from '../dashboard-card/DashboardCard.types';
import { FC } from 'react';
import { toExercises } from '../../../../util/navigation-util';

const ExerciseCard: FC<DraggableProps> = ({ id, index, moveCard }: DraggableProps): JSX.Element => {
    const { t } = useTranslation();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { entities: exercises, loading } = useEntityManager<Exercise>('exercises');

    const ExerciseTitle = <PageTitle translationKey={'page.dashboard.exercise.title'} align={'center'} />;
    return loading ? (
        <Loader />
    ) : exercises.length > 0 ? (
        <DashboardCard
            id={id}
            index={index}
            moveCard={moveCard}
            cardProps={{ elevation: 5 }}
            cardHeaderProps={{ title: ExerciseTitle, ...(smDown && { sx: { paddingBottom: 0 } }) }}
            cardContentProps={smDown ? { sx: { paddingTop: 0 } } : undefined}
        >
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
                            <Button
                                fullWidth
                                style={{ textTransform: 'none' }}
                                variant={'contained'}
                                onClick={toExercises}
                                color={'primary'}
                            >
                                {t('page.dashboard.showMore')}
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </DashboardCard>
    ) : (
        <EmptyCard
            id={id}
            index={index}
            moveCard={moveCard}
            title={ExerciseTitle}
            message={
                <Stack spacing={2} alignItems={'center'}>
                    <Avatar style={{ height: 200, width: 200 }} src={Fitness} />
                    <Typography align={'justify'} variant={'body1'}>
                        {t('page.dashboard.exercise.message')}
                    </Typography>
                </Stack>
            }
            buttonText={t('page.dashboard.exercise.button')}
            buttonAction={toExercises}
        />
    );
};

export default ExerciseCard;
