import { IdName } from './basics';

export interface ExerciseWorkoutSettings extends IdName {
    exerciseId?: string;
    amountType: TypeOptions;
    amount?: number;
    recordResults: boolean;
    resultType: TypeOptions;
    useDefaultResult: boolean;
    defaultResult?: number;
}

export type TypeOptions = 'number' | 'time';
