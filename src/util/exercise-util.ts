import { ExerciseInProgress, ExerciseWorkoutSettings } from '../model/Exercise.model';
import { v4 as uuidv4 } from 'uuid';

const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
    name: '',
    amountType: 'COUNT_BASED',
    amountValue: 0,
    recordResults: false,
    resultType: 'COUNT_BASED',
    useDefaultResult: false,
    exerciseId: 'none'
};

export const getNewEmptyExerciseWorkoutSettings = (): ExerciseWorkoutSettings => {
    return { ...emptyExerciseWorkoutSettings, id: uuidv4() };
};

const defaultSecondsRemaining = 3599;

export const getNewEmptyExerciseInProgress = (): ExerciseInProgress => {
    return {
        ...getNewEmptyExerciseWorkoutSettings(),
        secondsRemaining: -1,
        originalSecondsRemaining: -1
    };
};

export const mapToExercisesInProgress = (exercises: ExerciseWorkoutSettings[]): ExerciseInProgress[] => {
    return exercises.map((exercise) => {
        const secondsRemaining = exercise.amountType === 'TIME_BASED' ? exercise.amountValue : defaultSecondsRemaining;
        console.log({
            exerciseInProgress: {
                ...exercise,
                secondsRemaining,
                originalSecondsRemaining: secondsRemaining
            } as ExerciseInProgress
        });
        return { ...exercise, secondsRemaining, originalSecondsRemaining: secondsRemaining } as ExerciseInProgress;
    });
};
