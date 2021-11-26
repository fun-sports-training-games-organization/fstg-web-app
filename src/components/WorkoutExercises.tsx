import { Dispatch, SetStateAction } from 'react';
import { Workout } from '../model/workout';
import ManageWorkoutExercises from './ManageWorkoutExercises';
import DisplayWorkoutExercises from './DisplayWorkoutExercises';
import { List } from '@mui/material';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout?: Dispatch<SetStateAction<Workout>>;
};

const WorkoutExercises = ({ parentIdPrefix, workout, setWorkout }: Props): JSX.Element => {
    return (
        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
            {setWorkout ? (
                <ManageWorkoutExercises
                    parentIdPrefix={parentIdPrefix}
                    workout={workout}
                    setWorkout={setWorkout}
                ></ManageWorkoutExercises>
            ) : (
                <DisplayWorkoutExercises parentIdPrefix={parentIdPrefix} workout={workout}></DisplayWorkoutExercises>
            )}
        </List>
    );
};

export default WorkoutExercises;
