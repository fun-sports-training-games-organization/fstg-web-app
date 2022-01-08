import {
    AmountTypeAmountValue,
    CreateAndModifyInfo,
    IdName,
    HasBeenCreated,
    ResultValue,
    ExerciseId,
    ResultType,
    SecondsElapsed
} from './Basics.model';

export interface Exercise
    extends IdName,
        CreateAndModifyInfo,
        AmountTypeAmountValue,
        HasBeenCreated,
        ResultValue,
        ResultType {
    imageOrGifUrl?: string;
    recordResults?: boolean;
    useDefaultResult?: boolean;
}

export interface ExerciseWorkoutSettings extends Exercise, ExerciseId {}

export interface ExerciseInProgress extends ExerciseWorkoutSettings, SecondsElapsed {
    secondsRemaining: number;
    originalSecondsRemaining: number;
}

export interface ExerciseResult
    extends IdName,
        AmountTypeAmountValue,
        ResultValue,
        ResultType,
        ExerciseId,
        SecondsElapsed {}
