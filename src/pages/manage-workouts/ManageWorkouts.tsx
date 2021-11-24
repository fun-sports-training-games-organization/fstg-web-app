import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Grid, IconButton, List, ListItem } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Workout } from '../../model/workout';
import { useSnackbar } from 'notistack';
import { getPageIdPrefix } from '../../util/id-util';
import { Delete, Edit } from '@mui/icons-material';
import ConfirmationDialog from '../../components/organisms/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const ManageWorkouts: FC = () => {
    const pageName = 'workouts_dashboard';
    const idPrefix = getPageIdPrefix(pageName);
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
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
                {workouts.map((workout: Workout) => {
                    return (
                        <Grid container key={workout.id} display={'flex'} flexDirection={'row'}>
                            <Grid item>
                                <ListItem key={workout.id}>{workout.name}</ListItem>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => navigateToEditWorkout(workout.id)}>
                                    <Edit htmlColor={'steelblue'} />
                                </IconButton>
                                <IconButton
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
            <ConfirmationDialog
                open={openDeleteConfirmationDialog}
                title={t('dialog.deleteConfirmation.title')}
                message={t('dialog.deleteConfirmation.message', { name: workoutToDelete?.name })}
                onClose={async (event: SyntheticEvent<HTMLButtonElement>) => {
                    if (event.currentTarget.value === 'confirm') {
                        workoutToDelete &&
                            workoutToDelete.id &&
                            (await firestore.collection('workouts').doc(workoutToDelete.id).delete());
                    }
                    setOpenDeleteConfirmationDialog(false);
                }}
            />
        </div>
    );
};

export default ManageWorkouts;
