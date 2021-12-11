import { Dispatch, SetStateAction } from 'react';
import { Workout } from '../../../model/workout';
import ManageWorkoutExercises from '../../molecules/manage-workout-exercises/ManageWorkoutExercises';
import DisplayWorkoutExercises from '../../molecules/display-workout-exercises/DisplayWorkoutExercises';
import { List } from '@mui/material';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout?: Dispatch<SetStateAction<Workout>>;
    save?: () => void;
};

const WorkoutExercises = ({
    parentIdPrefix,
    workout,
    setWorkout,
    save = () => {
        console.log('save');
    }
}: Props): JSX.Element => {
    return (
        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
            {setWorkout ? (
                <ManageWorkoutExercises
                    parentIdPrefix={parentIdPrefix}
                    workout={workout}
                    setWorkout={setWorkout}
                    save={save}
                ></ManageWorkoutExercises>
            ) : (
                <DisplayWorkoutExercises parentIdPrefix={parentIdPrefix} workout={workout}></DisplayWorkoutExercises>
            )}
        </List>
    );
};

export default WorkoutExercises;
