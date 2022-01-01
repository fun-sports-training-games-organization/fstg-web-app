import { FC, useCallback, useEffect, useState } from 'react';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import PageTitleActionButton from '../../../molecules/page-title-action/PageTitleAction';
import ResponsiveContainer from '../../../organisms/responsive-container/ResponsiveContainer';
import PausePlayButton from '../../../atoms/pause-play-button/PausePlayButton';
import UnlockLockButton from '../../../atoms/unlock-lock-button/UnlockLockButton';
import EditImage from '../../../molecules/edit-image/EditImage';
import ExercisesTimeRepsIcons from '../../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import { ExerciseInProgress } from '../../../../model/Exercise.model';
import CountdownTimer from '../../../molecules/countdown-timer/CountdownTimer';
import {
    getCurrentExerciseId,
    getCurrentExerciseLength,
    getCurrentExerciseName,
    getExercise,
    mapToExercisesInProgress,
    updateSecondsRemaining
} from '../../../../util/exercise-util';
import { useParams } from 'react-router-dom';
import Countdown, { CountdownApi } from 'react-countdown';

const DoWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const entityManager = useEntityManager<Workout>('workouts');
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());
    const [exercises, setExercises] = useState<ExerciseInProgress[]>([]);
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

    const switchIsRunning = () => {
        isRunning ? pause() : start();
        setIsRunning(!isRunning);
    };
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

    const loadWorkout = useCallback(() => {
        workoutId &&
            entityManager.findById(workoutId).then((wo: Workout) => {
                setWorkout({
                    ...wo,
                    id: workoutId,
                    hasBeenCreated: true
                });
                setExercises(mapToExercisesInProgress(wo.exercises));
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutId]);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    return (
        <ResponsiveContainer data-testid={pageName} xl={6}>
            {exercises && exercises[currentExerciseIndex] && (
                <Stack spacing={5}>
                    <PageTitleActionButton
                        preTitleActionButton={<UnlockLockButton isLocked={isLocked} handleClick={switchIsLocked} />}
                        postTitleActionButton={
                            <PausePlayButton isRunning={isRunning} disabled={isLocked} handleClick={switchIsRunning} />
                        }
                        titleTranslationKey={getCurrentExerciseName(exercises, currentExerciseIndex)}
                        idPrefix={idPrefix}
                        ml={0}
                        mr={0}
                    ></PageTitleActionButton>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <ExercisesTimeRepsIcons
                            entities={[getExercise(exercises, currentExerciseIndex)]}
                            id={getCurrentExerciseId(exercises, currentExerciseIndex)}
                            length={getCurrentExerciseLength(exercises, currentExerciseIndex)}
                            parentIdPrefix={idPrefix}
                            index={currentExerciseIndex}
                            type={workout.exercises[currentExerciseIndex].amountType}
                            variant={smUp ? 'h4' : 'h5'}
                        />
                        {exercises[currentExerciseIndex].amountType === 'TIME_BASED' &&
                        exercises[currentExerciseIndex].secondsRemaining >= 0 ? (
                            <CountdownTimer
                                onTick={() => {
                                    if (isRunning) {
                                        setExercises(
                                            updateSecondsRemaining(
                                                exercises,
                                                currentExerciseIndex,
                                                exercises[currentExerciseIndex].secondsRemaining - 1
                                            )
                                        );
                                    }
                                }}
                                seconds={exercises[currentExerciseIndex].secondsRemaining}
                                typographyProps={{ variant: smUp ? 'h4' : 'h5' }}
                                onComplete={() => {
                                    setExercises(updateSecondsRemaining(exercises, currentExerciseIndex, 0));
                                    setCurrentExerciseIndex(currentExerciseIndex + 1);
                                }}
                                key={exercises[currentExerciseIndex].id}
                                countdownRef={setCountdownApiFromRef}
                            />
                        ) : null}
                    </Stack>
                    <Stack>
                        <EditImage exercise={exercises[currentExerciseIndex]} noImageIconSize="large" />
                    </Stack>
                </Stack>
            )}
        </ResponsiveContainer>
    );
};

export default DoWorkout;
