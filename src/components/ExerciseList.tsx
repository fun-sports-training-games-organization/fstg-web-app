import { Grid, IconButton, List, ListItem } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Exercise } from '../pages/Home';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import FormDialog from './FormDialog';
import ConfirmationDialog from './ConfirmationDialog';
import { useTranslation } from 'react-i18next';

const ExerciseList: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [id, setId] = useState<string>();
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();
    const [name, setName] = useState<string>();

    const handleDelete = async (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        onSnapshot(collection(db, 'exercises'), (snapshot) => {
            const exercises = snapshot.docs.map((doc) => {
                const { id } = doc;
                return { id, ...doc.data() };
            });
            setExercises(exercises as Exercise[]);
        });
    }, []);

    const handleUpdate = (exercise: Exercise) => {
        setName(exercise.name);
        setId(exercise.id);
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
            {id && name && (
                <FormDialog open={openDialog} setOpen={setOpenDialog} exerciseId={id} name={name} setName={setName} />
            )}
            <ConfirmationDialog
                open={openDeleteConfirmationDialog}
                title={t('dialog.deleteConfirmation.title')}
                message={t('dialog.deleteConfirmation.message', { name: exerciseToDelete?.name })}
                onClose={async (event: SyntheticEvent<HTMLButtonElement>) => {
                    if (event.currentTarget.value === 'confirm') {
                        exerciseToDelete && (await deleteDoc(doc(db, 'exercises', exerciseToDelete.id)));
                    }
                    setOpenDeleteConfirmationDialog(false);
                }}
            />
        </>
    );
};
export default ExerciseList;
