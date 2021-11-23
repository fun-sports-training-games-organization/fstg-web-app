import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IconButton, List, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../model/workout';
import { ExerciseWorkoutSettings } from '../model/exercise-workout-settings';

type Props = {
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
};

const EditWorkoutExercisesList = ({ workout, setWorkout }: Props): JSX.Element => {
    const updateExerciseName = (
        workout: Workout,
        exerciseToUpdate: ExerciseWorkoutSettings,
        name: string
    ): ExerciseWorkoutSettings[] => {
        return workout.exercises.map((exercise) => {
            if (exercise.id === exerciseToUpdate.id) {
                return { ...exercise, name };
            }

            return exercise;
        });
    };

    return (
        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
            {workout.exercises?.map((exercise, index) => {
                return (
                    <TextField
                        fullWidth
                        margin="dense"
                        key={exercise.id}
                        label={'Exercise ' + (index + 1)}
                        type="text"
                        value={exercise.name}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SettingsIcon />
                                </IconButton>
                            )
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setWorkout({
                                ...workout,
                                exercises: updateExerciseName(workout, exercise, event.target.value)
                            })
                        }
                    />
                );
            })}
        </List>
    );
};

export default EditWorkoutExercisesList;
