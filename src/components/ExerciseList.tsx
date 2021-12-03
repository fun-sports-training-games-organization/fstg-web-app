import { Button, Grid, IconButton, List, ListItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
// import { db } from '../config/firebase';
import { useFirestore } from 'react-redux-firebase';

import { useTranslation } from 'react-i18next';
import { Exercise } from '../model/exercise';
import ConfirmationDialog from './organisms/confirmation-dialog/ConfirmationDialog';
import EditExerciseDialog from './organisms/edit-exercise-dialog/EditExerciseDialog';

const ExerciseList: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const firestore = useFirestore();

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();
    const [exercise, setExercise] = useState<Exercise>();

    const handleDelete = async (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        firestore.collection('exercises').onSnapshot((snapshot) => {
            const exercises = snapshot.docs.map((doc) => {
                const { id } = doc;
                return { id, ...doc.data() };
            });
            setExercises(exercises as Exercise[]);
        });
    }, [firestore]);

    const handleUpdate = (exercise: Exercise) => {
        setExercise(exercise);
        setOpenDialog(true);
    };

    return (
        <>
            <List>
                {exercises.map((exercise: Exercise) => {
                    return (
                        <Grid container key={exercise.id} display={'flex'} flexDirection={'row'}>
                            <Grid item>
                                <ListItem key={exercise.id}>{exercise.name}</ListItem>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => handleUpdate(exercise)}>
                                    <Edit htmlColor={'steelblue'} />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        handleDelete(exercise);
                                    }}
                                >
                                    <Delete htmlColor={'palevioletred'} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    );
                })}
            </List>
            <Button
                variant="contained"
                onClick={() => {
                    setExercise(undefined);
                    setOpenDialog(true);
                }}
            >
                {t('global.add')}
            </Button>
            <EditExerciseDialog
                title={t('dialog.editExercise.title')}
                message={t('dialog.editExercise.message')}
                open={openDialog}
                setOpen={setOpenDialog}
                exercise={exercise}
                setExercise={setExercise}
            />
            <ConfirmationDialog
                open={openDeleteConfirmationDialog}
                title={t('dialog.deleteConfirmation.title')}
                message={t('dialog.deleteConfirmation.message', { name: exerciseToDelete?.name })}
                onClose={async (event: SyntheticEvent<HTMLButtonElement>) => {
                    if (event.currentTarget.value === 'confirm') {
                        exerciseToDelete &&
                            exerciseToDelete.id &&
                            (await firestore.collection('exercises').doc(exerciseToDelete.id).delete());
                    }
                    setOpenDeleteConfirmationDialog(false);
                }}
            />
        </>
    );
};
export default ExerciseList;
