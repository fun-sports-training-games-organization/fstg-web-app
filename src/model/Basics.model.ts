export type RecordType = 'COUNT_BASED' | 'TIME_BASED';

export interface Id {
    id?: string;
}

export interface IdName extends Id {
    name?: string;
}

export interface CreateInfo {
    createdUTCMilliseconds?: number;
    createdById?: string;
    createdByDisplayName?: string | null;
}

export interface ModifyInfo {
    lastModifiedUTCMilliseconds?: number;
    lastModifiedById?: string;
    lastModifiedByDisplayName?: string | null;
}

export interface CreateAndModifyInfo extends CreateInfo, ModifyInfo {}

export interface AmountTypeAmountValue {
    amountType?: RecordType;
    amountValue?: number;
}

export interface HasBeenCreated {
    hasBeenCreated: boolean;
}

export interface ResultValue {
    resultValue?: number;
}

export interface ExerciseId {
    exerciseId?: string;
}

export interface ResultType {
    resultType?: RecordType;
}

export interface SecondsElapsed {
    secondsElapsed: number;
}
