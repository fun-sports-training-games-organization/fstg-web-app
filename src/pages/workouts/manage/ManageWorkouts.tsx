import { FC, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationDialog from '../../../components/molecules/delete-confirmation-dialog/DeleteConfirmationDialog';
import PageTitleActionButton from '../../../components/molecules/page-title-action/PageTitleAction';
import { Workout } from '../../../model/Workout.model';
import { getPageIdPrefix } from '../../../util/id-util';
import * as navigate from '../../../util/navigation-util';
import Accordion from '../../../components/molecules/accordion/Accordion';
import { AccordionProp } from '../../../components/molecules/accordion/Accordion.types';
import IconsSubtitle from '../../../components/molecules/icons-subtitle/IconsSubtitle';
import ActionsMenu from '../../../components/molecules/actions-menu/ActionsMenu';
import ExercisesContent from '../../../components/organisms/exercises-content/ExercisesContent';
import useEntityManager from '../../../hooks/useEntityManager';
import { v4 as uuidv4 } from 'uuid';
import AddButton from '../../../components/atoms/add-button/AddButton';

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

    const getAccordionProp = (workout: Workout, exerciseItemPrefix: string, index: number): AccordionProp => {
        return {
            title: workout.name,
            subtitle: (
                <IconsSubtitle
                    entities={workout.exercises}
                    id={workout.id ? workout.id : uuidv4()}
                    length={workout.exercises.length}
                    parentIdPrefix={exerciseItemPrefix}
                    index={index}
                    display={{ xs: 'none', sm: 'flex' }}
                ></IconsSubtitle>
            ),
            actionsButton: (
                <ActionsMenu
                    entity={workout}
                    handleDelete={handleDelete}
                    parentIdPrefix={exerciseItemPrefix}
                    index={index}
                ></ActionsMenu>
            ),
            content: (
                <ExercisesContent
                    workout={workout}
                    parentIdPrefix={exerciseItemPrefix}
                    index={index}
                    typographySx={{ lineHeight: 2.2 }}
                    typographyMarginLeft={{ xs: 0, sm: '4rem' }}
                ></ExercisesContent>
            )
        };
    };

    return (
        <div data-testid={pageName}>
            <PageTitleActionButton
                actionButton={
                    <AddButton
                        onClick={() => navigate.toEditWorkout(history, undefined)}
                        testId={`${idPrefix}add_button`}
                    />
                }
                titleTranslationKey="page.manageWorkouts.workouts"
                idPrefix={idPrefix}
            ></PageTitleActionButton>
            <Stack ml={2} mr={2} mt={3} mb={3}>
                <Accordion
                    accordions={workouts.map((workout, index) => getAccordionProp(workout, exerciseItemPrefix, index))}
                ></Accordion>
                <DeleteConfirmationDialog
                    openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                    itemToDelete={workoutToDelete}
                    entityName="workouts"
                    closeDialog={() => setOpenDeleteConfirmationDialog(false)}
                />
            </Stack>
        </div>
    );
};

export default ManageWorkouts;
