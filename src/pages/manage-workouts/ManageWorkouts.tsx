import { FC, useEffect, useState } from 'react';
import { Grid, IconButton, List, ListItem } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { getPageIdPrefix } from '../../util/id-util';
import { Delete, Edit } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

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
    const navigateToEditWorkout = (workoutId?: string): void => {
        history.push(`/workout${workoutId ? `/${workoutId}` : ''}`);
    };

    return (
        <div data-testid={pageName}>
            <List>
                {workouts.map((workout: Workout, index: number) => {
                    return (
                        <Grid container key={workout.id} display={'flex'} flexDirection={'row'}>
                            <Grid item>
                                <ListItem key={workout.id}>{workout.name}</ListItem>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    data-testid={`${idPrefix}edit_item_${index}`}
                                    onClick={() => navigateToEditWorkout(workout.id)}
                                >
                                    <Edit htmlColor={'steelblue'} />
                                </IconButton>
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
        </div>
    );
};

export default ManageWorkouts;
