import { CreateAndModifyInfo, IdName } from './basics';

export interface Exercise extends IdName, CreateAndModifyInfo {
    imageUrl?: string;
    defaultType?: string;
    defaultValue?: number;
    defaultResult?: number;
    defaultDistance?: number;
    defaultTargetSize?: number;
}
