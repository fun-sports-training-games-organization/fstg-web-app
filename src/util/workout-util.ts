import { Workout } from '../model/Workout.model';
import { v4 as uuidv4 } from 'uuid';
import { getNewEmptyExerciseWorkoutSettings } from './exercise-util';

const emptyWorkout: Workout = {
    name: '',
    exercises: [getNewEmptyExerciseWorkoutSettings()],
    hasBeenCreated: false
};

export const getHasNotBeenCreated = (): string => 'hasNotBeenCreated';

export const getNewEmptyWorkout = (): Workout => {
    return { ...emptyWorkout, id: uuidv4() };
};
