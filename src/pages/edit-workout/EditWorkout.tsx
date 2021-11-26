import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { ExerciseWorkoutSettings } from '../../model/exercise-workout-settings';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { getPageIdPrefix } from '../../util/id-util';
import { useHistory, useParams } from 'react-router-dom';
import { Id } from '../../model/basics';
import AddButton from '../../components/atoms/AddButton';
import SubmitButton from '../../components/atoms/SubmitButton';
import Title from '../../components/atoms/Title';
import WorkoutExercises from '../../components/WorkoutExercises';
import { useTranslation } from 'react-i18next';

const EditWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const history = useHistory();
    const { t } = useTranslation();
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
    }, [firestore, workoutId]);

    const handleUpdate = () => {
        // eslint-disable-next-line
        const { id, hasBeenCreated, ...workoutToSend } = workout;
        firestore
            .collection('workouts')
            .doc(workout?.id)
            .update(workoutToSend)
            .then(() => {
                enqueueSnackbar(t('notifications.updateSuccess', { item: workout.name }), { variant: 'success' });
                navigateToManageWorkouts();
            })
            .catch(() => {
                enqueueSnackbar(t('notifications.updateFailure', { item: workout.name }), { variant: 'error' });
            });
    };

    const handleCreate = () => {
        // eslint-disable-next-line
        const { id, hasBeenCreated, ...workoutToSend } = workout;
        firestore
            .collection('workouts')
            .add(workoutToSend)
            .then((docRef) => {
                enqueueSnackbar(t('notifications.createSuccess', { item: workout.name }), { variant: 'success' });
                setWorkout({ ...workout, hasBeenCreated: true, id: docRef.id });
                navigateToManageWorkouts();
            })
            .catch(() => {
                enqueueSnackbar(t('notifications.createFailure', { item: workout.name }), { variant: 'error' });
            });
    };

    const onSubmit = () => (!workout.hasBeenCreated ? handleCreate() : handleUpdate());

    const navigateToManageWorkouts = (): void => {
        history.push('/workouts');
    };

    return (
        <div data-testid={pageName}>
            <Stack spacing={2} mt={2} ml={2} mr={2}>
                <Title
                    translationKey={
                        !workout.hasBeenCreated ? 'page.editWorkout.createWorkout' : 'page.editWorkout.editWorkout'
                    }
                ></Title>
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
                <WorkoutExercises parentIdPrefix={idPrefix} workout={workout} setWorkout={setWorkout} />
                <AddButton onClick={addExerciseToWorkout} testId={`${idPrefix}add_exercise_button`} />
            </Stack>
            <Stack spacing={2} mt={5} ml={2} mr={2}>
                <SubmitButton
                    testId={`${idPrefix}submit_button`}
                    isCreate={!workout.hasBeenCreated}
                    onSubmit={onSubmit}
                />
            </Stack>
        </div>
    );
};

export default EditWorkout;
