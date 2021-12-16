import { CreateAndModifyInfo, IdName } from './Basics.model';
import { ExerciseWorkoutSettings } from './Exercise.model';

export interface Workout extends IdName, CreateAndModifyInfo {
    exercises: ExerciseWorkoutSettings[];
    hasBeenCreated: boolean;
}
