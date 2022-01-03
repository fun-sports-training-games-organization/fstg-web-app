import { Exercise, ExerciseInProgress, ExerciseWorkoutSettings } from '../model/Exercise.model';
import { v4 as uuidv4 } from 'uuid';
import { RecordType } from '../model/Basics.model';

const emptyExercise: Exercise = {
    name: '',
    amountType: 'COUNT_BASED',
    amountValue: 0,
    recordResults: false,
    resultType: 'COUNT_BASED',
    useDefaultResult: false,
    hasBeenCreated: false
};

export const getNewEmptyExercise = (): Exercise => {
    return { ...emptyExercise, id: uuidv4() };
};

export const getNewEmptyExerciseWorkoutSettings = (): ExerciseWorkoutSettings => {
    return { ...getNewEmptyExercise(), exerciseId: 'none' };
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
        return { ...exercise, secondsRemaining, originalSecondsRemaining: secondsRemaining } as ExerciseInProgress;
    });
};

export const isIndexValid = (exercises: ExerciseInProgress[], index: number): boolean =>
    exercises && exercises.length > index;

export const getExercise = (exercises: ExerciseInProgress[], index: number): ExerciseInProgress => {
    return isIndexValid(exercises, index) && exercises[index] ? exercises[index] : getNewEmptyExerciseInProgress();
};

export const getCurrentExerciseName = (exercises: ExerciseInProgress[], index: number): string => {
    return getExercise(exercises, index).name as string;
};

export const getCurrentExerciseLength = (exercises: ExerciseInProgress[], index: number): number => {
    return getExercise(exercises, index).amountValue as number;
};

export const getCurrentExerciseAmountType = (exercises: ExerciseInProgress[], index: number): RecordType => {
    return getExercise(exercises, index).amountType as RecordType;
};

export const getCurrentExerciseSecondsRemaining = (exercises: ExerciseInProgress[], index: number): number => {
    return getExercise(exercises, index).secondsRemaining;
};

export const getCurrentExerciseId = (exercises: ExerciseInProgress[], index: number): string => {
    return getExercise(exercises, index).id as string;
};

export const updateSecondsRemaining = (
    exercises: ExerciseInProgress[],
    index: number,
    secondsRemaining: number
): ExerciseInProgress[] => {
    return exercises.map((e, i) => (i === index ? { ...exercises[i], secondsRemaining } : e));
};

export const updateResultValue = (
    exercises: ExerciseInProgress[],
    index: number,
    resultValue: number
): ExerciseInProgress[] => {
    return exercises.map((e, i) => (i === index ? { ...exercises[i], resultValue } : e));
};
