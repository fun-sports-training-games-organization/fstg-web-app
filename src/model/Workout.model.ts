import { CreateAndModifyInfo, IdName, HasBeenCreated } from './Basics.model';
import { ExerciseWorkoutSettings } from './Exercise.model';

export interface Workout extends IdName, CreateAndModifyInfo, HasBeenCreated {
    exercises: ExerciseWorkoutSettings[];
}
