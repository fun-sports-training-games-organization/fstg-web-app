import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../../../model/Workout.model';
import { useTranslation } from 'react-i18next';
import { Exercise, ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import AutoCompleteSelect from '../inputs/auto-complete-select/AutoCompleteSelect';
import { v4 as uuidv4 } from 'uuid';
import useEntityManager from '../../../hooks/useEntityManager';
import AddIcon from '@mui/icons-material/Add';
import ResponsiveDialog from '../../organisms/dialogs/responsive-dialog';
import CreateEditExerciseForm from '../../organisms/forms/create-edit-exercise-form/CreateEditExerciseForm';
import { getNewEmptyExercise } from '../../../util/exercise-util';
import ConfirmationDialog from '../../organisms/dialogs/confirmation-dialog/ConfirmationDialog';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
};

const ManageWorkoutExercises = ({ parentIdPrefix, workout, setWorkout }: Props): JSX.Element => {
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
                const newExercise: ExerciseWorkoutSettings = { ...selectedExercise, id: exerciseToUpdate.id };
                newExercise.exerciseId = selectedExercise.id;
                newExercise.id = exerciseToUpdate.id ? exerciseToUpdate.id : uuidv4();

                return newExercise;
            }

            return exercise;
        });
    };
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const { t } = useTranslation();

    const noSelectedExercise: Exercise = { ...getNewEmptyExercise(), id: 'none', hasBeenCreated: false };
    const [title, setTitle] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [content, setContent] = useState<JSX.Element>();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseWorkoutSettings>(noSelectedExercise);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise | undefined>(getNewEmptyExercise());

    const [onConfirm, setOnConfirm] = useState<() => void>();

    useEffect(() => {
        setExercises([noSelectedExercise, ...entities]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entities]);

    const handleClose = () => {
        setTitle(undefined);
        setMessage(undefined);
        setContent(undefined);
        setOpenDialog(false);
        setOnConfirm(undefined);
    };

    const handleConfigureExerciseSettings = (exerciseId: string, index: number, lastSavedWorkout: Workout) => {
        setTitle(
            t('dialog.editWorkoutExerciseSettings.title', {
                exerciseName: workout.exercises[index].name,
                workoutName: workout.name
            })
        );
        setMessage(
            t('dialog.editWorkoutExerciseSettings.message', {
                exerciseName: workout.exercises[index].name,
                workoutName: workout.name
            })
        );
        setContent(
            <CreateEditExerciseForm
                exerciseId={exerciseId}
                workout={workout}
                setWorkout={setWorkout}
                inWorkout={true}
                handleClose={() => {
                    handleClose();
                    setWorkout(lastSavedWorkout);
                }}
                index={index}
            />
        );
        setOpenDialog(true);
    };

    const handleAddNewExercise = (index: number, lastSavedWorkout: Workout) => {
        setTitle(t('dialog.editExercise.title'));
        setMessage(t('dialog.editExercise.message'));

        setContent(
            <CreateEditExerciseForm
                workout={workout}
                setWorkout={setWorkout}
                handleClose={() => {
                    handleClose();
                    setWorkout(lastSavedWorkout);
                }}
                name={newExercise?.name}
                index={index}
                onCreate={() => {
                    handleClose();
                }}
            />
        );
        setOpenDialog(true);
    };

    const getValue = (ews: ExerciseWorkoutSettings) => {
        const ewsFound = exercises.find((e) => e.id === ews.exerciseId);
        return ewsFound ? ewsFound : noSelectedExercise;
    };

    return (
        <>
            {workout.exercises?.map((exerciseWorkoutSettings, index) => {
                return (
                    <AutoCompleteSelect
                        key={`${exerciseItemPrefix}${index}__auto-complete-select`}
                        id={`${exerciseItemPrefix}${index}`}
                        // TODO : localize this!
                        label={`Exercise ${index + 1}`}
                        value={getValue(exerciseWorkoutSettings)}
                        options={exercises}
                        getOptionLabel={(option: Exercise) => (option?.name ? option.name : '')}
                        onChange={(_event, value) => {
                            if (value) {
                                setWorkout({
                                    ...workout,
                                    exercises: updateExercise(workout, exerciseWorkoutSettings, value)
                                });
                            }
                        }}
                        onTextChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            setNewExercise({ ...newExercise, name: event.target.value } as Exercise)
                        }
                        noOptionsText={
                            <Button
                                onClick={() => handleAddNewExercise(index, workout)}
                                variant="text"
                                startIcon={<AddIcon />}
                            >
                                {`${t('global.add')} ${newExercise?.name ? newExercise.name : ''}`}
                            </Button>
                        }
                        startAdornment={
                            <InputAdornment position={'start'}>
                                <IconButton
                                    key={`${exerciseItemPrefix}${index}__configure_icon-button`}
                                    onClick={() => {
                                        if (
                                            workout.exercises[index].exerciseId &&
                                            workout.exercises[index].exerciseId !== 'none'
                                        ) {
                                            handleConfigureExerciseSettings(
                                                exerciseWorkoutSettings.exerciseId as string,
                                                index,
                                                workout
                                            );
                                        }
                                    }}
                                >
                                    <SettingsIcon key={`${exerciseItemPrefix}${index}__configure-icon`} />
                                </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position={'end'}>
                                <IconButton
                                    color={'error'}
                                    key={`${exerciseItemPrefix}${index}__delete_icon-button`}
                                    onClick={() => {
                                        setSelectedExercise(exerciseWorkoutSettings);
                                        setOpenDeleteConfirmationDialog(true);
                                    }}
                                >
                                    <RemoveCircleOutlineIcon key={`${exerciseItemPrefix}${index}__remove-icon`} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                );
            })}
            <ResponsiveDialog
                title={title}
                message={message}
                open={openDialog}
                content={content}
                onClose={handleClose}
                onCancel={handleClose}
                onConfirm={() => {
                    onConfirm && onConfirm();
                }}
            />
            <ConfirmationDialog
                open={openDeleteConfirmationDialog}
                title={t('dialog.deleteConfirmation.title')}
                message={t('dialog.deleteConfirmation.message', { name: selectedExercise?.name })}
                onClose={async (event: SyntheticEvent<HTMLButtonElement>) => {
                    if (event.currentTarget.value === 'confirm') {
                        setWorkout({
                            ...workout,
                            exercises: workout.exercises.filter((exercise) => exercise.id !== selectedExercise.id)
                        });
                    }
                    setOpenDeleteConfirmationDialog(false);
                }}
            />
        </>
    );
};

export default ManageWorkoutExercises;
