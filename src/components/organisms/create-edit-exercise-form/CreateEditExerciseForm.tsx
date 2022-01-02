import React, {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    SyntheticEvent,
    useCallback,
    useEffect,
    useState
} from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TimeField from '../../molecules/time-field/TimeField';
import CountField from '../../molecules/count-field/CountField';
import LabeledCheckbox from '../../molecules/labeled-checkbox/LabeledCheckbox';
import * as notification from '../../../util/notifications-util';
import { useSnackbar } from 'notistack';
import useEntityManager from '../../../hooks/useEntityManager';
import { Exercise, ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import TextField from '../../atoms/text-field/TextField';
import useFileManager from '../../../hooks/useFileManager';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { getNumber } from '../../../util/number-util';
import EditImage from '../../molecules/edit-image/EditImage';
import { Workout } from '../../../model/Workout.model';
import { getNewEmptyWorkout } from '../../../util/workout-util';
import { getNewEmptyExercise, getNewEmptyExerciseWorkoutSettings } from '../../../util/exercise-util';
import { getHasNotBeenCreated, hasBeenCreated } from '../../../util/string-util';

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

    const fileManager = useFileManager<File>('exercises');
    const {
        createEntity: createExercise,
        updateEntity: updateExercise,
        findById: findExerciseById
    } = useEntityManager<Exercise>('exercises');
    const [chosenFile, setChosenFile] = useState<File | null>(null);
    const [exercise, setExercise] = useState<Exercise>({});
    const PREFIX = 'form.label.exercise';

    const getUpdatedWorkout = (updatedExercise: Exercise): Workout => {
        return workout
            ? ({
                  ...workout,
                  exercises: workout.exercises
                      ? workout.exercises.map((e) =>
                            e.id === updatedExercise.id ? (updatedExercise as ExerciseWorkoutSettings) : e
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
                if (hasBeenCreated(wo?.id)) {
                    if (eId) {
                        setWorkout && setWorkout(wo);
                        const retrievedExercise =
                            wo?.exercises && wo?.exercises.find((exercise) => exercise.id === eId);
                        const truthyExercise = retrievedExercise
                            ? retrievedExercise
                            : getNewEmptyExerciseWorkoutSettings();
                        setExercise(truthyExercise);
                    } else {
                        const emptyExercise: Exercise = {
                            ...getNewEmptyExercise(),
                            name: name ? name : exercise.name
                        };
                        const newEmptyExercise: Exercise = {
                            ...emptyExercise,
                            id: `${getHasNotBeenCreated()}-${emptyExercise.id}`
                        };
                        const workoutCopy: Workout = {
                            ...wo
                        };
                        workoutCopy.exercises.splice(index ? index : 0, 0, newEmptyExercise);
                        setExercise(newEmptyExercise);
                        setWorkout && setWorkout(workoutCopy);
                    }
                } else {
                    if (eId) {
                        findExerciseById(eId).then((exer) => {
                            const newEmptyWorkout = getNewEmptyWorkout();
                            const e: ExerciseWorkoutSettings = {
                                ...exer,
                                exerciseId: exer.id,
                                id: newEmptyWorkout.exercises[0].id
                            };
                            setExercise(e);
                            setWorkout &&
                                setWorkout({
                                    ...newEmptyWorkout,
                                    id: wo.id,
                                    exercises: [e],
                                    name: wo.name
                                });
                        });
                    } else {
                        const emptyExercise: Exercise = {
                            ...getNewEmptyExercise(),
                            name: name ? name : exercise.name
                        };
                        const newEmptyExercise: Exercise = {
                            ...emptyExercise,
                            id: `${getHasNotBeenCreated()}-${emptyExercise.id}`
                        };
                        const newEmptyWorkout: Workout = {
                            ...getNewEmptyWorkout(),
                            exercises: [
                                { ...newEmptyExercise, exerciseId: newEmptyExercise.id, name: newEmptyExercise.name }
                            ],
                            name: wo.name
                        };
                        setExercise(newEmptyExercise);
                        setWorkout && setWorkout(newEmptyWorkout);
                    }
                }
            } else {
                if (eId) {
                    findExerciseById(eId).then((exer) => {
                        setExercise(exer);
                    });
                } else {
                    const newEmptyExercise: Exercise = {
                        ...getNewEmptyExercise(),
                        name: name ? name : exercise.name
                    };
                    setExercise({
                        ...newEmptyExercise,
                        id: `${getHasNotBeenCreated()}-${newEmptyExercise.id}`
                    });
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [exerciseId, workout, name]
    );

    useEffect(() => {
        loadExerciseAndWorkout(exerciseId, workout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseId, loadExerciseAndWorkout, name]);

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
        if (exercise?.id && hasBeenCreated(exercise.id)) {
            updateExercise(exercise)
                .then(() => {
                    notification.updateSuccess(enqueueSnackbar, t, exercise.name);
                    setExercise({});
                    handleClose && handleClose();
                })
                .catch(() => {
                    notification.updateError(enqueueSnackbar, t, exercise.name);
                });
        } else {
            createExercise(exercise)
                .then((id) => {
                    notification.createSuccess(enqueueSnackbar, t, exercise.name);
                    workout &&
                        setWorkout &&
                        setWorkout({
                            ...workout,
                            exercises: workout?.exercises.map((e, i) =>
                                i === index ? { ...exercise, id: e.id, exerciseId: id } : e
                            )
                        });
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
