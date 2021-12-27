import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../../../model/Workout.model';
import EditWorkoutExerciseSettingsDialog from '../../organisms/edit-workout-exercise-settings-dialog/EditWorkoutExerciseSettingsDialog';
import { useTranslation } from 'react-i18next';
import { Exercise, ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import AutoCompleteSelect from '../auto-complete-select/AutoCompleteSelect';
import { v4 as uuidv4 } from 'uuid';
import useEntityManager from '../../../hooks/useEntityManager';
import AddIcon from '@mui/icons-material/Add';
import ResponsiveDialog from '../../organisms/responsive-dialog';
import CreateEditExerciseForm from '../../organisms/create-edit-exercise-form/CreateEditExerciseForm';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
    save: () => void;
};

const ManageWorkoutExercises = ({ parentIdPrefix, workout, setWorkout, save }: Props): JSX.Element => {
    const idPrefix = `${parentIdPrefix}manage_exercise_list__`;
    const exerciseItemPrefix = `${idPrefix}item_`;
    const { entities } = useEntityManager<Exercise>('exercises');
    const updateExercise = (
        workout: Workout,
        exerciseToUpdate: ExerciseWorkoutSettings,
        selectedExercise: Exercise
    ): ExerciseWorkoutSettings[] => {
        return workout.exercises.map((exercise) => {
            if (exercise.id === exerciseToUpdate.id) {
                const newExercise = { ...selectedExercise, exerciseId: exerciseToUpdate.id };
                newExercise.exerciseId = selectedExercise.id;
                newExercise.id = exerciseToUpdate.id ? exerciseToUpdate.id : uuidv4();

                return newExercise;
            }

            return exercise;
        });
    };
    const { t } = useTranslation();

    const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
        name: '',
        amountType: 'COUNT_BASED',
        recordResults: false,
        resultType: 'COUNT_BASED',
        useDefaultResult: false
    };

    const [openExerciseSettingsDialog, setOpenExerciseSettingsDialog] = useState<boolean>(false);
    const [openEditExerciseDialog, setOpenEditExerciseDialog] = useState<boolean>(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseWorkoutSettings>(emptyExerciseWorkoutSettings);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise | undefined>({ amountType: 'COUNT_BASED' });

    useEffect(() => {
        setExercises([{ name: '', id: 'none' }, ...entities]);
    }, [entities]);

    return (
        <>
            {workout.exercises?.map((exercise, index) => {
                return (
                    <Grid
                        key={`${exerciseItemPrefix}${index}__grid-container`}
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={10} sm={11}>
                            <AutoCompleteSelect
                                key={`${exerciseItemPrefix}${index}__auto-complete-select`}
                                id={`${exerciseItemPrefix}${index}`}
                                label={`Exercise ${index + 1}`}
                                value={exercise}
                                options={exercises}
                                getOptionLabel={(option: Exercise) => (option?.name ? option.name : '')}
                                isOptionEqualToValue={(option, value) =>
                                    (option as Exercise)?.id === (value as ExerciseWorkoutSettings)?.exerciseId
                                }
                                onChange={(_event, value) => {
                                    if (value) {
                                        setWorkout({
                                            ...workout,
                                            exercises: updateExercise(workout, exercise, value)
                                        });
                                    }
                                }}
                                onTextChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    setNewExercise({ ...newExercise, name: event.target.value })
                                }
                                noOptionsText={
                                    <Button
                                        onClick={() => {
                                            setSelectedExercise(exercise);
                                            setOpenEditExerciseDialog(true);
                                        }}
                                        variant="text"
                                        startIcon={<AddIcon />}
                                    >
                                        {`${t('global.add')} ${newExercise?.name ? newExercise.name : ''}`}
                                    </Button>
                                }
                            />
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <IconButton
                                key={`${exerciseItemPrefix}${index}__icon-button`}
                                onClick={() => {
                                    setSelectedExercise(exercise);
                                    setOpenExerciseSettingsDialog(true);
                                }}
                            >
                                <SettingsIcon key={`${exerciseItemPrefix}${index}__settings-icon`} />
                            </IconButton>
                        </Grid>
                    </Grid>
                );
            })}
            <EditWorkoutExerciseSettingsDialog
                title={t('dialog.editWorkoutExerciseSettings.title', {
                    exerciseName: selectedExercise.name,
                    workoutName: workout.name
                })}
                message={t('dialog.editWorkoutExerciseSettings.message', {
                    exerciseName: selectedExercise.name,
                    workoutName: workout.name
                })}
                open={openExerciseSettingsDialog}
                setOpen={setOpenExerciseSettingsDialog}
                exercise={selectedExercise}
                setExercise={(exercise: ExerciseWorkoutSettings) => {
                    setSelectedExercise(exercise);
                    setWorkout({
                        ...workout,
                        exercises: [...workout.exercises.map((e) => (e.id === selectedExercise.id ? exercise : e))]
                    });
                }}
                save={save}
            />
            <ResponsiveDialog
                title={t('dialog.editExercise.title')}
                message={t('dialog.editExercise.message')}
                open={openEditExerciseDialog}
                content={
                    <CreateEditExerciseForm
                        handleClose={() => {
                            setOpenEditExerciseDialog(false);
                        }}
                        name={newExercise?.name}
                        onCreate={(exercise: Exercise) => {
                            setExercises([...exercises, exercise]);
                            setWorkout({
                                ...workout,
                                exercises: updateExercise(workout, selectedExercise, exercise)
                            });
                        }}
                    />
                }
            />
        </>
    );
};

export default ManageWorkoutExercises;
