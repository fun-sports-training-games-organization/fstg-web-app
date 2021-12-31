import { FC, useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { CountdownTimeDelta } from 'react-countdown';
import { getNewEmptyExerciseInProgress, mapToExercisesInProgress } from '../../../../util/exercise-util';

const DoWorkout: FC = () => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);
    const history = useHistory();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams() as Id;
    const workoutId = params?.id ? params.id : undefined;
    const entityManager = useEntityManager<Workout>('workouts');
    const [currentExerciseSecondsRemaining, setCurrentExerciseSecondsRemaining] = useState<number | undefined>(
        undefined
    );
    const [workout, setWorkout] = useState<Workout>(getNewEmptyWorkout());
    const [exercises, setExercises] = useState<ExerciseInProgress[]>([]);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const switchIsLocked = () => {
        setIsLocked(!isLocked);
    };
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const switchIsRunning = () => {
        setIsRunning(!isRunning);
    };
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
    const isCurrentExerciseIndexValid = (): boolean => exercises && exercises.length > currentExerciseIndex;

    const getCurrentExercise = (): ExerciseInProgress => {
        return isCurrentExerciseIndexValid() && exercises[currentExerciseIndex]
            ? exercises[currentExerciseIndex]
            : getNewEmptyExerciseInProgress();
    };

    const getCurrentExerciseName = (): string => {
        return getCurrentExercise().name as string;
    };
    const getCurrentExerciseLength = (): number => {
        return getCurrentExercise().amountValue as number;
    };
    const getCurrentExerciseSecondsRemaining = (): number => {
        return getCurrentExercise().secondsRemaining;
    };
    const getCurrentExerciseId = (): string => {
        return getCurrentExercise().id as string;
    };

    const loadWorkout = useCallback(() => {
        workoutId &&
            entityManager.findById(workoutId).then((wo: Workout) => {
                setWorkout({
                    ...wo,
                    id: workoutId,
                    hasBeenCreated: true
                });
                setExercises(mapToExercisesInProgress(wo.exercises));
                setCurrentExerciseSecondsRemaining(getCurrentExerciseSecondsRemaining());
                console.log({ currentExerciseSecondsRemaining: getCurrentExerciseSecondsRemaining() });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadWorkout();
    }, [loadWorkout]);

    return (
        <ResponsiveContainer data-testid={pageName} xl={6}>
            <Stack spacing={5}>
                <PageTitleActionButton
                    preTitleActionButton={<UnlockLockButton isLocked={isLocked} handleClick={switchIsLocked} />}
                    postTitleActionButton={
                        <PausePlayButton isRunning={isRunning} disabled={isLocked} handleClick={switchIsRunning} />
                    }
                    titleTranslationKey={getCurrentExerciseName()}
                    idPrefix={idPrefix}
                    ml={0}
                    mr={0}
                ></PageTitleActionButton>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <ExercisesTimeRepsIcons
                        entities={[getCurrentExercise()]}
                        id={getCurrentExerciseId()}
                        length={getCurrentExerciseLength()}
                        parentIdPrefix={idPrefix}
                        index={currentExerciseIndex}
                        type={workout.exercises[currentExerciseIndex].amountType}
                        variant="h4"
                    />
                    {currentExerciseSecondsRemaining && currentExerciseSecondsRemaining >= 0 ? (
                        <CountdownTimer
                            onTick={(timeDelta: CountdownTimeDelta) => {
                                setCurrentExerciseSecondsRemaining(currentExerciseSecondsRemaining - 1);
                            }}
                            seconds={currentExerciseSecondsRemaining}
                            typographyProps={{ variant: 'h4' }}
                        />
                    ) : null}
                </Stack>
                <EditImage exercise={workout?.exercises[currentExerciseIndex]} />
            </Stack>
        </ResponsiveContainer>
    );
};

export default DoWorkout;
