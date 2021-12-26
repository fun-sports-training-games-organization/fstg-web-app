import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CreateEditExerciseForm from '../create-edit-exercise-form/CreateEditExerciseForm';
import { ExerciseWorkoutSettings } from '../../../model/Exercise.model';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    message: string;
    exercise: ExerciseWorkoutSettings;
    setExercise: (exercise: ExerciseWorkoutSettings) => void;
    save: (shouldNavigate?: boolean) => void;
};

const EditWorkoutExerciseSettingsDialog = ({ open, setOpen, title, message, exercise, save }: Props): JSX.Element => {
    const { t } = useTranslation();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <CreateEditExerciseForm exerciseId={exercise.id} inWorkout={true} handleClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('global.cancel')}</Button>
                    <Button
                        onClick={() => {
                            save(false);
                            handleClose();
                        }}
                    >
                        {t('global.save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditWorkoutExerciseSettingsDialog;
