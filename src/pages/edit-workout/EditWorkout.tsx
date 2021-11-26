import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { ExerciseWorkoutSettings } from '../../model/exercise-workout-settings';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { getPageIdPrefix } from '../../util/id-util';
import { prepareDataToSend } from '../../util/data-prep-util';
import { useHistory, useParams } from 'react-router-dom';
import { Id } from '../../model/basics';
import AddButton from '../../components/atoms/AddButton';
import SubmitButton from '../../components/atoms/SubmitButton';
import PageTitle from '../../components/atoms/PageTitle';
import WorkoutExercises from '../../components/WorkoutExercises';
import { useTranslation } from 'react-i18next';
import * as notification from '../../util/notifications-util';
import * as navigate from '../../util/navigation-util';

const EditWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const history = useHistory();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const firebase = useFirebase();
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    console.log({ history });

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
        firestore
            .collection('workouts')
            .doc(workout?.id)
            .update(prepareDataToSend(workout, firebase.auth().currentUser))
            .then(() => {
                notification.updateSuccess(enqueueSnackbar, t, workout.name);
                navigate.toManageWorkouts(history);
            })
            .catch(() => {
                notification.updateError(enqueueSnackbar, t, workout.name);
            });
    };

    const handleCreate = () => {
        firestore
            .collection('workouts')
            .add(prepareDataToSend(workout, firebase.auth().currentUser))
            .then(() => {
                notification.createSuccess(enqueueSnackbar, t, workout.name);
                navigate.toManageWorkouts(history);
            })
            .catch(() => {
                notification.createError(enqueueSnackbar, t, workout.name);
            });
    };

    const onSubmit = () => (!workout.hasBeenCreated ? handleCreate() : handleUpdate());

    return (
        <div data-testid={pageName}>
            <Stack spacing={2} mt={2} ml={2} mr={2}>
                <PageTitle
                    translationKey={
                        !workout.hasBeenCreated ? 'page.editWorkout.createWorkout' : 'page.editWorkout.editWorkout'
                    }
                ></PageTitle>
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
