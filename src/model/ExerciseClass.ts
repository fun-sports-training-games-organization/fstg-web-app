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

export type RecordType = 'CountBased' | 'TimeBased';

export type RecordValue = {
    record: number | string; // number is count-based, and string is time-based
};

class Exercise {
    constructor(
        public id?: string,
        public name = '',
        public imageOrGif = '',
        public defaultType: RecordType = 'CountBased',
        public defaultValue: number | string = 0,
        public recordResultByDefault = false,
        public defaultResultType: RecordType = 'CountBased',
        public useDefaultResult = false,
        public defaultResultValue: number | string = 0
    ) {}

    public getInputType(fieldName: string): string {
        return fieldName === 'name' ? 'string' : 'number';
    }
}

export default Exercise;
