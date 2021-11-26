import { FC, useEffect, useState } from 'react';
import { Grid, IconButton, List, ListItem, Stack } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { getPageIdPrefix } from '../../util/id-util';
import { Delete, Edit } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import PageTitleAdd from '../../components/molecules/PageTitleAdd';
import WorkoutExercises from '../../components/WorkoutExercises';
import * as navigate from '../../util/navigation-util';

const ManageWorkouts: FC = () => {
    const pageName = 'manage_workouts';
    const idPrefix = getPageIdPrefix(pageName);
    const history = useHistory();
    const firestore = useFirestore();

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [workoutToDelete, setWorkoutToDelete] = useState<Workout>();

    const handleDelete = async (workout: Workout) => {
        setWorkoutToDelete(workout);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        firestore.collection('workouts').onSnapshot((snapshot) => {
            const workouts = snapshot.docs.map((doc) => {
                const { id } = doc;
                return { id, ...doc.data() };
            });
            setWorkouts(workouts as Workout[]);
        });
    }, [firestore]);

    return (
        <div data-testid={pageName}>
            <PageTitleAdd
                onClick={() => navigate.toEditWorkout(history, undefined)}
                titleTranslationKey="page.manageWorkouts.workouts"
                idPrefix={idPrefix}
            ></PageTitleAdd>
            <Stack ml={2} mr={2} mt={3} mb={3}>
                <List>
                    {workouts.map((workout: Workout, index: number) => {
                        return (
                            <Grid container key={workout.id} display={'flex'} flexDirection={'row'}>
                                <Grid item xs={8}>
                                    <ListItem key={workout.id}>{workout.name}</ListItem>
                                    <WorkoutExercises parentIdPrefix={idPrefix} workout={workout} />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        data-testid={`${idPrefix}edit_item_${index}`}
                                        onClick={() => navigate.toEditWorkout(history, workout.id)}
                                    >
                                        <Edit htmlColor={'steelblue'} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        data-testid={`${idPrefix}delete_item_${index}`}
                                        onClick={() => {
                                            handleDelete(workout);
                                        }}
                                    >
                                        <Delete htmlColor={'palevioletred'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        );
                    })}
                </List>
                <DeleteConfirmationDialog
                    openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                    itemToDelete={workoutToDelete}
                    collection="workouts"
                    closeDialog={() => setOpenDeleteConfirmationDialog(false)}
                />
            </Stack>
        </div>
    );
};

export default ManageWorkouts;
