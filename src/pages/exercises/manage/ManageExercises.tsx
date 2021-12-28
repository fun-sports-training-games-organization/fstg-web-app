import { Stack } from '@mui/material';
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
import ActionsMenu from '../../../components/molecules/actions-menu/ActionsMenu';
import Accordion from '../../../components/molecules/accordion/Accordion';
import { AccordionProp } from '../../../components/molecules/accordion/Accordion.types';
import { v4 as uuidv4 } from 'uuid';
import { getNumber } from '../../../util/number-util';
import EditImage from '../../../components/molecules/edit-image/EditImage';
import ExercisesTimeRepsIcons from '../../../components/organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import RecordResultsIcon from '../../../components/atoms/record-results-icon/RecordResultsIcon';
import { Delete, Edit } from '@mui/icons-material';

const ManageExercises: FC = (): JSX.Element => {
    const pageName = 'manage_exercises';
    const idPrefix = getPageIdPrefix(pageName);
    const exerciseItemPrefix = `${idPrefix}exercise_list__item_`;
    const { t } = useTranslation();
    const { entities } = useEntityManager<Exercise>('exercises');

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();
    const [exerciseId, setExerciseId] = useState<string>();
    const [expandedIndex, setExpandedIndex] = useState<number>(-1);

    const handleDelete = (exercise: Exercise) => {
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

    const getAccordionProp = (exercise: Exercise, exerciseItemPrefix: string, index: number): AccordionProp => {
        return {
            title: exercise.name,
            subtitle: (
                <>
                    {index !== expandedIndex ? (
                        <EditImage exercise={exercise} maxHeight={'3rem'} maxWidth="25%" />
                    ) : null}
                    <ExercisesTimeRepsIcons
                        entities={[exercise]}
                        id={exercise.id ? exercise.id : uuidv4()}
                        length={getNumber(exercise.amountValue)}
                        parentIdPrefix={exerciseItemPrefix}
                        index={index}
                        type={exercise.amountType}
                        display={{ xs: 'none', sm: 'flex' }}
                    />
                    <RecordResultsIcon exercise={exercise} display={{ xs: 'none', sm: 'flex' }} />
                </>
            ),
            actionsButton: (
                <ActionsMenu
                    parentIdPrefix={exerciseItemPrefix}
                    index={index}
                    options={[
                        {
                            name: 'edit',
                            handleClick: () => handleUpdate(exercise),
                            translationKey: 'actionMenu.exercise.edit',
                            icon: <Edit htmlColor={'steelblue'} />
                        },
                        {
                            name: 'delete',
                            handleClick: () => handleDelete(exercise),
                            translationKey: 'actionMenu.exercise.delete',
                            icon: <Delete htmlColor={'palevioletred'} />
                        }
                    ]}
                />
            ),
            content: (
                <>
                    <EditImage exercise={exercise} noImageIconSize="large" />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                        display={{ xs: 'flex', sm: 'none' }}
                    >
                        <ExercisesTimeRepsIcons
                            entities={[exercise]}
                            id={exercise.id ? exercise.id : uuidv4()}
                            length={getNumber(exercise.amountValue)}
                            parentIdPrefix={exerciseItemPrefix}
                            index={index}
                            type={exercise.amountType}
                            display={{ xs: 'flex', sm: 'none' }}
                        />
                        <RecordResultsIcon exercise={exercise} />
                    </Stack>
                </>
            )
        };
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
                <Accordion
                    accordions={exercises.map((exercise, index) =>
                        getAccordionProp(exercise, exerciseItemPrefix, index)
                    )}
                    setExpandedIndex={setExpandedIndex}
                />
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
