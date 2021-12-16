import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Exercise } from '../../../model/exercise';
import { useSnackbar } from 'notistack';
import CreateEditExerciseForm from '../../CreateEditExerciseForm';
import * as notification from '../../../util/notifications-util';
import useEntityManager from '../../../hooks/useEntityManager';

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
    useDefaultResult: false
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
    const { createEntity, updateEntity } = useEntityManager<Exercise>('exercises');
    const handleClose = () => {
        setOpen(false);
        setExercise(emptyExercise);
    };

    const handleUpdate = () => {
        if (exercise?.id) {
            updateEntity(exercise)
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
        createEntity(exercise)
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
