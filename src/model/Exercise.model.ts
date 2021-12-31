import { AmountTypeAmountValue, CreateAndModifyInfo, IdName, RecordType } from './Basics.model';

export interface Exercise extends IdName, CreateAndModifyInfo, AmountTypeAmountValue {
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
    originalSecondsRemaining: number;
}
