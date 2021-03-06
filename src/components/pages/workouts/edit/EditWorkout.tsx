import { ChangeEvent, FC, FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as notification from '../../../../util/notifications-util';
import * as navigate from '../../../../util/navigation-util';
import PageTitle from '../../../atoms/page-title/PageTitle';
import SubmitButton from '../../../atoms/submit-button/SubmitButton';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import ManageWorkoutExercises from '../../../molecules/manage-workout-exercises/ManageWorkoutExercises';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout, getShouldSubmitAndNavigate } from '../../../../util/workout-util';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';
import ConfirmationDialog from '../../../organisms/dialogs/confirmation-dialog/ConfirmationDialog';
import { getNewEmptyExerciseWorkoutSettings } from '../../../../util/exercise-util';

const EditWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const submitTestId = `${idPrefix}submit_button`;
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams() as Id;
    const workoutId = params?.id;
    const entityManager = useEntityManager<Workout>('workouts');

    const addExerciseToWorkout = (): void => {
        if (workout && workout.exercises) {
            setWorkout({
                ...workout,
                exercises: [...workout.exercises, getNewEmptyExerciseWorkoutSettings()]
            });
        }
    };

    const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());

    const loadWorkout = useCallback(() => {
        if (workoutId) {
            entityManager
                .findById(workoutId)
                .then((wo: Workout) => {
                    console.log(wo);
                    setWorkout({ ...wo, id: workoutId, hasBeenCreated: true });
                })
                .catch(() => {
                    setWorkout(getNewEmptyWorkout());
                });
        } else {
            setWorkout(getNewEmptyWorkout());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    const handleUpdate = (shouldNavigate = true) => {
        if (workout && workout.exercises) {
            const workoutToSave = {
                ...workout,
                exercises: workout.exercises.filter((exercise) => exercise.exerciseId !== 'none')
            };
            entityManager
                .updateEntity(workoutToSave)
                .then(() => {
                    setWorkout(workoutToSave);
                    notification.updateSuccess(enqueueSnackbar, t, workout.name);

                    if (shouldNavigate) {
                        navigate.toManageWorkouts();
                        setWorkout(getNewEmptyWorkout());
                    }
                })
                .catch(() => {
                    notification.updateError(enqueueSnackbar, t, workout.name);
                });
        }
    };

    const handleCreate = (navigateToManageWorkouts = true) => {
        if (workout && workout.exercises) {
            const workoutToCreate = {
                ...workout,
                exercises: workout.exercises.filter((exercise) => exercise.exerciseId !== 'none')
            };
            entityManager
                .createEntity(workoutToCreate)
                .then((id) => {
                    notification.createSuccess(enqueueSnackbar, t, workout.name);
                    setWorkout(getNewEmptyWorkout());

                    if (navigateToManageWorkouts) {
                        navigate.toManageWorkouts();
                    } else {
                        navigate.toEditWorkout(id);
                    }
                })
                .catch(() => {
                    notification.createError(enqueueSnackbar, t, workout.name);
                });
        }
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { shouldSubmit, shouldNavigate } = getShouldSubmitAndNavigate(e, submitTestId, t);
        if (shouldSubmit) {
            !workout.hasBeenCreated ? handleCreate(shouldNavigate) : handleUpdate(shouldNavigate);
        }
    };

    const discardChanges = () => {
        setOpenConfirmationDialog(true);
    };

    const onClose = (event: SyntheticEvent<HTMLButtonElement>) => {
        if (event.currentTarget.value === 'confirm') {
            navigate.toManageWorkouts();
        } else {
            setOpenConfirmationDialog(false);
        }
    };

    return (
        <ResponsiveContainer xs={11}>
            <div data-testid={pageName}>
                <form onSubmit={onSubmit}>
                    <Stack spacing={2} mt={2}>
                        <PageTitle
                            translationKey={
                                !workout.hasBeenCreated
                                    ? 'page.editWorkout.createWorkout'
                                    : 'page.editWorkout.editWorkout'
                            }
                        />
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id={`${idPrefix}name`}
                            label={t('form.label.workout.name')}
                            type="text"
                            fullWidth
                            value={workout.name}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setWorkout({ ...workout, name: event.target.value })
                            }
                        />
                        <ManageWorkoutExercises parentIdPrefix={idPrefix} workout={workout} setWorkout={setWorkout} />
                        <Button
                            color={'info'}
                            data-testid={`${idPrefix}add_exercise_button`}
                            variant={'contained'}
                            fullWidth={true}
                            onClick={addExerciseToWorkout}
                        >
                            {t('form.button.editWorkout.addExercise')}
                        </Button>
                        <Button
                            color={'secondary'}
                            data-testid={`${idPrefix}discard_changes_button`}
                            variant={'contained'}
                            fullWidth={true}
                            onClick={discardChanges}
                        >
                            {t('form.button.editWorkout.discardChanges')}
                        </Button>
                        <SubmitButton testId={submitTestId} isCreate={!workout.hasBeenCreated} />
                    </Stack>
                </form>
                <ConfirmationDialog
                    open={openConfirmationDialog}
                    title={t('dialog.discardChanges.title')}
                    message={t('dialog.discardChanges.message')}
                    onClose={onClose}
                />
            </div>
        </ResponsiveContainer>
    );
};

export default EditWorkout;
