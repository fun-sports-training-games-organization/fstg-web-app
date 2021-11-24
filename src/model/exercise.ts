import { IdName } from './basics';

export interface Exercise extends IdName {
    imageOrGif?: any;
    defaultType?: string;
    defaultValue?: number;
    defaultResult?: number;
    defaultDistance?: number;
    defaultTargetSize?: number;
}
