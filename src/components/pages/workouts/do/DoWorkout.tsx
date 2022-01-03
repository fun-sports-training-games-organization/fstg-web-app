import { FC, useCallback, useEffect, useState } from 'react';
import { Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import ResponsiveContainer from '../../../organisms/responsive-container/ResponsiveContainer';
import PausePlayButton from '../../../atoms/pause-play-button/PausePlayButton';
import UnlockLockButton from '../../../atoms/unlock-lock-button/UnlockLockButton';
import { ExerciseInProgress } from '../../../../model/Exercise.model';
import {
    getCurrentExerciseAmountType,
    getCurrentExerciseId,
    getCurrentExerciseSecondsRemaining,
    getExercise,
    mapToExercisesInProgress,
    updateSecondsRemaining
} from '../../../../util/exercise-util';
import { useParams } from 'react-router-dom';
import Countdown, { CountdownApi } from 'react-countdown';
import DoWorkoutItem from '../../../organisms/do-workout-item/DoWorkoutItem';
import CountdownTimer from '../../../molecules/countdown-timer/CountdownTimer';
import CountUp from 'react-countup';
import { formatSecondsValueInHoursMinutesAndSeconds } from '../../../../util/date-util';

const DoWorkout: FC = () => {
    const pageName = 'do_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const entityManager = useEntityManager<Workout>('workouts');
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());
    const [exercises, setExercises] = useState<ExerciseInProgress[]>([]);
    const [currentExerciseStartTimeMs, setCurrentExerciseStartTimeMs] = useState<number>(0);
    const [nextExerciseStartTimeMs, setNextExerciseStartTimeMs] = useState<number>(0);
    const [lastPauseTimeMs, setLastPauseTimeMs] = useState<number>(0);
    const [lastStartTimeMs, setLastStartTimeMs] = useState<number>(0);
    const [duration, setDuration] = useState<number>(6600);
    const [startSeconds, setStartSeconds] = useState<number>(0);
    const [countdownApi, setCountdownApi] = useState<CountdownApi | null>();
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const switchIsLocked = () => {
        setIsLocked(!isLocked);
    };

    const setCountdownApiFromRef = (countdown: Countdown | null): void | null =>
        countdown && setCountdownApi(countdown.getApi());

    const start = () => countdownApi && countdownApi.start();
    const pause = () => countdownApi && countdownApi.pause();

    const [isRunning, setIsRunning] = useState<boolean>(true);

    const switchIsRunning = (pauseResume: () => void) => {
        if (getCurrentExerciseAmountType(exercises, currentExerciseIndex) === 'COUNT_BASED') {
            const now = Date.now();
            const secondsSinceLastPauseTime = (now - lastPauseTimeMs) / 1000;
            const secondsSinceLastStartTime = (now - lastStartTimeMs) / 1000;
            if (isRunning) {
                setLastPauseTimeMs(now);
                setStartSeconds(startSeconds + secondsSinceLastStartTime);
            } else {
                setLastStartTimeMs(now);
                setDuration(duration + secondsSinceLastPauseTime);
            }
            pauseResume();
        } else {
            isRunning ? pause() : start();
        }
        setIsRunning(!isRunning);
    };
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

    const loadWorkout = useCallback(() => {
        workoutId &&
            entityManager.findById(workoutId).then((wo: Workout) => {
                setWorkout({
                    ...wo,
                    id: workoutId
                });
                setExercises(mapToExercisesInProgress(wo.exercises));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutId]);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    const handleOnTick = (exercise: ExerciseInProgress, index: number) => {
        if (isRunning && index === currentExerciseIndex) {
            setExercises(updateSecondsRemaining(exercises, currentExerciseIndex, exercise.secondsRemaining - 1));
        }
    };

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    return (
        <ResponsiveContainer data-testid={pageName} xl={6}>
            {exercises && exercises[currentExerciseIndex] && (
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
                        <CountUp
                            className="account-balance"
                            end={3599}
                            duration={duration}
                            start={startSeconds}
                            delay={0}
                            formattingFn={formatSecondsValueInHoursMinutesAndSeconds}
                            onStart={() => {
                                const now = Date.now();
                                setCurrentExerciseStartTimeMs(now);
                                setLastStartTimeMs(now);
                            }}
                        >
                            {({ countUpRef, pauseResume }) => (
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <UnlockLockButton isLocked={isLocked} handleClick={switchIsLocked} />
                                    </Grid>
                                    <Grid item>
                                        {getCurrentExerciseAmountType(exercises, currentExerciseIndex) ===
                                            'TIME_BASED' &&
                                        getCurrentExerciseSecondsRemaining(exercises, currentExerciseIndex) >= 0 ? (
                                            <CountdownTimer
                                                onTick={() =>
                                                    handleOnTick(
                                                        getExercise(exercises, currentExerciseIndex),
                                                        currentExerciseIndex
                                                    )
                                                }
                                                seconds={getCurrentExerciseSecondsRemaining(
                                                    exercises,
                                                    currentExerciseIndex
                                                )}
                                                typographyProps={{ variant: smUp ? 'h4' : 'h5' }}
                                                onComplete={() => {
                                                    setExercises(
                                                        updateSecondsRemaining(exercises, currentExerciseIndex, 0)
                                                    );
                                                    setCurrentExerciseIndex(currentExerciseIndex + 1);
                                                    start();
                                                }}
                                                key={getCurrentExerciseId(exercises, currentExerciseIndex)}
                                                countdownRef={setCountdownApiFromRef}
                                            />
                                        ) : null}
                                        {getCurrentExerciseAmountType(exercises, currentExerciseIndex) ===
                                            'COUNT_BASED' && (
                                            <>
                                                <Typography
                                                    variant={smUp ? 'h4' : 'h5'}
                                                    display={isRunning ? undefined : 'none'}
                                                >
                                                    <span ref={countUpRef} />
                                                </Typography>
                                                <Typography
                                                    variant={smUp ? 'h4' : 'h5'}
                                                    display={!isRunning ? undefined : 'none'}
                                                >
                                                    <span>
                                                        {formatSecondsValueInHoursMinutesAndSeconds(
                                                            Math.floor(startSeconds)
                                                        )}
                                                    </span>
                                                </Typography>
                                            </>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <PausePlayButton
                                            isRunning={isRunning}
                                            disabled={isLocked}
                                            handleClick={() => switchIsRunning(pauseResume)}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </CountUp>
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
            )}
        </ResponsiveContainer>
    );
};

export default DoWorkout;
