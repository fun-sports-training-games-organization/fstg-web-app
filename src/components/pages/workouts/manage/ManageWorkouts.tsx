import { FC, useEffect, useState } from 'react';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationDialog from '../../../molecules/delete-confirmation-dialog/DeleteConfirmationDialog';
import PageTitleActionButton from '../../../molecules/page-title-action/PageTitleAction';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import * as navigate from '../../../../util/navigation-util';
import Accordion from '../../../molecules/accordion/Accordion';
import { AccordionProp } from '../../../molecules/accordion/Accordion.types';
import ExercisesTimeRepsIcons from '../../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import ActionsMenu from '../../../molecules/actions-menu/ActionsMenu';
import ExercisesContent from '../../../organisms/exercises-content/ExercisesContent';
import useEntityManager from '../../../../hooks/useEntityManager';
import { v4 as uuidv4 } from 'uuid';
import AddButton from '../../../atoms/add-button/AddButton';
import ResponsiveContainer from '../../../organisms/responsive-container/ResponsiveContainer';
import theme from '../../../../theme/theme';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';

const ManageWorkouts: FC = () => {
    const pageName = 'manage_workouts';
    const idPrefix = getPageIdPrefix(pageName);
    const exerciseItemPrefix = `${idPrefix}exercise_list__item_`;
    const history = useHistory();
    const { entities } = useEntityManager<Workout>('workouts');

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [workoutToDelete, setWorkoutToDelete] = useState<Workout>();

    const handleDelete = async (workout: unknown) => {
        setWorkoutToDelete(workout as Workout);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        setWorkouts(entities);
    }, [entities]);

    const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.between(400, 'sm'));

    const getAccordionProp = (workout: Workout, exerciseItemPrefix: string, index: number): AccordionProp => {
        return {
            title: workout.name,
            subtitle: (
                <ExercisesTimeRepsIcons
                    entities={workout.exercises}
                    id={workout.id ? workout.id : uuidv4()}
                    length={workout.exercises.length}
                    parentIdPrefix={exerciseItemPrefix}
                    index={index}
                    display={{ xs: 'none', sm: 'flex' }}
                />
            ),
            actionsButton: (
                <Stack
                    gridColumn="95 / 100"
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <ActionsMenu
                        parentIdPrefix={exerciseItemPrefix}
                        index={index}
                        options={[
                            {
                                name: 'start',
                                handleClick: () => workout.id && navigate.toStartWorkout(history, workout.id),
                                translationKey: 'actionMenu.workout.start',
                                icon: <PlayArrow htmlColor={'green'} />
                            },
                            {
                                name: 'edit',
                                handleClick: () => navigate.toEditWorkout(history, workout.id),
                                translationKey: 'actionMenu.workout.edit',
                                icon: <Edit htmlColor={'steelblue'} />
                            },
                            {
                                name: 'delete',
                                handleClick: () => handleDelete(workout),
                                translationKey: 'actionMenu.workout.delete',
                                icon: <Delete htmlColor={'palevioletred'} />
                            }
                        ]}
                    />
                </Stack>
            ),
            content: (
                <Stack spacing={1}>
                    <ExercisesContent workout={workout} parentIdPrefix={exerciseItemPrefix} index={index} />
                    <Stack
                        justifyContent={'space-between'}
                        direction={'row'}
                        pt={{ xs: 2, sm: 0 }}
                        borderTop={{ xs: `2px solid ${theme.palette.grey[300]}`, sm: 'none' }}
                    >
                        {isSm && <FunctionsIcon />}
                        <ExercisesTimeRepsIcons
                            entities={workout.exercises}
                            id={workout.id ? workout.id : uuidv4()}
                            length={workout.exercises.length}
                            parentIdPrefix={exerciseItemPrefix}
                            index={index}
                            display={{ sm: 'none' }}
                        />
                    </Stack>
                </Stack>
            )
        };
    };

    return (
        <ResponsiveContainer xl={8}>
            <div data-testid={pageName}>
                <PageTitleActionButton
                    postTitleActionButton={
                        <AddButton
                            onClick={() => navigate.toEditWorkout(history, undefined)}
                            testId={`${idPrefix}add_button`}
                        />
                    }
                    titleTranslationKey="page.manageWorkouts.workouts"
                    idPrefix={idPrefix}
                />
                <Stack mt={3} mb={3}>
                    <Accordion
                        accordions={workouts.map((workout, index) =>
                            getAccordionProp(workout, exerciseItemPrefix, index)
                        )}
                    />
                    <DeleteConfirmationDialog
                        openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                        itemToDelete={workoutToDelete}
                        entityName="workouts"
                        closeDialog={() => setOpenDeleteConfirmationDialog(false)}
                    />
                </Stack>
            </div>
        </ResponsiveContainer>
    );
};

export default ManageWorkouts;
