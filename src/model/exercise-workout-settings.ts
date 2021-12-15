import { RecordType } from './ExerciseClass';
import { CreateAndModifyInfo, IdName } from './basics';

export interface ExerciseWorkoutSettings extends IdName, CreateAndModifyInfo {
    exerciseId?: string;
    amountType: RecordType;
    amount?: number;
    recordResults: boolean;
    resultType: RecordType;
    useDefaultResult: boolean;
    defaultResult?: number;
}
