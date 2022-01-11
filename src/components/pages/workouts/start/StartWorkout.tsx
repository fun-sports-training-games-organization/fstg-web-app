import { FC, useCallback, useEffect, useState } from 'react';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import ExercisesContent from '../../../organisms/exercises-content/ExercisesContent';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, IconButton, Stack } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import theme from '../../../../theme/theme';
import useEntityManager from '../../../../hooks/useEntityManager';
import ExercisesTimeRepsIcons from '../../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import { v4 as uuidv4 } from 'uuid';
import PageTitleActionButton from '../../../molecules/page-title-action/PageTitleAction';
import { TypographyOverrideable } from '../../../atoms/typography-overrideable/TypographyOverridable';
import * as navigate from '../../../../util/navigation-util';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';

const StartWorkout: FC = () => {
    const pageName = 'start_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const params = useParams() as Id;
    const history = useHistory();
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
        <ResponsiveContainer xl={6} data-testid={pageName}>
            <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
                <PageTitleActionButton
                    postTitleActionButton={
                        <IconButton
                            onClick={() => workout.id && navigate.toDoWorkout(workout.id)}
                            sx={{ marginRight: 3 }}
                        >
                            <PlayArrow htmlColor={'black'} transform="scale(3)" />
                        </IconButton>
                    }
                    titleTranslationKey="page.startWorkout.title"
                    idPrefix={idPrefix}
                ></PageTitleActionButton>
                <Stack
                    mt={2}
                    mr={{ xs: 0, sm: 2 }}
                    direction="column"
                    border={`2px solid ${theme.palette.grey[300]}`}
                    borderRadius="1rem"
                    sx={{ backgroundColor: theme.palette.grey[100], paddingRight: '0.7rem' }}
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
                        rowGap="1vh"
                    ></ExercisesContent>
                    <Grid
                        mt={5}
                        mb={2}
                        pl={2}
                        pr={2}
                        container
                        direction="row"
                        justifyContent={{ xs: 'space-between', sm: 'space-around' }}
                    >
                        <ExercisesTimeRepsIcons
                            entities={workout.exercises}
                            id={workout.id ? workout.id : uuidv4()}
                            length={workout.exercises.length}
                            parentIdPrefix={idPrefix}
                        />
                    </Grid>
                </Stack>
            </Grid>
        </ResponsiveContainer>
    );
};

export default StartWorkout;
