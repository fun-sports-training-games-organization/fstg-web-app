import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { ExerciseWorkoutSettings } from '../../model/exercise-workout-settings';
import { v4 as uuidv4 } from 'uuid';
import EditWorkoutAddExerciseButton from '../../components/edit-workout/EditWorkoutAddExerciseButton';
import { useSnackbar } from 'notistack';
import { getPageIdPrefix } from '../../util/id-util';
import EditWorkoutExercisesList from '../../components/edit-workout/EditWorkoutExercisesList';
import EditWorkoutSubmitButton from '../../components/edit-workout/EditWorkoutSubmitButton';
import { useParams } from 'react-router-dom';
import { Id } from '../../model/basics';

const EditWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;

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

    useEffect(() => {
        if (workoutId) {
            firestore
                .collection('workouts')
                .doc(workoutId)
                .onSnapshot((snapshot) => {
                    setWorkout({ id: workoutId, hasBeenCreated: true, ...snapshot.data() } as Workout);
                });
        }
    }, [firestore]);

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
        <div data-testid={pageName}>
            <Stack spacing={2} mt={2} ml={2} mr={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id={`${idPrefix}name`}
                    label="Workout Name"
                    type="text"
                    fullWidth
                    value={workout.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setWorkout({ ...workout, name: event.target.value })
                    }
                />
                <EditWorkoutExercisesList parentIdPrefix={idPrefix} workout={workout} setWorkout={setWorkout} />
                <EditWorkoutAddExerciseButton parentIdPrefix={idPrefix} addExerciseToWorkout={addExerciseToWorkout} />
            </Stack>
            <Stack spacing={2} mt={5} ml={2} mr={2}>
                <EditWorkoutSubmitButton
                    parentIdPrefix={idPrefix}
                    isCreate={!workout.hasBeenCreated}
                    onSubmit={onSubmit}
                />
            </Stack>
        </div>
    );
};

export default EditWorkout;
