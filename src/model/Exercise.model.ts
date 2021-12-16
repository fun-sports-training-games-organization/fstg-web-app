import { CreateAndModifyInfo, IdName } from './Basics.model';

export type RecordType = 'COUNT_BASED' | 'TIME_BASED';

export interface Exercise extends IdName, CreateAndModifyInfo {
    imageOrGifUrl?: string;
    amountType?: RecordType;
    amountValue?: number | string;
    resultType?: RecordType;
    resultValue?: number | string;
    recordResults?: boolean;
    useDefaultResult?: boolean;
    defaultResult?: number;
}

export interface ExerciseWorkoutSettings extends Exercise {
    exerciseId?: string;
}
