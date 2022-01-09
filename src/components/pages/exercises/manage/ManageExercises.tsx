import { Stack } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { Exercise } from '../../../../model/Exercise.model';
import DeleteConfirmationDialog from '../../../organisms/dialogs/delete-confirmation-dialog/DeleteConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { getPageIdPrefix } from '../../../../util/id-util';
import useEntityManager from '../../../../hooks/useEntityManager';
import AddButton from '../../../atoms/add-button/AddButton';
import ResponsiveDialog from '../../../organisms/dialogs/responsive-dialog';
import CreateEditExerciseForm from '../../../organisms/forms/create-edit-exercise-form/CreateEditExerciseForm';
import ActionsMenu from '../../../molecules/menus/actions-menu/ActionsMenu';
import Accordion from '../../../templates/containers/accordion/Accordion';
import { AccordionProp } from '../../../templates/containers/accordion/Accordion.types';
import { v4 as uuidv4 } from 'uuid';
import { getNumber } from '../../../../util/number-util';
import EditImage from '../../../molecules/edit-image/EditImage';
import ExercisesTimeRepsIcons from '../../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import RecordResultsIcon from '../../../atoms/record-results-icon/RecordResultsIcon';
import { Delete, Edit } from '@mui/icons-material';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';
import PageTitleActionButton from '../../../molecules/page-title-action/PageTitleAction';
import ExerciseIcon from '../../../../assets/exercise.png';
import Loader from '../../../atoms/loader/Loader';
import BlankPage from '../../../templates/blank-slate/template/blank-page/BlankPage';

const ManageExercises: FC = (): JSX.Element => {
    const containerRef = useRef(null);

    const pageName = 'manage_exercises';
    const idPrefix = getPageIdPrefix(pageName);
    const exerciseItemPrefix = `${idPrefix}exercise_list__item_`;
    const { t } = useTranslation();
    const { loading, entities } = useEntityManager<Exercise>('exercises');

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise>();
    const [exerciseId, setExerciseId] = useState<string>();
    const [expandedIndex, setExpandedIndex] = useState<number>(-1);
    const getCreateExerciseTitle = () => t('dialog.createExercise.title');
    const getCreateExerciseMessage = () => t('dialog.createExercise.message');
    const getEditExerciseTitle = () => t('dialog.editExercise.title');
    const getEditExerciseMessage = () => t('dialog.editExercise.message');
    const [responsiveDialogTitle, setResponsiveDialogTitle] = useState<string>(getCreateExerciseTitle());
    const [responsiveDialogMessage, setResponsiveDialogMessage] = useState<string>(getCreateExerciseMessage());

    const deleteClick = (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        setOpenDeleteConfirmationDialog(true);
    };

    useEffect(() => {
        setExercises(entities);
    }, [entities]);

    const editClick = (exercise: Exercise) => {
        setResponsiveDialogTitle(getEditExerciseTitle());
        setResponsiveDialogMessage(getEditExerciseMessage());
        setExerciseId(exercise.id);
        setOpenDialog(true);
    };

    const getAccordionProp = (exercise: Exercise, exerciseItemPrefix: string, index: number): AccordionProp => {
        return {
            title: t(exercise.name ? exercise.name : ''),
            subtitle: (
                <>
                    {index !== expandedIndex ? (
                        <Stack
                            gridColumn={{ xs: '66 / 94', sm: '41 / 63' }}
                            display="flex"
                            flexDirection="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <EditImage exercise={exercise} maxHeight={'3rem'} maxWidth="75%" />
                        </Stack>
                    ) : null}
                    <Stack
                        gridColumn="64 / 79"
                        display={{ xs: 'none', sm: 'flex' }}
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <ExercisesTimeRepsIcons
                            entities={[exercise]}
                            id={exercise.id ? exercise.id : uuidv4()}
                            length={getNumber(exercise.amountValue)}
                            parentIdPrefix={exerciseItemPrefix}
                            index={index}
                            type={exercise.amountType}
                        />
                    </Stack>
                    <Stack
                        gridColumn="80 / 94"
                        display={{ xs: 'none', sm: 'flex' }}
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <RecordResultsIcon exercise={exercise} />
                    </Stack>
                </>
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
                                name: 'edit',
                                handleClick: () => editClick(exercise),
                                translationKey: 'actionMenu.exercise.edit',
                                icon: <Edit htmlColor={'steelblue'} />
                            },
                            {
                                name: 'delete',
                                handleClick: () => deleteClick(exercise),
                                translationKey: 'actionMenu.exercise.delete',
                                icon: <Delete htmlColor={'palevioletred'} />
                            }
                        ]}
                    />
                </Stack>
            ),
            content: (
                <>
                    <Stack flexDirection="row" justifyContent="center" alignItems="center" mb={2}>
                        <EditImage exercise={exercise} noImageIconSize="large" />
                    </Stack>
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

    const handleAdd = () => {
        setResponsiveDialogTitle(getCreateExerciseTitle());
        setResponsiveDialogMessage(getCreateExerciseMessage());
        setOpenDialog(true);
        setExerciseId(undefined);
    };

    const handleCloseAndCreate = () => {
        setExerciseId(undefined);
        setOpenDialog(false);
    };

    const haveExercises = exercises.length > 0;
    if (loading) {
        return <Loader />;
    }
    return (
        <ResponsiveContainer xl={8} ref={containerRef}>
            {haveExercises ? (
                <>
                    <PageTitleActionButton
                        postTitleActionButton={<AddButton onClick={handleAdd} testId={`${idPrefix}add_button`} />}
                        titleTranslationKey="page.manageExercises.exercises"
                        idPrefix={idPrefix}
                    />
                    <Stack mt={3} mb={3}>
                        <Accordion
                            accordions={exercises.map((exercise, index) =>
                                getAccordionProp(exercise, exerciseItemPrefix, index)
                            )}
                            setExpandedIndex={setExpandedIndex}
                        />
                    </Stack>
                </>
            ) : (
                <BlankPage
                    slideProps={{ container: containerRef.current }}
                    imageAttributes={{ src: ExerciseIcon, alt: 'Exercise Icon', height: '250px', width: '250px' }}
                    titleTranslateKey={'page.manageExercises.exercises'}
                    message={t('blankSlate.exercises.message')}
                    buttonText={t('blankSlate.exercises.button')}
                    buttonAction={handleAdd}
                />
            )}

            <ResponsiveDialog
                title={responsiveDialogTitle}
                message={responsiveDialogMessage}
                open={openDialog}
                content={
                    <CreateEditExerciseForm
                        exerciseId={exerciseId}
                        handleClose={handleCloseAndCreate}
                        onCreate={handleCloseAndCreate}
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
        </ResponsiveContainer>
    );
};
export default ManageExercises;
