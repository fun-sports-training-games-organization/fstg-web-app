import { CreateAndModifyInfo, IdName, HasBeenCreated, SecondsElapsed, WorkoutId } from './Basics.model';
import { ExerciseWorkoutSettings, ExerciseResult } from './Exercise.model';

export interface Workout extends IdName, CreateAndModifyInfo, HasBeenCreated {
    exercises: ExerciseWorkoutSettings[];
}

export interface WorkoutResult extends IdName, WorkoutId, CreateAndModifyInfo, HasBeenCreated, SecondsElapsed {
    exercises: ExerciseResult[];
}
