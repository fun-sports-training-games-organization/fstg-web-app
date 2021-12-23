import { FC, useCallback, useEffect, useState } from 'react';
import { Id } from '../../../model/Basics.model';
import { Workout } from '../../../model/Workout.model';
import { getPageIdPrefix } from '../../../util/id-util';
import ExercisesContent from '../../../components/organisms/exercises-content/ExercisesContent';
import { getNewEmptyWorkout } from '../../../util/workout-util';
import { useParams } from 'react-router-dom';
import { Grid, IconButton, Stack } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import theme from '../../../theme/theme';
import useEntityManager from '../../../hooks/useEntityManager';
import IconsSubtitle from '../../../components/molecules/icons-subtitle/IconsSubtitle';
import { v4 as uuidv4 } from 'uuid';
import PageTitleActionButton from '../../../components/molecules/page-title-action/PageTitleAction';
import { TypographyOverrideable } from '../../../components/atoms/typography-overrideable/TypographyOverridable';

const StartWorkout: FC = () => {
    const pageName = 'start_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const { findById } = useEntityManager<Workout>('workouts');

    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());

    const loadWorkout = useCallback(() => {
        workoutId &&
            findById(workoutId).then((wo: Workout) => {
                setWorkout(wo);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    return (
        <div data-testid={pageName}>
            <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
                <PageTitleActionButton
                    actionButton={
                        <IconButton onClick={() => console.log('lets do this workout!')} sx={{ marginRight: 3 }}>
                            <PlayArrow htmlColor={'black'} transform="scale(3)" />
                        </IconButton>
                    }
                    titleTranslationKey="page.startWorkout.title"
                    idPrefix={idPrefix}
                ></PageTitleActionButton>
                <Stack
                    mt={2}
                    mr={2}
                    direction="column"
                    border={`2px solid ${theme.palette.grey[700]}`}
                    borderRadius="1rem"
                    sx={{ backgroundColor: theme.palette.grey[300], paddingRight: '0.7rem' }}
                >
                    <TypographyOverrideable
                        fontSize={'twentyThree'}
                        fontWeight={'sixHundred'}
                        variant="h5"
                        textAlign={'center'}
                        mb={3}
                    >
                        {workout.name}
                    </TypographyOverrideable>
                    <ExercisesContent
                        workout={workout}
                        parentIdPrefix={idPrefix}
                        typographySx={{ lineHeight: 2.2, marginLeft: '0.7rem' }}
                    ></ExercisesContent>
                    <Grid mt={5} mb={2} pl={2} pr={2} container direction="row" justifyContent="space-between">
                        <IconsSubtitle
                            entities={workout.exercises}
                            id={workout.id ? workout.id : uuidv4()}
                            length={workout.exercises.length}
                            parentIdPrefix={idPrefix}
                        ></IconsSubtitle>
                    </Grid>
                </Stack>
            </Grid>
        </div>
    );
};

export default StartWorkout;
