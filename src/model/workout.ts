import { ExerciseWorkoutSettings } from './exercise-workout-settings';
import { CreateAndModifyInfo, IdName } from './basics';

export interface Workout extends IdName, CreateAndModifyInfo {
    exercises: ExerciseWorkoutSettings[];
    hasBeenCreated: boolean;
}
