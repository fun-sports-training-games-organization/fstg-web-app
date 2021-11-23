import { ExerciseWorkoutSettings } from './exercise-workout-settings';

export interface Workout {
    id?: string;
    name: string;
    exercises: ExerciseWorkoutSettings[];
    hasBeenCreated: boolean;
}
