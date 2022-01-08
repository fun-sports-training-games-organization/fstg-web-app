import {
    AmountTypeAmountValue,
    CreateAndModifyInfo,
    IdName,
    RecordType,
    HasBeenCreated,
    ResultValue
} from './Basics.model';

export interface Exercise extends IdName, CreateAndModifyInfo, AmountTypeAmountValue, HasBeenCreated, ResultValue {
    imageOrGifUrl?: string;
    recordResults?: boolean;
    resultType?: RecordType;
    useDefaultResult?: boolean;
}

export interface ExerciseWorkoutSettings extends Exercise {
    exerciseId?: string;
}

export interface ExerciseInProgress extends ExerciseWorkoutSettings {
    secondsRemaining: number;
    secondsElapsed: number;
    originalSecondsRemaining: number;
}
