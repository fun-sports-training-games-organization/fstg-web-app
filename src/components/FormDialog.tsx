import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { db } from '../config/firebase';
import { useFirestore } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { Exercise } from '../model/exercise';
import { useSnackbar } from 'notistack';
import CreateEditForm from './CreateEditForm';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    exercise?: Exercise;
    setExercise: Dispatch<SetStateAction<Exercise | undefined>>;
    title: string;
    message: string;
};

const emptyExercise = {
    name: '',
    imageOrGif: '',
    defaultType: '',
    defaultValue: 0,
    defaultResult: 0,
    defaultDistance: 0,
    defaultTargetSize: 0
};

const FormDialog = ({ open, setOpen, title, message, exercise = emptyExercise, setExercise }: Props): JSX.Element => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        if (exercise?.id) {
            firestore
                .collection('exercises')
                .doc(exercise?.id)
                .update(exercise)
                .then(() => {
                    enqueueSnackbar(`${exercise.name} was successfully updated`, { variant: 'success' });
                    setOpen(false);
                })
                .catch(() => {
                    enqueueSnackbar(`${exercise.name} could not be updated`, { variant: 'error' });
                });
            // .doc(exercise?.id).update({ exercise });
            // firestore.update()
            // const docRef = doc(db, 'exercises', exercise?.id);
            // await updateDoc(docRef, { exercise });
        }
    };

    const handleCreate = () => {
        firestore
            .collection('exercises')
            .add(exercise)
            .then(() => {
                enqueueSnackbar(`${exercise?.name} has been added successfully!`, { variant: 'success' });
                setOpen(false);
                exercise = emptyExercise;
            })
            .catch(() => {
                enqueueSnackbar(`${exercise.name} could not be created`, { variant: 'error' });
            }); // to add with auto generate id

        // const collectionRef = collection(db, 'exercises');
        // const payload = exercise;
        // addDoc(collectionRef, payload)
        //     .then(() => {
        //         enqueueSnackbar(`${exercise?.name} has been added successfully!`, { variant: 'success' });
        //         setOpen(false);
        //         exercise = emptyExercise;
        //     })
        //     .catch(() => {
        //         enqueueSnackbar(`${exercise.name} could not be created`, { variant: 'error' });
        //     }); // to add with auto generate id
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <CreateEditForm entity={exercise} setEntity={setExercise} />
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
export default FormDialog;
