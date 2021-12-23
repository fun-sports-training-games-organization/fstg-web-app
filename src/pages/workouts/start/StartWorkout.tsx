import { FC, useEffect, useState } from 'react';
// import { Stack } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Id } from '../../../model/Basics.model';
import { Workout } from '../../../model/Workout.model';
import { getPageIdPrefix } from '../../../util/id-util';
import ExercisesContent from '../../../components/organisms/exercises-content/ExercisesContent';
import { getNewEmptyWorkout } from '../../../util/workout-util';
import { useParams } from 'react-router-dom';
import { Grid, IconButton, Stack } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import theme from '../../../theme/theme';

const StartWorkout: FC = () => {
    const pageName = 'start_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const firestore = useFirestore();
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;

    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());

    useEffect(() => {
        if (workoutId) {
            firestore
                .collection('workouts')
                .doc(workoutId)
                .onSnapshot((snapshot) => {
                    setWorkout({ id: workoutId, hasBeenCreated: true, ...snapshot.data() } as Workout);
                });
        }
    }, [firestore, workoutId]);

    return (
        <div data-testid={pageName}>
            <Grid container direction="column" justifyContent="space-between" alignItems="stretch">
                <Stack direction="row" justifyContent="flex-end" mr={3}>
                    <IconButton onClick={() => console.log('lets do this workout!')}>
                        <PlayArrow htmlColor={'black'} transform="scale(3)" />
                    </IconButton>
                </Stack>
                <Stack
                    mt={2}
                    mr={2}
                    direction="column"
                    border={`2px solid ${theme.palette.grey[700]}`}
                    borderRadius="1rem"
                    sx={{ backgroundColor: theme.palette.grey[300], paddingRight: '0.7rem' }}
                >
                    <ExercisesContent
                        workout={workout}
                        parentIdPrefix={idPrefix}
                        typographySx={{ lineHeight: 2.2, marginLeft: '0.7rem' }}
                    ></ExercisesContent>
                </Stack>
            </Grid>
        </div>
    );
};

export default StartWorkout;
