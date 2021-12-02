import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { Exercise } from '../../../model/exercise';
import { useSnackbar } from 'notistack';
import { prepareDataToSend } from '../../../util/data-prep-util';
import CreateEditExerciseForm from '../../CreateEditExerciseForm';
import * as notification from '../../../util/notifications-util';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    exercise?: Exercise;
    setExercise: Dispatch<SetStateAction<Exercise | undefined>>;
    title: string;
    message: string;
};

const emptyExercise: Exercise = {
    name: '',
    imageOrGifUrl: '',
    amountType: 'COUNT_BASED',
    amountValue: 0,
    resultType: 'COUNT_BASED',
    resultValue: 0,
    recordResultsByDefault: false,
    useDefaultResults: false
};

const EditExerciseDialog = ({
    open,
    setOpen,
    title,
    message,
    exercise = emptyExercise,
    setExercise
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const firebase = useFirebase();
    const handleClose = () => {
        setOpen(false);
        setExercise(emptyExercise);
    };

    const handleUpdate = () => {
        if (exercise?.id) {
            firestore
                .collection('exercises')
                .doc(exercise?.id)
                .update(prepareDataToSend(exercise, firebase.auth().currentUser))
                .then(() => {
                    notification.updateSuccess(enqueueSnackbar, t, exercise.name);
                    setOpen(false);
                })
                .catch(() => {
                    notification.updateError(enqueueSnackbar, t, exercise.name);
                });
        }
    };

    const handleCreate = () => {
        firestore
            .collection('exercises')
            .add(prepareDataToSend(exercise, firebase.auth().currentUser))
            .then(() => {
                notification.createSuccess(enqueueSnackbar, t, exercise.name);
                setOpen(false);
                setExercise(emptyExercise);
            })
            .catch(() => {
                notification.createError(enqueueSnackbar, t, exercise.name);
            });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <CreateEditExerciseForm entity={exercise} setEntity={setExercise} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('global.cancel')}</Button>
                    <Button onClick={() => (exercise?.id ? handleUpdate() : handleCreate())}>
                        {t(exercise?.id ? 'global.save' : 'global.create')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditExerciseDialog;
