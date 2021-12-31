import React, { ChangeEvent, FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TimeField from '../../molecules/time-field/TimeField';
import CountField from '../../molecules/count-field/CountField';
import LabeledCheckbox from '../../molecules/labeled-checkbox/LabeledCheckbox';
import * as notification from '../../../util/notifications-util';
import { useSnackbar } from 'notistack';
import useEntityManager from '../../../hooks/useEntityManager';
import { Exercise } from '../../../model/Exercise.model';
import TextField from '../../atoms/text-field/TextField';
import useFileManager from '../../../hooks/useFileManager';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { getNumber } from '../../../util/number-util';
import EditImage from '../../molecules/edit-image/EditImage';
import { Workout } from '../../../model/Workout.model';
import { getNewEmptyWorkout } from '../../../util/workout-util';
import { getNewEmptyExerciseWorkoutSettings } from '../../../util/exercise-util';

type Props = {
    exerciseId?: string;
    handleClose?: () => void;
    inWorkout?: boolean;
    onCreate?: (exercise: Exercise) => void;
    name?: string;
    workoutId?: string;
};

const CreateEditExerciseForm = ({
    exerciseId,
    handleClose,
    inWorkout = false,
    onCreate,
    name,
    workoutId
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const fileManager = useFileManager<File>('exercises');
    const {
        createEntity: createExercise,
        updateEntity: updateExercise,
        findById: findExerciseById
    } = useEntityManager<Exercise>('exercises');
    const { updateEntity: updateWorkout, findById: findWorkoutById } = useEntityManager<Workout>('workouts');
    const [chosenFile, setChosenFile] = useState<File | null>(null);
    const [exercise, setExercise] = useState<Exercise>({});
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());
    const PREFIX = 'form.label.exercise';

    const getUpdatedWorkout = (updatedExercise: Exercise): Workout => {
        return {
            ...workout,
            exercises: workout.exercises.map((e) => (e.id === exerciseId ? updatedExercise : e))
        };
    };

    const setExerciseAndWorkout = (updatedExercise: Exercise) => {
        setExercise(updatedExercise);
        workoutId && setWorkout(getUpdatedWorkout(updatedExercise));
    };

    const loadExercise = useCallback(
        (exerciseId, workoutId) => {
            workoutId
                ? findWorkoutById(workoutId).then((workout) => {
                      setWorkout(workout);
                      const ex = workout.exercises.find((exercise) => exercise.id === exerciseId);
                      const exer = ex ? ex : getNewEmptyExerciseWorkoutSettings();
                      setExercise(exer);
                  })
                : findExerciseById(exerciseId).then((exercise) => setExercise(exercise));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [exerciseId, workoutId]
    );

    useEffect(() => {
        exerciseId
            ? loadExercise(exerciseId, workoutId)
            : setExercise({ ...exercise, name: name ? name : exercise.name, amountType: 'COUNT_BASED' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseId, loadExercise, name]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setExerciseAndWorkout({
            ...exercise,
            [event.target.name]: event.target.value
        });
    };

    const onCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean): void => {
        setExerciseAndWorkout({
            ...exercise,
            [event.target.name]: checked
        });
    };

    const handleCreateOrUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (chosenFile) {
            chosenFile && fileManager.uploadFile(chosenFile, user?.uid);
        }
        if (exercise?.id) {
            if (workoutId) {
                updateWorkout(workout)
                    .then(() => {
                        notification.updateSuccess(enqueueSnackbar, t, exercise.name);
                        setExercise({});
                        setWorkout(getNewEmptyWorkout());
                        handleClose && handleClose();
                    })
                    .catch(() => {
                        notification.updateError(enqueueSnackbar, t, exercise.name);
                    });
            } else {
                updateExercise(exercise)
                    .then(() => {
                        notification.updateSuccess(enqueueSnackbar, t, exercise.name);
                        setExercise({});
                        handleClose && handleClose();
                    })
                    .catch(() => {
                        notification.updateError(enqueueSnackbar, t, exercise.name);
                    });
            }
        } else {
            createExercise(exercise)
                .then((id) => {
                    notification.createSuccess(enqueueSnackbar, t, exercise.name);
                    onCreate && onCreate({ ...exercise, id });
                    setExercise({});
                    handleClose && handleClose();
                })
                .catch(() => {
                    notification.createError(enqueueSnackbar, t, exercise.name);
                });
        }
    };

    return (
        <form onSubmit={handleCreateOrUpdate}>
            <Stack spacing={2} mt={2}>
                {!inWorkout ? (
                    <>
                        <TextField
                            autoFocus
                            shrinkLabel={!!exercise.name}
                            id={`exercise.name`}
                            label={t(`${PREFIX}.name`)}
                            type={'text'}
                            value={exercise.name ? exercise.name : ''}
                            fullWidth
                            onChange={handleChange}
                            name={'name'}
                        />
                        <EditImage exercise={exercise} setExercise={setExercise} setChosenFile={setChosenFile} />
                    </>
                ) : null}

                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        {t(`${PREFIX}.${inWorkout ? 'amountType' : 'defaultAmountType'}`)}
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-label={inWorkout ? 'amountType' : 'defaultAmountType'}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="COUNT_BASED"
                            control={
                                <Radio
                                    checked={exercise.amountType === 'COUNT_BASED'}
                                    name={'amountType'}
                                    onChange={handleChange}
                                />
                            }
                            label={t(`${PREFIX}.countBased`)}
                        />
                        <FormControlLabel
                            value="TIME_BASED"
                            control={
                                <Radio
                                    checked={exercise.amountType === 'TIME_BASED'}
                                    name={'amountType'}
                                    onChange={handleChange}
                                />
                            }
                            label={t(`${PREFIX}.timeBased`)}
                        />
                    </RadioGroup>
                </FormControl>
                {exercise.amountType === 'TIME_BASED' ? (
                    <TimeField
                        label={t(`${PREFIX}.${inWorkout ? 'time' : 'defaultTime'}`)}
                        value={getNumber(exercise.amountValue)}
                        setValue={(seconds: number) => {
                            setExerciseAndWorkout({ ...exercise, amountValue: seconds });
                        }}
                    />
                ) : (
                    <CountField
                        min={0}
                        max={100}
                        value={getNumber(exercise.amountValue)}
                        setValue={(value: number) => {
                            setExerciseAndWorkout({ ...exercise, amountValue: value });
                        }}
                    />
                )}
                <LabeledCheckbox
                    checked={exercise.recordResults ? exercise.recordResults : false}
                    onChange={onCheckboxChange}
                    name={'recordResults'}
                    label={t(`${PREFIX}.${inWorkout ? 'recordResults' : 'recordResultsByDefault'}`)}
                />
                {exercise.recordResults && (
                    <>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">
                                {t(`${PREFIX}.${inWorkout ? 'resultType' : 'defaultResultType'}`)}
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-label={inWorkout ? 'resultType' : 'defaultResultType'}
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="COUNT_BASED"
                                    control={
                                        <Radio
                                            checked={!exercise.resultType || exercise.resultType === 'COUNT_BASED'}
                                            name={'resultType'}
                                            onChange={handleChange}
                                        />
                                    }
                                    label={t(`${PREFIX}.countBased`)}
                                />
                                <FormControlLabel
                                    onChange={(e: SyntheticEvent) => console.log(e)}
                                    value="TIME_BASED"
                                    control={
                                        <Radio
                                            checked={exercise.resultType === 'TIME_BASED'}
                                            name={'resultType'}
                                            onChange={handleChange}
                                        />
                                    }
                                    label={t(`${PREFIX}.timeBased`)}
                                />
                            </RadioGroup>
                        </FormControl>
                        <LabeledCheckbox
                            checked={exercise.useDefaultResult ? exercise.useDefaultResult : false}
                            name={'useDefaultResult'}
                            onChange={onCheckboxChange}
                            label={t(`${PREFIX}.useDefaultResult`)}
                        />
                        {exercise.useDefaultResult &&
                            (exercise.resultType === 'TIME_BASED' ? (
                                <TimeField
                                    label={t(`${PREFIX}.defaultResult`)}
                                    value={exercise.resultValue ? exercise.resultValue : 0}
                                    setValue={(seconds: number) => {
                                        setExerciseAndWorkout({ ...exercise, resultValue: seconds });
                                    }}
                                />
                            ) : (
                                <CountField
                                    min={0}
                                    max={100}
                                    value={exercise.resultValue ? exercise.resultValue : 0}
                                    setValue={(value: number) => {
                                        setExerciseAndWorkout({ ...exercise, resultValue: value });
                                    }}
                                />
                            ))}
                    </>
                )}
                <Button type={'submit'} fullWidth color={'primary'} variant={'contained'}>
                    {t(exerciseId ? 'global.save' : 'global.create')}
                </Button>
                <Button fullWidth color={'secondary'} variant={'contained'} onClick={handleClose}>
                    {t('global.cancel')}
                </Button>
            </Stack>
        </form>
    );
};
export default CreateEditExerciseForm;
