import { AmountTypeAmountValue, CreateAndModifyInfo, IdName, RecordType } from './Basics.model';

export interface Exercise extends IdName, CreateAndModifyInfo, AmountTypeAmountValue {
    imageOrGifUrl?: string;
    resultType?: RecordType;
    resultValue?: number;
    recordResults?: boolean;
    useDefaultResult?: boolean;
    defaultResult?: number;
}

export interface ExerciseWorkoutSettings extends Exercise {
    exerciseId?: string;
}
