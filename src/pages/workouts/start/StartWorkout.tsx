import { FC, useEffect, useState } from 'react';
// import { Stack } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Id } from '../../../model/Basics.model';
import { Workout } from '../../../model/Workout.model';
import { getPageIdPrefix } from '../../../util/id-util';
import ExercisesContent from '../../../components/organisms/exercises-content/ExercisesContent';
import { getNewEmptyWorkout } from '../../../util/workout-util';
import { useParams } from 'react-router-dom';

const StartWorkout: FC = () => {
    const pageName = 'edit_workout';
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
            <ExercisesContent
                workout={workout}
                parentIdPrefix={idPrefix}
                typographySx={{ lineHeight: 2.2, marginLeft: '2rem' }}
            ></ExercisesContent>
        </div>
    );
};

export default StartWorkout;
