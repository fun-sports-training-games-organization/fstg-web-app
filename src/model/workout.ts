import { ExerciseWorkoutSettings } from './exercise-workout-settings';
import { IdName } from './basics';

export interface Workout extends IdName {
    exercises: ExerciseWorkoutSettings[];
    hasBeenCreated: boolean;
}
