import { CreateAndModifyInfo, IdName } from './basics';

export interface ExerciseWorkoutSettings extends IdName, CreateAndModifyInfo {
    exerciseId?: string;
    amountType: TypeOptions;
    amount?: number;
    recordResults: boolean;
    resultType: TypeOptions;
    useDefaultResult: boolean;
    defaultResult?: number;
}

export type TypeOptions = 'number' | 'time';
