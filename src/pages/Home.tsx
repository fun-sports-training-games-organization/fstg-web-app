import { ChangeEvent, FC, useState } from 'react';
import { Button, IconButton, List, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../model/workout';
import AddIcon from '@mui/icons-material/Add';
import { ExerciseWorkoutSettings } from '../model/exercise-workout-settings';
import { v4 as uuidv4 } from 'uuid';

const HomePage: FC = () => {
    const { t } = useTranslation();
    const firestore = useFirestore();
    const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
        name: '',
        amountType: 'number',
        recordResults: false,
        resultType: 'number',
        useDefaultResult: false
    };

    const getNewEmptyExerciseWorkoutSettings = (): ExerciseWorkoutSettings => {
        return { ...emptyExerciseWorkoutSettings, id: uuidv4() };
    };

    const [workout, setWorkout] = useState<Workout>({
        name: '',
        exercises: [getNewEmptyExerciseWorkoutSettings()]
    });
    const updateExerciseName = (
        workout: Workout,
        exerciseToUpdate: ExerciseWorkoutSettings,
        name: string
    ): ExerciseWorkoutSettings[] => {
        return workout.exercises.map((exercise) => {
            if (exercise.id === exerciseToUpdate.id) {
                return { ...exerciseToUpdate, name };
            }

            return exerciseToUpdate;
        });
    };

    return (
        <>
            <Stack spacing={2} mt={2} ml={2} mr={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Workout Name"
                    type="text"
                    fullWidth
                    value={workout.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setWorkout({ ...workout, name: event.target.value })
                    }
                />
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
                <IconButton
                    onClick={() =>
                        setWorkout({
                            ...workout,
                            exercises: [...workout.exercises, getNewEmptyExerciseWorkoutSettings()]
                        })
                    }
                >
                    <AddIcon fontSize="large" />
                </IconButton>
            </Stack>
            <Stack spacing={2} mt={5} ml={2} mr={2}>
                <Button
                    variant="contained"
                    fullWidth
                    /* onClick={() => (exercise?.id ? handleUpdate() : handleCreate())}*/
                >
                    {t(workout?.id ? 'global.save' : 'global.create')}
                </Button>
            </Stack>
        </>
    );
};

export default HomePage;
