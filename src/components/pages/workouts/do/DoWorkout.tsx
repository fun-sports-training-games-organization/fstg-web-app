/* eslint-disable unused-imports/no-unused-vars */
import { createRef, FC, RefObject, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Button, Grid, IconButton, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { Id, RecordType } from '../../../../model/Basics.model';
import { Workout, WorkoutResult } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';
import PausePlayButton from '../../../atoms/pause-play-button/PausePlayButton';
import UnlockLockButton from '../../../atoms/unlock-lock-button/UnlockLockButton';
import { ExerciseInProgress, ExerciseResult } from '../../../../model/Exercise.model';
import { getExercise, mapToExercisesInProgress, updateSecondsRemaining } from '../../../../util/exercise-util';
import { useHistory, useParams } from 'react-router-dom';
import DoWorkoutItem from '../../../organisms/do-workout-item/DoWorkoutItem';
import CountdownTimer from '../../../molecules/countdown-timer/CountdownTimer';
import { formatSecondsValueInHoursMinutesAndSeconds } from '../../../../util/date-util';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import theme from '../../../../theme/theme';
import { useTranslation } from 'react-i18next';
import ResponsiveDialog from '../../../organisms/dialogs/responsive-dialog';
import TimeOrCountField from '../../../atoms/time-or-count-field/TimeOrCountField';
import * as navigate from '../../../../util/navigation-util';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmationDialog from '../../../organisms/dialogs/confirmation-dialog/ConfirmationDialog';
import * as notification from '../../../../util/notifications-util';
import { useSnackbar } from 'notistack';
import Loader from '../../../atoms/loader/Loader';

const DoWorkout: FC = () => {
    const pageName = 'do_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { findById } = useEntityManager<Workout>('workouts');
    const { createEntity } = useEntityManager<WorkoutResult>('workoutResults');
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());
    const [exercises, setExercises] = useState<ExerciseInProgress[]>([]);
    const [originalExercises, setOriginalExercises] = useState<ExerciseInProgress[]>([]);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [isExerciseResultDialogOpen, setIsExerciseResultDialogOpen] = useState<boolean>(false);
    const [isCompleteWorkoutDialogOpen, setIsCompleteWorkoutDialogOpen] = useState<boolean>(false);
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState<boolean>(false);
    const [confirmationDialogTitle, setConfirmationDialogTitle] = useState<string>('');
    const [confirmationDialogMessage, setConfirmationDialogMessage] = useState<string>('');
    const [confirmationDialogOnClose, setConfirmationDialogOnClose] =
        useState<(event: SyntheticEvent<HTMLButtonElement, Event>) => void>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [workoutRefs, setWorkoutRefs] = useState<RefObject<any>[]>([]);
    const switchIsLocked = () => {
        setIsLocked(!isLocked);
    };
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
    const [currentExercise, setCurrentExercise] = useState<ExerciseInProgress | undefined>(undefined);
    const [exerciseBeingEdited, setExerciseBeingEdited] = useState<ExerciseInProgress | undefined>(undefined);

    const loadWorkout = useCallback(() => {
        if (workoutId) {
            setIsLoading(true);
            findById(workoutId)
                .then((wo: Workout) => {
                    setWorkout({
                        ...wo,
                        id: workoutId
                    });
                    const mappedExercises = mapToExercisesInProgress(wo.exercises);
                    setExercises(mappedExercises);
                    setOriginalExercises(mappedExercises);
                    setCurrentExercise(mappedExercises[0]);
                    setWorkoutRefs(mappedExercises.map(() => createRef()));
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutId]);

    useEffect(() => {
        loadWorkout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const countdownTimerTick = (exercise: ExerciseInProgress, index: number) => {
        if (isRunning && index === currentExerciseIndex) {
            const secondsRemaining = exercise.secondsRemaining - 1;
            setExercises(updateSecondsRemaining(exercises, currentExerciseIndex, secondsRemaining));
            setCurrentExercise({ ...exercise, secondsRemaining });
        }
    };

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const [exerciseSeconds, setExerciseSeconds] = useState<number>(0);
    const [workoutSeconds, setWorkoutSeconds] = useState<number>(0);

    const scrollToCurrentExercise = (cei: number) => {
        if (cei === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            workoutRefs &&
                workoutRefs[cei] &&
                workoutRefs[cei].current &&
                workoutRefs[cei].current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
        }
    };

    const nextExercise = (recordResults = false) => {
        if (recordResults) {
            if (currentExercise) {
                const ce = {
                    ...currentExercise,
                    resultValue:
                        currentExercise.resultType === 'TIME_BASED' ? exerciseSeconds : currentExercise.resultValue
                };
                setCurrentExercise(ce);
                setExerciseBeingEdited(ce);
                setExercises(exercises.map((e) => (e.id === ce.id ? ce : e)));
            }

            setIsExerciseResultDialogOpen(true);
        } else {
            if (currentExerciseIndex + 1 >= exercises.length) {
                setIsCompleteWorkoutDialogOpen(true);
            }
        }

        const ce = { ...currentExercise } as ExerciseInProgress;
        const cei = currentExerciseIndex + 1;
        if (cei < exercises.length) {
            setExerciseSeconds(0);
            setExercises(exercises.map((e, i) => (i === currentExerciseIndex ? ce : e)));
            setCurrentExerciseIndex(cei);
            setCurrentExercise(getExercise(exercises, cei));
            setTimeout(() => scrollToCurrentExercise(cei), 10);
        } else {
            setIsRunning(false);
        }
    };

    const previousExercise = () => {
        const cei = currentExerciseIndex - 1;
        scrollToCurrentExercise(cei);
        setCurrentExerciseIndex(cei);
        setCurrentExercise(getExercise(exercises, cei));
    };
    const getIconColor = (isDisabled: boolean, amountType: RecordType = 'COUNT_BASED') => {
        return isDisabled && amountType === 'TIME_BASED' ? theme.palette.grey[500] : 'black';
    };
    const countupTimerTick = (isTimerRunning: boolean, seconds: number) =>
        isTimerRunning && setExerciseSeconds(seconds + 1);

    const areAnyResultsRecorded = (exers: ExerciseInProgress[]): boolean =>
        exers.map((e) => (e.recordResults ? 1 : 0) as number).reduce((a, b) => a + b) > 0;

    const saveWorkoutResults = (onSuccess?: () => void, onFailure?: () => void) => {
        const workoutResult: WorkoutResult = {
            workoutId: workout.id,
            name: workout.name,
            secondsElapsed: workoutSeconds,
            exercises: exercises
                .filter((e) => e.recordResults)
                .map((e) => {
                    const {
                        imageOrGifUrl,
                        recordResults,
                        useDefaultResult,
                        createdUTCMilliseconds,
                        createdById,
                        createdByDisplayName,
                        lastModifiedUTCMilliseconds,
                        lastModifiedById,
                        lastModifiedByDisplayName,
                        originalSecondsRemaining,
                        secondsRemaining,
                        ...exerciseResult
                    } = e;
                    return exerciseResult as ExerciseResult;
                }),
            hasBeenCreated: false
        };
        createEntity(workoutResult)
            .then(() => onSuccess && onSuccess())
            .catch(() => onFailure && onFailure());
    };

    const adjustWorkoutSettings = () => {
        setIsConfirmationDialogOpen(true);
        setConfirmationDialogOnClose(() => (event: SyntheticEvent<HTMLButtonElement>) => {
            if (event.currentTarget.value === 'confirm') {
                setIsLoading(true);
                saveWorkoutResults(
                    () => {
                        notification.createSuccess(
                            enqueueSnackbar,
                            t,
                            `${t('notifications.workoutResultFor')}${t('global.colon')} ${workout.name}`
                        );
                        setIsLoading(false);
                        navigate.toEditWorkout(history, workout.id);
                    },
                    () => {
                        notification.createError(
                            enqueueSnackbar,
                            t,
                            `${t('notifications.workoutResultFor')}${t('global.colon')} ${workout.name}`
                        );
                        setIsLoading(false);
                    }
                );
            } else {
                setIsConfirmationDialogOpen(false);
            }
        });
        setConfirmationDialogTitle(t('dialog.adjustWorkoutSettings.title'));
        setConfirmationDialogMessage(t('dialog.adjustWorkoutSettings.message', { name: workout.name }));
    };

    const discardWorkoutResults = () => {
        setIsConfirmationDialogOpen(true);
        setConfirmationDialogOnClose(() => (event: SyntheticEvent<HTMLButtonElement>) => {
            if (event.currentTarget.value === 'confirm') {
                navigate.toDashboard(history);
            } else {
                setIsConfirmationDialogOpen(false);
            }
        });
        setConfirmationDialogTitle(t('dialog.discardWorkoutResults.title'));
        setConfirmationDialogMessage(t('dialog.discardWorkoutResults.message', { name: workout.name }));
    };

    const restartWorkout = () => {
        setExercises(originalExercises);
        setCurrentExercise(originalExercises[0]);
        setCurrentExerciseIndex(0);
        setWorkoutSeconds(0);
        setExerciseSeconds(0);
        setIsRunning(true);
        scrollToCurrentExercise(0);
    };

    const saveWorkoutResultsAndRestartWorkout = () => {
        setIsConfirmationDialogOpen(true);
        setConfirmationDialogOnClose(() => (event: SyntheticEvent<HTMLButtonElement>) => {
            if (event.currentTarget.value === 'confirm') {
                setIsConfirmationDialogOpen(false);
                setIsLoading(true);
                saveWorkoutResults(
                    () => {
                        notification.createSuccess(
                            enqueueSnackbar,
                            t,
                            `${t('notifications.workoutResultFor')}${t('global.colon')} ${workout.name}`
                        );
                        setIsCompleteWorkoutDialogOpen(false);
                        restartWorkout();
                        setIsLoading(false);
                    },
                    () => {
                        notification.createError(
                            enqueueSnackbar,
                            t,
                            `${t('notifications.workoutResultFor')}${t('global.colon')} ${workout.name}`
                        );
                        setIsLoading(false);
                    }
                );
            } else {
                setIsConfirmationDialogOpen(false);
            }
        });
        setConfirmationDialogTitle(t('dialog.saveWorkoutResultsAndRestartWorkout.title'));
        setConfirmationDialogMessage(t('dialog.saveWorkoutResultsAndRestartWorkout.message', { name: workout.name }));
    };

    const saveWorkoutResultsAndExitWorkout = () => {
        setIsConfirmationDialogOpen(true);
        setConfirmationDialogOnClose(() => (event: SyntheticEvent<HTMLButtonElement>) => {
            if (event.currentTarget.value === 'confirm') {
                setIsLoading(true);
                saveWorkoutResults(
                    () => {
                        notification.createSuccess(
                            enqueueSnackbar,
                            t,
                            `${t('notifications.workoutResultFor')}${t('global.colon')} ${workout.name}`
                        );
                        setIsLoading(false);
                        navigate.toDashboard(history);
                    },
                    () => {
                        notification.createError(
                            enqueueSnackbar,
                            t,
                            `${t('notifications.workoutResultFor')}${t('global.colon')} ${workout.name}`
                        );
                        setIsLoading(false);
                    }
                );
                setIsConfirmationDialogOpen(false);
            } else {
                setIsConfirmationDialogOpen(false);
            }
        });
        setConfirmationDialogTitle(t('dialog.saveWorkoutResultsAndExitWorkout.title'));
        setConfirmationDialogMessage(t('dialog.saveWorkoutResultsAndExitWorkout.message', { name: workout.name }));
    };

    const closeExerciseResultDialog = () => {
        setExercises(
            exercises.map((e) => (exerciseBeingEdited && e.id === exerciseBeingEdited.id ? exerciseBeingEdited : e))
        );
        setIsExerciseResultDialogOpen(false);
        if (currentExerciseIndex + 1 >= exercises.length) {
            setIsCompleteWorkoutDialogOpen(true);
        }
    };
    return isLoading ? (
        <Loader />
    ) : (
        <>
            <ResponsiveContainer data-testid={pageName} xl={6}>
                {exercises && currentExercise && (
                    <>
                        <Stack spacing={5} ml={{ xs: 1, sm: 2 }} mr={{ xs: 1, sm: 2 }}>
                            <Stack
                                data-testid={`${idPrefix}title_action`}
                                ml={0}
                                mr={0}
                                mt={0}
                                pt="2.2rem"
                                position="sticky"
                                top="3rem"
                                height="6rem"
                                bgcolor="white"
                            >
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <UnlockLockButton isLocked={isLocked} handleClick={switchIsLocked} />
                                    </Grid>
                                    <Grid item>
                                        {currentExercise.amountType === 'TIME_BASED' &&
                                        currentExercise.secondsRemaining >= 0 ? (
                                            <CountdownTimer
                                                onTick={() => countdownTimerTick(currentExercise, currentExerciseIndex)}
                                                seconds={currentExercise.secondsRemaining}
                                                typographyProps={{ variant: smUp ? 'h4' : 'h5' }}
                                                onComplete={() => nextExercise(currentExercise.recordResults)}
                                                key={currentExercise.id}
                                            />
                                        ) : null}
                                        {currentExercise.amountType === 'COUNT_BASED' && (
                                            <Typography variant={smUp ? 'h4' : 'h5'}>
                                                <CountdownTimer
                                                    onTick={() => countupTimerTick(isRunning, exerciseSeconds)}
                                                    seconds={360000}
                                                    display="none"
                                                />
                                                {formatSecondsValueInHoursMinutesAndSeconds(exerciseSeconds)}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <PausePlayButton
                                            isRunning={isRunning}
                                            disabled={isLocked}
                                            handleClick={() => setIsRunning(!isRunning)}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                            {exercises.map((exercise, index) => (
                                <div style={{ marginTop: 0 }} key={exercise.id + '-div'} ref={workoutRefs[index]}>
                                    <DoWorkoutItem
                                        key={exercise.id}
                                        exercise={exercise}
                                        index={index}
                                        isCurrent={currentExerciseIndex === index}
                                    />
                                </div>
                            ))}
                        </Stack>
                        <Stack
                            data-testid={`${idPrefix}title_action`}
                            ml={0}
                            mr={0}
                            mt={0}
                            pt="1rem"
                            position="sticky"
                            bottom="0"
                            height="5rem"
                            bgcolor="white"
                        >
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <IconButton
                                        onClick={previousExercise}
                                        disabled={isLocked || currentExerciseIndex === 0}
                                    >
                                        <SkipPreviousIcon
                                            htmlColor={getIconColor(isLocked, currentExercise.amountType)}
                                            transform="scale(2)"
                                        />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant={smUp ? 'h4' : 'h5'}>
                                        <CountdownTimer
                                            onTick={() => isRunning && setWorkoutSeconds(workoutSeconds + 1)}
                                            seconds={360000}
                                            display="none"
                                        />
                                        {formatSecondsValueInHoursMinutesAndSeconds(workoutSeconds)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        onClick={() => nextExercise(currentExercise.recordResults)}
                                        disabled={isLocked && currentExercise.amountType === 'TIME_BASED'}
                                    >
                                        <SkipNextIcon
                                            htmlColor={getIconColor(isLocked, currentExercise.amountType)}
                                            transform="scale(2)"
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Stack>
                    </>
                )}
            </ResponsiveContainer>
            {exercises && exerciseBeingEdited && (
                <ResponsiveDialog
                    title={`${exerciseBeingEdited.name} ${t(`global.result`)}${t(`global.colon`)}`}
                    open={isExerciseResultDialogOpen}
                    content={
                        <TimeOrCountField
                            show={exerciseBeingEdited.useDefaultResult}
                            resultType={exerciseBeingEdited.resultType}
                            timeLabel={t(
                                exerciseBeingEdited.resultType === 'TIME_BASED'
                                    ? 'global.completedIn'
                                    : 'global.repsCompleted'
                            )}
                            value={exerciseBeingEdited.resultValue}
                            itemToUpdate={exerciseBeingEdited}
                            updateItem={(item) => setExerciseBeingEdited(item as ExerciseInProgress)}
                        />
                    }
                    onClose={closeExerciseResultDialog}
                    onCancel={closeExerciseResultDialog}
                    onConfirm={closeExerciseResultDialog}
                    fullScreenOverride={false}
                    confirmText={t('global.ok')}
                />
            )}
            {exercises && exercises.length > 0 && (
                <>
                    <ResponsiveDialog
                        title={`${workout?.name ? workout.name : `global.workout`} ${t(`global.results`)}${t(
                            `global.colon`
                        )}`}
                        message={`${t('page.doWorkout.workoutCompleteCongratulations')}${
                            areAnyResultsRecorded(exercises) ? ` ${t('page.doWorkout.reviewWorkoutResults')}` : ''
                        }`}
                        messageFontWeight="bold"
                        open={isCompleteWorkoutDialogOpen}
                        content={
                            <Stack display="flex" direction="column" mt="1rem" gap="1rem" color={'rgba(0, 0, 0, 0.6)'}>
                                <Typography variant="body1" fontWeight="bold">
                                    {`${t('page.doWorkout.workoutCompletedIn')}${t(
                                        'global.colon'
                                    )} ${formatSecondsValueInHoursMinutesAndSeconds(workoutSeconds)}`}
                                </Typography>
                                {areAnyResultsRecorded(exercises) ? (
                                    exercises
                                        .filter((e) => e.recordResults)
                                        .map((e) => {
                                            return (
                                                <TimeOrCountField
                                                    key={e.id}
                                                    show={e.recordResults}
                                                    resultType={e.resultType}
                                                    timeLabel={`${e.name} ${t(
                                                        e.resultType === 'TIME_BASED'
                                                            ? 'global.completedIn'
                                                            : 'global.repsCompleted'
                                                    )}`}
                                                    value={e.resultValue}
                                                    itemToUpdate={e}
                                                    updateItem={(item) => {
                                                        setCurrentExercise(item as ExerciseInProgress);
                                                    }}
                                                />
                                            );
                                        })
                                ) : (
                                    <>
                                        <Typography variant="body1" fontStyle="italic" fontWeight="normal">
                                            {`*** ${t('page.doWorkout.notRecordingResults')}${t('global.colon')}`}
                                        </Typography>
                                        <Link
                                            variant="caption"
                                            sx={{
                                                bgcolor: theme.palette.grey[200],
                                                padding: 1,
                                                borderRadius: 2,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '80%',
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                ':hover': { opacity: 0.7 }
                                            }}
                                            onClick={adjustWorkoutSettings}
                                        >
                                            {t('page.doWorkout.adjustingWorkoutSettings')}
                                            <SettingsIcon />
                                        </Link>
                                    </>
                                )}
                                <Button
                                    fullWidth
                                    variant={'contained'}
                                    data-testid={`${idPrefix}-discard-workout-results`}
                                    color={'secondary'}
                                    startIcon={<DeleteForeverIcon />}
                                    endIcon={<ExitToAppIcon />}
                                    onClick={discardWorkoutResults}
                                >
                                    {t('global.discardAndExit')}
                                </Button>
                                <Button
                                    fullWidth
                                    variant={'contained'}
                                    data-testid={`${idPrefix}-save-workout-results-and-restart-workout`}
                                    startIcon={<SaveIcon />}
                                    endIcon={<RestartAltIcon />}
                                    color={'info'}
                                    onClick={saveWorkoutResultsAndRestartWorkout}
                                >
                                    {t('global.saveAndRestart')}
                                </Button>
                                <Button
                                    fullWidth
                                    variant={'contained'}
                                    data-testid={`${idPrefix}-save-workout-results-and-exit-workout`}
                                    color={'primary'}
                                    startIcon={<SaveIcon />}
                                    endIcon={<ExitToAppIcon />}
                                    onClick={saveWorkoutResultsAndExitWorkout}
                                >
                                    {t('global.saveAndExit')}
                                </Button>
                            </Stack>
                        }
                        dialogActionsJustifyContent="space-between"
                    />
                    <ConfirmationDialog
                        open={isConfirmationDialogOpen}
                        title={confirmationDialogTitle}
                        message={confirmationDialogMessage}
                        onClose={(event: SyntheticEvent<HTMLButtonElement>) =>
                            confirmationDialogOnClose && confirmationDialogOnClose(event)
                        }
                    />
                </>
            )}
        </>
    );
};

export default DoWorkout;
