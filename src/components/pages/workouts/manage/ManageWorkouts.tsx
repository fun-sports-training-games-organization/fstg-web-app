import { FC, useEffect, useRef, useState } from 'react';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import DeleteConfirmationDialog from '../../../organisms/dialogs/delete-confirmation-dialog/DeleteConfirmationDialog';
import PageTitleActionButton from '../../../molecules/page-title-action/PageTitleAction';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import { toEditWorkout, toStartWorkout } from '../../../../util/navigation-util';
import Accordion from '../../../templates/containers/accordion/Accordion';
import { AccordionProp } from '../../../templates/containers/accordion/Accordion.types';
import ExercisesTimeRepsIcons from '../../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import ActionsMenu from '../../../molecules/menus/actions-menu/ActionsMenu';
import ExercisesContent from '../../../organisms/exercises-content/ExercisesContent';
import useEntityManager from '../../../../hooks/useEntityManager';
import { v4 as uuidv4 } from 'uuid';
import AddButton from '../../../atoms/add-button/AddButton';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import BlankPage from '../../../templates/blank-slate/template/blank-page/BlankPage';
import WorkoutIcon from '../../../../assets/workout.png';
import { useTranslation } from 'react-i18next';
import Loader from '../../../atoms/loader/Loader';
import { useTheme } from '@mui/material';

const ManageWorkouts: FC = () => {
    const theme = useTheme();
    const containerRef = useRef(null);
    const { t } = useTranslation();
    const pageName = 'manage_workouts';
    const idPrefix = getPageIdPrefix(pageName);
    const exerciseItemPrefix = `${idPrefix}exercise_list__item_`;
    const { entities, loading } = useEntityManager<Workout>('workouts');

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
                                handleClick: () => workout.id && toStartWorkout(workout.id),
                                translationKey: 'actionMenu.workout.start',
                                icon: <PlayArrow htmlColor={'green'} />
                            },
                            {
                                name: 'edit',
                                handleClick: () => toEditWorkout(workout.id),
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

    const haveWorkouts = workouts.length > 0;
    return (
        <ResponsiveContainer xl={8}>
            {loading ? (
                <Loader />
            ) : haveWorkouts ? (
                <>
                    <PageTitleActionButton
                        postTitleActionButton={<AddButton onClick={toEditWorkout} testId={`${idPrefix}add_button`} />}
                        titleTranslationKey="page.manageWorkouts.workouts"
                        idPrefix={idPrefix}
                    />
                    <Stack mt={3} mb={3}>
                        <Accordion
                            accordions={workouts.map((workout, index) =>
                                getAccordionProp(workout, exerciseItemPrefix, index)
                            )}
                        />
                    </Stack>
                </>
            ) : (
                <BlankPage
                    slideProps={{ container: containerRef.current }}
                    titleTranslateKey={'page.manageWorkouts.workouts'}
                    imageAttributes={{ src: WorkoutIcon, alt: 'Workout Icon', height: '250px', width: '250px' }}
                    message={t('blankSlate.workouts.message')}
                    buttonText={t('blankSlate.workouts.button')}
                    buttonAction={() => toEditWorkout('')}
                />
            )}
            {openDeleteConfirmationDialog && (
                <DeleteConfirmationDialog
                    openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                    itemToDelete={workoutToDelete}
                    entityName="workouts"
                    closeDialog={() => setOpenDeleteConfirmationDialog(false)}
                />
            )}
        </ResponsiveContainer>
    );
};

export default ManageWorkouts;
