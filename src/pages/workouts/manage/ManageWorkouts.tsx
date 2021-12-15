import { FC, useEffect, useState } from 'react';
import { IconButton, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { useFirestore } from 'react-redux-firebase';
import { Delete, Edit } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationDialog from '../../../components/molecules/delete-confirmation-dialog/DeleteConfirmationDialog';
import PageTitleAdd from '../../../components/molecules/page-title-add/PageTitleAdd';
import { Workout } from '../../../model/workout';
import { getPageIdPrefix } from '../../../util/id-util';
import * as navigate from '../../../util/navigation-util';
import Accordion from '../../../components/molecules/accordion/Accordion';
import { AccordionProp } from '../../../components/molecules/accordion/Accordion.types';
import { ExerciseWorkoutSettings } from '../../../model/exercise-workout-settings';
import MenuIcon from '../../../components/atoms/menu-icon/MenuIcon';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Exercise } from '../../../model/exercise';
import { addLeadingZero } from '../../../util/number-util';

const ManageWorkouts: FC = () => {
    const pageName = 'manage_workouts';
    const idPrefix = getPageIdPrefix(pageName);
    const exerciseItemPrefix = `${idPrefix}exercise_list__item_`;
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

    const getAccordionProp = (workout: Workout, exerciseItemPrefix: string, index: number): AccordionProp => {
        const getExerciseItem = (exercise: ExerciseWorkoutSettings | Exercise): JSX.Element => {
            return (
                <Typography
                    key={exercise.id}
                    id={`${exerciseItemPrefix}${index}`}
                    align="left"
                    variant="body2"
                    sx={{ lineHeight: 2.2 }}
                >
                    {exercise.name}
                </Typography>
            );
        };

        const getContent = (): JSX.Element[] => workout.exercises.map((exercise) => getExerciseItem(exercise));

        const getActionsButton = (): JSX.Element => {
            return (
                <MenuIcon icon={<MoreVertIcon style={{ color: 'black' }} />}>
                    <MenuList>
                        <MenuItem
                            key={`${idPrefix}edit_item_${index}`}
                            onClick={() => navigate.toEditWorkout(history, workout.id)}
                        >
                            <IconButton
                                data-testid={`${idPrefix}edit_item_${index}`}
                                onClick={() => navigate.toEditWorkout(history, workout.id)}
                            >
                                <Edit htmlColor={'steelblue'} />
                            </IconButton>
                        </MenuItem>
                        <MenuItem
                            key={`${idPrefix}delete_item_${index}`}
                            onClick={() => {
                                handleDelete(workout);
                            }}
                        >
                            <IconButton
                                data-testid={`${idPrefix}delete_item_${index}`}
                                onClick={() => {
                                    handleDelete(workout);
                                }}
                            >
                                <Delete htmlColor={'palevioletred'} />
                            </IconButton>
                        </MenuItem>
                    </MenuList>
                </MenuIcon>
            );
        };

        const getSubtitle = (): JSX.Element => {
            const getFormattedTotalWorkoutTime = (): string => {
                const getTotalWorkoutSeconds = (): number => {
                    const getNumber = (val: string | number | undefined): number => {
                        if (typeof val === 'number') {
                            return val;
                        } else if (typeof val === 'string') {
                            return parseInt(val);
                        }

                        return 0;
                    };

                    return workout.exercises
                        .map((exercise) =>
                            exercise.amountType === 'TIME_BASED' ? getNumber((exercise as Exercise).amountValue) : 0
                        )
                        .reduce((a, b) => a + b);
                };
                const totalWorkoutSeconds = getTotalWorkoutSeconds();
                const formattedWorkoutMinutes = addLeadingZero(Math.floor(totalWorkoutSeconds / 60));
                const formattedWorkoutSeconds = addLeadingZero(totalWorkoutSeconds % 60);
                return `${formattedWorkoutMinutes}:${formattedWorkoutSeconds}`;
            };

            return (
                <>
                    <Stack direction="row" alignItems="end" spacing={1} display={{ xs: 'none', sm: 'flex' }}>
                        <Typography key={workout.id} id={`${exerciseItemPrefix}${index}`}>
                            {workout.exercises.length}
                        </Typography>
                        <FitnessCenterIcon></FitnessCenterIcon>
                    </Stack>
                    <Stack direction="row" alignItems="end" spacing={1} display={{ xs: 'none', sm: 'flex' }}>
                        <Typography key={workout.id} id={`${exerciseItemPrefix}${index}`}>
                            {getFormattedTotalWorkoutTime()}
                        </Typography>
                        <QueryBuilderIcon></QueryBuilderIcon>
                    </Stack>
                </>
            );
        };
        return {
            title: workout.name,
            subtitle: getSubtitle(),
            actionsButton: getActionsButton(),
            content: getContent()
        };
    };

    return (
        <div data-testid={pageName}>
            <PageTitleAdd
                onClick={() => navigate.toEditWorkout(history, undefined)}
                titleTranslationKey="page.manageWorkouts.workouts"
                idPrefix={idPrefix}
            ></PageTitleAdd>
            <Stack ml={2} mr={2} mt={3} mb={3}>
                <Accordion
                    accordions={workouts.map((workout, index) => getAccordionProp(workout, exerciseItemPrefix, index))}
                ></Accordion>
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
