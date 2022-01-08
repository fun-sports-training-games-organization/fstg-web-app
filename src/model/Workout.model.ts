import { CreateAndModifyInfo, IdName, HasBeenCreated, Id, SecondsElapsed } from './Basics.model';
import { ExerciseWorkoutSettings, ExerciseResult } from './Exercise.model';

export interface Workout extends IdName, CreateAndModifyInfo, HasBeenCreated {
    exercises: ExerciseWorkoutSettings[];
}

export interface WorkoutResult extends Id, CreateAndModifyInfo, HasBeenCreated, SecondsElapsed {
    exercises: ExerciseResult[];
}
