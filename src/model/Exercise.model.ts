import { AmountTypeAmountValue, CreateAndModifyInfo, IdName, RecordType, HasBeenCreated } from './Basics.model';

export interface Exercise extends IdName, CreateAndModifyInfo, AmountTypeAmountValue, HasBeenCreated {
    imageOrGifUrl?: string;
    recordResults?: boolean;
    resultType?: RecordType;
    useDefaultResult?: boolean;
    resultValue?: number;
}

export interface ExerciseWorkoutSettings extends Exercise {
    exerciseId?: string;
}

export interface ExerciseInProgress extends ExerciseWorkoutSettings {
    secondsRemaining: number;
    secondsElapsed: number;
    originalSecondsRemaining: number;
}
