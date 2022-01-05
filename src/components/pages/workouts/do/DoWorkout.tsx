import { FC, useCallback, useEffect, useState } from 'react';
import { Grid, IconButton, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import ResponsiveContainer from '../../../organisms/responsive-container/ResponsiveContainer';
import PausePlayButton from '../../../atoms/pause-play-button/PausePlayButton';
import UnlockLockButton from '../../../atoms/unlock-lock-button/UnlockLockButton';
import { ExerciseInProgress } from '../../../../model/Exercise.model';
import { getExercise, mapToExercisesInProgress, updateSecondsRemaining } from '../../../../util/exercise-util';
import { useParams } from 'react-router-dom';
import DoWorkoutItem from '../../../organisms/do-workout-item/DoWorkoutItem';
import CountdownTimer from '../../../molecules/countdown-timer/CountdownTimer';
import { formatSecondsValueInHoursMinutesAndSeconds } from '../../../../util/date-util';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import theme from '../../../../theme/theme';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import * as notification from '../../../../util/notifications-util';

const DoWorkout: FC = () => {
    const pageName = 'do_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const entityManager = useEntityManager<Workout>('workouts');
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());
    const [exercises, setExercises] = useState<ExerciseInProgress[]>([]);
    const [currentExerciseStartTimeMs, setCurrentExerciseStartTimeMs] = useState<number>(0);
    const [nextExerciseStartTimeMs, setNextExerciseStartTimeMs] = useState<number>(0);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const switchIsLocked = () => {
        setIsLocked(!isLocked);
    };

    const [isRunning, setIsRunning] = useState<boolean>(true);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
    const [currentExercise, setCurrentExercise] = useState<ExerciseInProgress | undefined>(undefined);

    const loadWorkout = useCallback(() => {
        workoutId &&
            entityManager.findById(workoutId).then((wo: Workout) => {
                setWorkout({
                    ...wo,
                    id: workoutId
                });
                const mappedExercises = mapToExercisesInProgress(wo.exercises);
                setExercises(mappedExercises);
                setCurrentExercise(mappedExercises[0]);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutId]);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    const handleOnTick = (exercise: ExerciseInProgress, index: number) => {
        if (isRunning && index === currentExerciseIndex) {
            const secondsRemaining = exercise.secondsRemaining - 1;
            setExercises(updateSecondsRemaining(exercises, currentExerciseIndex, secondsRemaining));
            setCurrentExercise({ ...exercise, secondsRemaining });
        }
    };

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const [exerciseSeconds, setExerciseSeconds] = useState<number>(0);
    const [workoutSeconds, setWorkoutSeconds] = useState<number>(0);

    return (
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
                                            onTick={() => handleOnTick(currentExercise, currentExerciseIndex)}
                                            seconds={currentExercise.secondsRemaining}
                                            typographyProps={{ variant: smUp ? 'h4' : 'h5' }}
                                            onComplete={() => {
                                                const cei = currentExerciseIndex + 1;
                                                setExercises(
                                                    updateSecondsRemaining(exercises, currentExerciseIndex, 0)
                                                );
                                                setCurrentExerciseIndex(cei);
                                                setCurrentExercise(getExercise(exercises, cei));
                                            }}
                                            key={currentExercise.id}
                                        />
                                    ) : null}
                                    {currentExercise.amountType === 'COUNT_BASED' && (
                                        <Typography variant={smUp ? 'h4' : 'h5'}>
                                            <CountdownTimer
                                                onTick={() => isRunning && setExerciseSeconds(exerciseSeconds + 1)}
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
                            <DoWorkoutItem
                                key={exercise.id}
                                exercise={exercise}
                                index={index}
                                isCurrent={currentExerciseIndex === index}
                            />
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
                                    onClick={() => {
                                        setCurrentExerciseIndex(currentExerciseIndex - 1);
                                        setCurrentExercise(getExercise(exercises, currentExerciseIndex));
                                    }}
                                    disabled={isLocked}
                                >
                                    <SkipPreviousIcon
                                        htmlColor={isLocked ? theme.palette.grey[500] : 'black'}
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
                                    onClick={() => {
                                        const ce = { ...currentExercise, resultValue: exerciseSeconds };
                                        const cei = currentExerciseIndex + 1;
                                        setExerciseSeconds(0);
                                        setExercises(exercises.map((e, i) => (i === currentExerciseIndex ? ce : e)));
                                        ce.resultType === 'TIME_BASED' &&
                                            notification.exerciseCompletedTimeResultSuccess(enqueueSnackbar, t, {
                                                exerciseName: ce.name ? ce.name : '',
                                                resultValue: formatSecondsValueInHoursMinutesAndSeconds(
                                                    ce.resultValue ? ce.resultValue : 0
                                                )
                                            });
                                        setCurrentExerciseIndex(cei);
                                        setCurrentExercise(getExercise(exercises, cei));
                                    }}
                                    disabled={isLocked && currentExercise.amountType === 'TIME_BASED'}
                                >
                                    <SkipNextIcon
                                        htmlColor={
                                            isLocked && currentExercise.amountType === 'TIME_BASED'
                                                ? theme.palette.grey[500]
                                                : 'black'
                                        }
                                        transform="scale(2)"
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Stack>
                </>
            )}
        </ResponsiveContainer>
    );
};

export default DoWorkout;
