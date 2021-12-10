import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { prepareDataToSend } from '../../../util/data-prep-util';
import CreateEditExerciseForm from '../../CreateEditExerciseForm';
import * as notification from '../../../util/notifications-util';
import { ExerciseWorkoutSettings } from '../../../model/exercise-workout-settings';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    exerciseWorkoutSettings?: ExerciseWorkoutSettings;
    setExerciseWorkoutSettings: Dispatch<SetStateAction<ExerciseWorkoutSettings | undefined>>;
    title: string;
    message: string;
};

const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
    name: '',
    amountType: 'number',
    resultType: 'number',
    recordResults: false,
    useDefaultResult: false
};

const EditWorkoutExerciseSettingsDialog = ({
    open,
    setOpen,
    title,
    message,
    exerciseWorkoutSettings = emptyExerciseWorkoutSettings,
    setExerciseWorkoutSettings
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const firebase = useFirebase();
    const handleClose = () => {
        setOpen(false);
        setExerciseWorkoutSettings(emptyExerciseWorkoutSettings);
    };

    const handleUpdate = () => {
        if (exerciseWorkoutSettings?.id) {
            firestore
                .collection('workouts')
                .doc(exerciseWorkoutSettings?.id)
                .update(prepareDataToSend(exerciseWorkoutSettings, firebase.auth().currentUser))
                .then(() => {
                    notification.updateSuccess(enqueueSnackbar, t, exerciseWorkoutSettings.name);
                    setOpen(false);
                })
                .catch(() => {
                    notification.updateError(enqueueSnackbar, t, exerciseWorkoutSettings.name);
                });
        }
    };

    const handleCreate = () => {
        firestore
            .collection('exercises')
            .add(prepareDataToSend(exerciseWorkoutSettings, firebase.auth().currentUser))
            .then(() => {
                notification.createSuccess(enqueueSnackbar, t, exerciseWorkoutSettings.name);
                setOpen(false);
                setExerciseWorkoutSettings(emptyExerciseWorkoutSettings);
            })
            .catch(() => {
                notification.createError(enqueueSnackbar, t, exerciseWorkoutSettings.name);
            });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <CreateEditExerciseForm entity={exerciseWorkoutSettings} setEntity={setExerciseWorkoutSettings} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('global.cancel')}</Button>
                    <Button onClick={() => (exerciseWorkoutSettings?.id ? handleUpdate() : handleCreate())}>
                        {t(exerciseWorkoutSettings?.id ? 'global.save' : 'global.create')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditWorkoutExerciseSettingsDialog;
