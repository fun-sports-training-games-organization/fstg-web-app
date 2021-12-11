import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../../../model/workout';
import { ExerciseWorkoutSettings } from '../../../model/exercise-workout-settings';
import EditWorkoutExerciseSettingsDialog from '../../organisms/edit-workout-exercise-settings-dialog/EditWorkoutExerciseSettingsDialog';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { Id } from '../../../model/basics';
import { useSnackbar } from 'notistack';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
};

const ManageWorkoutExercises = ({ parentIdPrefix, workout, setWorkout }: Props): JSX.Element => {
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
    const { enqueueSnackbar } = useSnackbar();
    const firestore = useFirestore();
    const firebase = useFirebase();
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;

    const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
        name: '',
        amountType: 'number',
        recordResults: false,
        resultType: 'number',
        useDefaultResult: false
    };
    const getNewEmptyExerciseWorkoutSettings = (): ExerciseWorkoutSettings => {
        return { ...emptyExerciseWorkoutSettings, id: uuidv4() };
    };

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [exerciseWorkoutSettings, setExerciseWorkoutSettings] = useState<ExerciseWorkoutSettings>();
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
                                <IconButton>
                                    <SettingsIcon
                                        onClick={() => {
                                            setSelectedExercise(exercise);
                                            setOpenDialog(true);
                                        }}
                                    />
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
                exerciseWorkoutSettings={exerciseWorkoutSettings}
                setWorkoutExerciseSettings={setExerciseWorkoutSettings}
            />
        </>
    );
};

export default ManageWorkoutExercises;
