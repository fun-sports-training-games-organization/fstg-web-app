import { FC, useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Id } from '../../../../model/Basics.model';
import { Workout } from '../../../../model/Workout.model';
import { getPageIdPrefix } from '../../../../util/id-util';
import useEntityManager from '../../../../hooks/useEntityManager';
import { getNewEmptyWorkout } from '../../../../util/workout-util';
import PageTitleActionButton from '../../../molecules/page-title-action/PageTitleAction';
import ResponsiveContainer from '../../../organisms/responsive-container/ResponsiveContainer';
import PausePlayButton from '../../../atoms/pause-play-button/PausePlayButton';
import UnlockLockButton from '../../../atoms/unlock-lock-button/UnlockLockButton';
import { ExerciseInProgress } from '../../../../model/Exercise.model';
import {
    getCurrentExerciseName,
    mapToExercisesInProgress,
    updateSecondsRemaining
} from '../../../../util/exercise-util';
import { useParams } from 'react-router-dom';
import Countdown, { CountdownApi } from 'react-countdown';
import DoWorkoutItem from '../../../organisms/do-workout-item/DoWorkoutItem';

const DoWorkout: FC = () => {
    const pageName = 'do_workout';
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

    return (
        <ResponsiveContainer data-testid={pageName} xl={6}>
            {exercises && exercises[currentExerciseIndex] && (
                <Stack spacing={5} ml={{ xs: 1, sm: 2 }} mr={{ xs: 1, sm: 2 }}>
                    <PageTitleActionButton
                        preTitleActionButton={<UnlockLockButton isLocked={isLocked} handleClick={switchIsLocked} />}
                        postTitleActionButton={
                            <PausePlayButton isRunning={isRunning} disabled={isLocked} handleClick={switchIsRunning} />
                        }
                        titleTranslationKey={getCurrentExerciseName(exercises, currentExerciseIndex)}
                        idPrefix={idPrefix}
                        mt={0}
                        ml={0}
                        mr={0}
                        pt={15}
                        position="sticky"
                        top={56}
                        height="85px"
                        bgcolor="white"
                        maxTitleWidth="65vw"
                    ></PageTitleActionButton>
                    {exercises.map((exercise, index) => (
                        <DoWorkoutItem
                            key={exercise.id}
                            exercise={exercise}
                            index={index}
                            onTick={() => handleOnTick(exercise, index)}
                            onComplete={() => {
                                setExercises(updateSecondsRemaining(exercises, currentExerciseIndex, 0));
                                setCurrentExerciseIndex(currentExerciseIndex + 1);
                            }}
                            setCountdownApiFromRef={currentExerciseIndex === index ? setCountdownApiFromRef : undefined}
                            isCurrent={currentExerciseIndex === index}
                        />
                    ))}
                </Stack>
            )}
        </ResponsiveContainer>
    );
};

export default DoWorkout;
