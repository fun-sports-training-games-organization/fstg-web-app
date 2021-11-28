import { RecordType } from './ExerciseClass';

export interface Exercise {
    id?: string;
    name: string;
    imageOrGifUrl?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    amountType?: RecordType;
    amountValue?: number | string;
    resultType?: RecordType;
    resultValue?: number | string;
    recordResultsByDefault?: boolean;
    useDefaultResults?: boolean;
}
