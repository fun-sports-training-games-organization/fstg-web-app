import { Grid, IconButton, List, ListItem, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { Exercise } from '../../../model/Exercise.model';
import DeleteConfirmationDialog from '../../../components/molecules/delete-confirmation-dialog/DeleteConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { getPageIdPrefix } from '../../../util/id-util';
import PageTitleActionButton from '../../../components/molecules/page-title-action/PageTitleAction';
import useEntityManager from '../../../hooks/useEntityManager';
import AddButton from '../../../components/atoms/add-button/AddButton';
import ResponsiveDialog from '../../../components/organisms/responsive-dialog';
import CreateEditExerciseForm from '../../../components/organisms/create-edit-exercise-form/CreateEditExerciseForm';

const ManageExercises: FC = (): JSX.Element => {
    const pageName = 'manage_exercises';
    const idPrefix = getPageIdPrefix(pageName);
    const { t } = useTranslation();
    const { entities } = useEntityManager<Exercise>('exercises');

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();
    const [exerciseId, setExerciseId] = useState<string>();

    const handleDelete = async (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        setExercises(entities);
    }, [entities]);

    const handleUpdate = (exercise: Exercise) => {
        setExerciseId(exercise.id);
        setOpenDialog(true);
    };

    return (
        <>
            <PageTitleActionButton
                actionButton={
                    <AddButton
                        onClick={() => {
                            setOpenDialog(true);
                            setExerciseId(undefined);
                        }}
                        testId={`${idPrefix}add_button`}
                    />
                }
                titleTranslationKey="page.manageExercises.exercises"
                idPrefix={idPrefix}
            />
            <Stack ml={2} mr={2} mt={3} mb={3}>
                <List>
                    {exercises.map((exercise: Exercise) => {
                        return (
                            <Grid container key={exercise.id} display={'flex'} flexDirection={'row'}>
                                <Grid item xs={8}>
                                    <ListItem key={exercise.id}>{exercise.name}</ListItem>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={() => handleUpdate(exercise)}>
                                        <Edit htmlColor={'steelblue'} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(exercise).catch(console.error);
                                        }}
                                    >
                                        <Delete htmlColor={'palevioletred'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        );
                    })}
                </List>
                <ResponsiveDialog
                    title={t('dialog.editExercise.title')}
                    message={t('dialog.editExercise.message')}
                    open={openDialog}
                    content={
                        <CreateEditExerciseForm
                            exerciseId={exerciseId}
                            handleClose={() => {
                                setExerciseId(undefined);
                                setOpenDialog(false);
                            }}
                        />
                    }
                    // setOpen={setOpenDialog}
                    // exerciseId={exerciseId}
                />
                <DeleteConfirmationDialog
                    openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                    itemToDelete={exerciseToDelete}
                    entityName="exercises"
                    closeDialog={() => setOpenDeleteConfirmationDialog(false)}
                />
            </Stack>
        </>
    );
};
export default ManageExercises;
