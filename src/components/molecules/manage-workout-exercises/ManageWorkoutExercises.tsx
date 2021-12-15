import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../../../model/workout';
import { ExerciseWorkoutSettings } from '../../../model/exercise-workout-settings';
import EditWorkoutExerciseSettingsDialog from '../../organisms/edit-workout-exercise-settings-dialog/EditWorkoutExerciseSettingsDialog';
import { useTranslation } from 'react-i18next';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
    save: () => void;
};

const ManageWorkoutExercises = ({ parentIdPrefix, workout, setWorkout, save }: Props): JSX.Element => {
    const idPrefix = `${parentIdPrefix}manage_exercise_list__`;
    const exerciseItemPrefix = `${idPrefix}item_`;
    const updateExerciseName = (
        workout: Workout,
        exerciseToUpdate: ExerciseWorkoutSettings,
        name: string
    ): ExerciseWorkoutSettings[] => {
        return workout.exercises.map((exercise) => {
            if (exercise.id === exerciseToUpdate.id) {
                return { ...exercise, name };
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

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseWorkoutSettings>(emptyExerciseWorkoutSettings);

    return (
        <>
            {workout.exercises?.map((exercise, index) => {
                return (
                    <TextField
                        fullWidth
                        margin="dense"
                        key={exercise.id}
                        id={`${exerciseItemPrefix}${index}`}
                        label={`Exercise ${index + 1}`}
                        type="text"
                        value={exercise.name}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => {
                                        setSelectedExercise(exercise);
                                        setOpenDialog(true);
                                    }}
                                >
                                    <SettingsIcon />
                                </IconButton>
                            )
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setWorkout({
                                ...workout,
                                exercises: updateExerciseName(workout, exercise, event.target.value)
                            })
                        }
                    />
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
                open={openDialog}
                setOpen={setOpenDialog}
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
        </>
    );
};

export default ManageWorkoutExercises;
