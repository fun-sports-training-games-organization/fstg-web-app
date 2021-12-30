import React, { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Workout } from '../../../model/Workout.model';
import { useTranslation } from 'react-i18next';
import { Exercise, ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import AutoCompleteSelect from '../auto-complete-select/AutoCompleteSelect';
import { v4 as uuidv4 } from 'uuid';
import useEntityManager from '../../../hooks/useEntityManager';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ResponsiveDialog from '../../organisms/responsive-dialog';
import CreateEditExerciseForm from '../../organisms/create-edit-exercise-form/CreateEditExerciseForm';
import ConfirmationDialog from '../../organisms/confirmation-dialog/ConfirmationDialog';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
    setWorkout: Dispatch<SetStateAction<Workout>>;
    save: (shouldNavigate?: boolean) => void;
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
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState<boolean>(false);
    const { t } = useTranslation();

    const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
        name: '',
        amountType: 'COUNT_BASED',
        recordResults: false,
        resultType: 'COUNT_BASED',
        useDefaultResult: false
    };

    const [title, setTitle] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [content, setContent] = useState<JSX.Element>();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseWorkoutSettings>(emptyExerciseWorkoutSettings);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState<Exercise | undefined>({ amountType: 'COUNT_BASED' });
    const [onConfirm, setOnConfirm] = useState<() => void>();
    useEffect(() => {
        setExercises([{ name: '', id: 'none' }, ...entities]);
    }, [entities]);

    const handleClose = () => {
        setTitle(undefined);
        setMessage(undefined);
        setContent(undefined);
        setOpenDialog(false);
        setOnConfirm(undefined);
    };

    const handleConfigureExerciseSettings = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setTitle(
            t('dialog.editWorkoutExerciseSettings.title', {
                exerciseName: selectedExercise.name,
                workoutName: workout.name
            })
        );
        setMessage(
            t('dialog.editWorkoutExerciseSettings.message', {
                exerciseName: selectedExercise.name,
                workoutName: workout.name
            })
        );
        setContent(
            <CreateEditExerciseForm exerciseId={selectedExercise.id} inWorkout={true} handleClose={handleClose} />
        );
        setOnConfirm(() => save(false));
        setOpenDialog(true);
    };

    const handleAddNewExercise = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setTitle(t('dialog.editExercise.title'));
        setMessage(t('dialog.editExercise.message'));
        setContent(
            <CreateEditExerciseForm
                handleClose={handleClose}
                name={newExercise?.name}
                onCreate={(exercise: Exercise) => {
                    setExercises([...exercises, exercise]);
                    setWorkout({
                        ...workout,
                        exercises: updateExercise(workout, selectedExercise, exercise)
                    });
                }}
            />
        );
        setOpenDialog(true);
    };
    return (
        <>
            {workout.exercises?.map((exercise, index) => {
                return (
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
                                onClick={() => handleAddNewExercise(exercise)}
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
                                    onClick={() => handleConfigureExerciseSettings(exercise)}
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
                                        setSelectedExercise(exercise);
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
