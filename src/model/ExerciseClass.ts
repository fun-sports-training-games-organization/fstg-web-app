// export interface Exercise {
//     id?: string;
//     name: string;
//     imageOrGif?: any;
//     defaultType?: string;
//     defaultValue?: number;
//     defaultResult?: number;
//     defaultDistance?: number;
//     defaultTargetSize?: number;
// }

export type RecordType = 'COUNT_BASED' | 'TIME_BASED';

class Exercise {
    constructor(
        public id?: string,
        public name = '',
        public imageOrGif = '',
        public defaultType: RecordType = 'COUNT_BASED',
        public defaultValue: number | string = 0,
        public recordResultByDefault = false,
        public defaultResultType: RecordType = 'COUNT_BASED',
        public useDefaultResult = false,
        public defaultResultValue: number | string = 0
    ) {}
}

export default Exercise;
