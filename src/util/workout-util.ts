import { ExerciseWorkoutSettings } from '../model/Exercise.model';
import { Workout } from '../model/Workout.model';
import { v4 as uuidv4 } from 'uuid';

const emptyExerciseWorkoutSettings: ExerciseWorkoutSettings = {
    name: '',
    amountType: 'COUNT_BASED',
    recordResults: false,
    resultType: 'COUNT_BASED',
    useDefaultResult: false
};

export const getNewEmptyExerciseWorkoutSettings = (): ExerciseWorkoutSettings => {
    return { ...emptyExerciseWorkoutSettings, id: uuidv4(), exerciseId: 'none' };
};

const emptyWorkout: Workout = {
    name: '',
    exercises: [getNewEmptyExerciseWorkoutSettings()],
    hasBeenCreated: false
};
export const getNewEmptyWorkout = (): Workout => {
    return { ...emptyWorkout, id: uuidv4() };
};
