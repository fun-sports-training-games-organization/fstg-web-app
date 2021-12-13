import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as notification from '../../../util/notifications-util';
import * as navigate from '../../../util/navigation-util';
import AddButton from '../../../components/atoms/add-button/AddButton';
import PageTitle from '../../../components/atoms/page-title/PageTitle';
import SubmitButton from '../../../components/atoms/submit-button/SubmitButton';
import WorkoutExercises from '../../../components/organisms/workout-exercises/WorkoutExercises';
import { Id } from '../../../model/basics';
import { ExerciseWorkoutSettings } from '../../../model/exercise-workout-settings';
import { Workout } from '../../../model/workout';
import { prepareDataToSend } from '../../../util/data-prep-util';
import { getPageIdPrefix } from '../../../util/id-util';

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

    const handleUpdate = (shouldNavigate = true) => {
        firestore
            .collection('workouts')
            .doc(workout?.id)
            .update(prepareDataToSend(workout, firebase.auth().currentUser))
            .then(() => {
                notification.updateSuccess(enqueueSnackbar, t, workout.name);

                if (shouldNavigate) {
                    navigate.toManageWorkouts(history);
                }
            })
            .catch(() => {
                notification.updateError(enqueueSnackbar, t, workout.name);
            });
    };

    const handleCreate = (shouldNavigate = true) => {
        firestore
            .collection('workouts')
            .add(prepareDataToSend(workout, firebase.auth().currentUser))
            .then(() => {
                notification.createSuccess(enqueueSnackbar, t, workout.name);

                if (shouldNavigate) {
                    navigate.toManageWorkouts(history);
                }
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
                <WorkoutExercises
                    parentIdPrefix={idPrefix}
                    workout={workout}
                    setWorkout={setWorkout}
                    save={!workout.hasBeenCreated ? handleCreate : handleUpdate}
                />
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
