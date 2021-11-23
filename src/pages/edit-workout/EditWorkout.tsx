import { ChangeEvent, FC, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { ExerciseWorkoutSettings } from '../../model/exercise-workout-settings';
import { v4 as uuidv4 } from 'uuid';
import EditWorkoutAddExerciseButton from '../../components/EditWorkoutAddExerciseButton';
import { useSnackbar } from 'notistack';
import EditWorkoutExercisesList from '../../components/EditWorkoutExercisesList';
import EditWorkoutSubmitButton from '../../components/EditWorkoutSubmitButton';

const EditWorkout: FC = () => {
    const { enqueueSnackbar } = useSnackbar();
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

    const emptyWorkout: Workout = {
        name: '',
        exercises: [getNewEmptyExerciseWorkoutSettings()],
        hasBeenCreated: false
    };
    const getNewEmptyWorkout = (): Workout => {
        return { ...emptyWorkout, id: uuidv4() };
    };

    const addExerciseToWorkout = (): void =>
        setWorkout({
            ...workout,
            exercises: [...workout.exercises, getNewEmptyExerciseWorkoutSettings()]
        });

    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());

    const handleUpdate = () => {
        // eslint-disable-next-line
        const { id, hasBeenCreated, ...workoutToSend } = workout;
        firestore
            .collection('workouts')
            .doc(workout?.id)
            .update(workoutToSend)
            .then(() => {
                enqueueSnackbar(`${workout.name} was successfully updated`, { variant: 'success' });
            })
            .catch(() => {
                enqueueSnackbar(`${workout.name} could not be updated`, { variant: 'error' });
            });
    };

    const handleCreate = () => {
        // eslint-disable-next-line
        const { id, hasBeenCreated, ...workoutToSend } = workout;
        firestore
            .collection('workouts')
            .add(workoutToSend)
            .then((docRef) => {
                enqueueSnackbar(`${workout?.name} has been added successfully!`, { variant: 'success' });
                setWorkout({ ...workout, hasBeenCreated: true, id: docRef.id });
            })
            .catch(() => {
                enqueueSnackbar(`${workout.name} could not be created`, { variant: 'error' });
            });
    };

    const onSubmit = () => (!workout.hasBeenCreated ? handleCreate() : handleUpdate());

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
                <EditWorkoutExercisesList workout={workout} setWorkout={setWorkout} />
                <EditWorkoutAddExerciseButton addExerciseToWorkout={addExerciseToWorkout} />
            </Stack>
            <Stack spacing={2} mt={5} ml={2} mr={2}>
                <EditWorkoutSubmitButton isCreate={!workout.hasBeenCreated} onSubmit={onSubmit} />
            </Stack>
        </>
    );
};

export default EditWorkout;
