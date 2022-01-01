import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as notification from '../../../../util/notifications-util';
import * as navigate from '../../../../util/navigation-util';
import AddButton from '../../../atoms/add-button/AddButton';
import PageTitle from '../../../atoms/page-title/PageTitle';
import SubmitButton from '../../../atoms/submit-button/SubmitButton';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import ManageWorkoutExercises from '../../../molecules/manage-workout-exercises/ManageWorkoutExercises';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import { getNewEmptyExerciseWorkoutSettings } from '../../../../util/exercise-util';

const EditWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const history = useHistory();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const entityManager = useEntityManager<Workout>('workouts');

    const addExerciseToWorkout = (): void =>
        setWorkout({
            ...workout,
            exercises: [...workout.exercises, getNewEmptyExerciseWorkoutSettings()]
        });

    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());

    const loadWorkout = useCallback(() => {
        workoutId &&
            entityManager.findById(workoutId).then((wo: Workout) => {
                setWorkout({ ...wo, id: workoutId, hasBeenCreated: true });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    const handleUpdate = (shouldNavigate = true) => {
        entityManager
            .updateEntity(workout)
            .then(() => {
                setWorkout(workout);
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
        entityManager
            .createEntity(workout)
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
            <Stack spacing={2} mt={2} ml={{ xs: 1, sm: 2 }} mr={{ xs: 1, sm: 2 }}>
                <PageTitle
                    translationKey={
                        !workout.hasBeenCreated ? 'page.editWorkout.createWorkout' : 'page.editWorkout.editWorkout'
                    }
                />
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
                <ManageWorkoutExercises
                    parentIdPrefix={idPrefix}
                    workout={workout}
                    setWorkout={setWorkout}
                    save={() => loadWorkout()}
                />
                <Stack alignSelf="center">
                    <AddButton onClick={addExerciseToWorkout} testId={`${idPrefix}add_exercise_button`} />
                </Stack>
            </Stack>
            <Stack spacing={2} mt={5} ml={{ xs: 1, sm: 2 }} mr={{ xs: 1, sm: 2 }}>
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
