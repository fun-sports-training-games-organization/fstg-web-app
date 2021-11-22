export interface ExerciseWorkoutSettings {
    id?: string;
    exerciseId?: string;
    name?: string;
    amountType: TypeOptions;
    amount?: number;
    recordResults: boolean;
    resultType: TypeOptions;
    useDefaultResult: boolean;
    defaultResult?: number;
}

export type TypeOptions = 'number' | 'time';
