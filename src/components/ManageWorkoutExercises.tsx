import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IconButton, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../model/workout';
import { ExerciseWorkoutSettings } from '../model/exercise-workout-settings';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
};

const ManageWorkoutExercises = ({ parentIdPrefix, workout, setWorkout }: Props): JSX.Element => {
    const idPrefix = `${parentIdPrefix}manage_exercise_list__`;
    const exerciseItemPrefix = `${idPrefix}item_`;
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
        <>
            {workout.exercises?.map((exercise, index) => {
                return (
                    <TextField
                        fullWidth
                        margin="dense"
                        key={exercise.id}
                        id={`${exerciseItemPrefix}${index}`}
                        label={`Exercise ${index + 1}`}
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
        </>
    );
};

export default ManageWorkoutExercises;
