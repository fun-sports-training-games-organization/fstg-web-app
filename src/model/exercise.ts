import { CreateAndModifyInfo, IdName } from './basics';
import { RecordType } from './ExerciseClass';

export interface Exercise extends IdName, CreateAndModifyInfo {
    id?: string;
    name: string;
    imageOrGifUrl?: string;
    amountType?: RecordType;
    amountValue?: number | string;
    resultType?: RecordType;
    resultValue?: number | string;
    recordResultsByDefault?: boolean;
    useDefaultResults?: boolean;
}
