import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LabeledCheckbox from '../../../molecules/inputs/labeled-checkbox/LabeledCheckbox';
import * as notification from '../../../../util/notifications-util';
import { useSnackbar } from 'notistack';
import useEntityManager from '../../../../hooks/useEntityManager';
import { Exercise } from '../../../../model/Exercise.model';
import TextField from '../../../molecules/inputs/text-field/TextField';
import useFileManager from '../../../../hooks/useFileManager';
import { useAuth } from '../../../../contexts/AuthContextProvider';
import { getNumber } from '../../../../util/number-util';
import EditImage from '../../../molecules/edit-image/EditImage';
import { Workout } from '../../../../model/Workout.model';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import { getNewEmptyExercise } from '../../../../util/exercise-util';
import { getPageIdPrefix } from '../../../../util/id-util';
import SubmitButton from '../../../atoms/submit-button/SubmitButton';
import TimeOrCountField from '../../../atoms/time-or-count-field/TimeOrCountField';
import { ONE_MEGABYTE } from '../../../../util/validation';
import { fileSizeTooLarge } from '../../../../util/notifications-util';

type Props = {
    exerciseId?: string;
    handleClose?: () => void;
    inWorkout?: boolean;
    onCreate?: (exercise: Exercise) => void;
    name?: string;
    index?: number;
    workout?: Workout;
    setWorkout?: Dispatch<SetStateAction<Workout>>;
};

const CreateEditExerciseForm = ({
    exerciseId,
    handleClose,
    inWorkout = false,
    onCreate,
    name,
    workout,
    setWorkout,
    index
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const pageName = 'create-edit-exercise-form';
    const idPrefix = getPageIdPrefix(pageName);
    const submitTestId = `${idPrefix}submit_button`;

    const fileManager = useFileManager<File>('exercises');
    const {
        createEntity: createExercise,
        updateEntity: updateExercise,
        findById: findExerciseById
    } = useEntityManager<Exercise>('exercises');
    const [chosenFile, setChosenFile] = useState<File | null>(null);
    const [exercise, setExercise] = useState<Exercise>(getNewEmptyExercise());
    const PREFIX = 'form.label.exercise';

    const getUpdatedWorkout = (updatedExercise: Exercise): Workout => {
        return workout
            ? ({
                  ...workout,
                  exercises: workout.exercises
                      ? workout.exercises.map((e, i) =>
                            i === index ? { ...updatedExercise, id: e.id, exerciseId: e.exerciseId } : e
                        )
                      : []
              } as Workout)
            : getNewEmptyWorkout();
    };

    const setExerciseAndWorkout = (updatedExercise: Exercise) => {
        setExercise(updatedExercise);
        workout?.id && setWorkout && setWorkout(getUpdatedWorkout(updatedExercise));
    };

    const loadExerciseAndWorkout = useCallback(
        (eId: string | undefined, wo: Workout | undefined) => {
            if (wo) {
                const woExercise = wo.exercises[index ? index : 0];
                setExercise({ ...woExercise, name: name ? name : woExercise.name });
            } else {
                if (eId) {
                    findExerciseById(eId).then((exer) => {
                        setExercise(exer);
                    });
                } else {
                    setExercise({
                        ...getNewEmptyExercise(),
                        name: name ? name : exercise.name
                    });
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [exerciseId, name]
    );

    useEffect(() => {
        loadExerciseAndWorkout(exerciseId, workout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseId, name]);

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
        let error;
        if (chosenFile) {
            if (chosenFile.size > ONE_MEGABYTE) {
                error = true;
                fileSizeTooLarge(enqueueSnackbar, t, { limit: '1MB' });
            } else {
                chosenFile && fileManager.uploadFile(chosenFile, user?.uid);
            }
        }
        if (!error) {
            if (!workout && exerciseId) {
                updateExercise(exercise)
                    .then(() => {
                        notification.updateSuccess(enqueueSnackbar, t, exercise.name);
                        setExercise(getNewEmptyExercise());
                        handleClose && handleClose();
                    })
                    .catch(() => {
                        notification.updateError(enqueueSnackbar, t, exercise.name);
                    });
            } else if (!exerciseId) {
                createExercise(exercise)
                    .then((id) => {
                        setExercise(getNewEmptyExercise());
                        if (workout && setWorkout) {
                            setWorkout({
                                ...workout,
                                exercises: workout.exercises.map((e, i) =>
                                    i === index ? { ...exercise, id: e.id, exerciseId: id } : e
                                )
                            });
                        }
                        onCreate && onCreate({ ...exercise, id });
                        notification.createSuccess(enqueueSnackbar, t, exercise.name);
                    })
                    .catch(() => {
                        notification.createError(enqueueSnackbar, t, exercise.name);
                    });
            } else {
                handleClose && handleClose();
            }
        }
    };

    return (
        <form onSubmit={handleCreateOrUpdate}>
            <Stack spacing={2} mt={2}>
                {!inWorkout ? (
                    <>
                        <TextField
                            required
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
                <TimeOrCountField
                    resultType={exercise.amountType}
                    label={`${t(`${PREFIX}.${inWorkout ? 'amount' : 'defaultAmount'}`)}${t('global.colon')}`}
                    value={getNumber(exercise.amountValue)}
                    itemToUpdate={exercise}
                    propertyToUpdate="amountValue"
                    updateItem={(item) => {
                        const exercise = item as Exercise;
                        setExerciseAndWorkout(exercise);
                    }}
                />
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
                        {exercise.resultType === 'COUNT_BASED' && (
                            <>
                                <LabeledCheckbox
                                    checked={exercise.useDefaultResult ? exercise.useDefaultResult : false}
                                    name={'useDefaultResult'}
                                    onChange={onCheckboxChange}
                                    label={`${t(`${PREFIX}.useDefaultResult`)}${t('global.colon')}`}
                                />
                                <TimeOrCountField
                                    show={exercise.useDefaultResult}
                                    resultType={exercise.resultType}
                                    label={t(`${PREFIX}.defaultResult`)}
                                    value={exercise.resultValue}
                                    itemToUpdate={exercise}
                                    updateItem={(item) => {
                                        const exercise = item as Exercise;
                                        setExerciseAndWorkout(exercise);
                                    }}
                                />
                            </>
                        )}
                    </>
                )}

                <SubmitButton testId={submitTestId} isCreate={!exerciseId} />

                <Button fullWidth color={'secondary'} variant={'contained'} onClick={handleClose}>
                    {t('global.cancel')}
                </Button>
            </Stack>
        </form>
    );
};
export default CreateEditExerciseForm;
