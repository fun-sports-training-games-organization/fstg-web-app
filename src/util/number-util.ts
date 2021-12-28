import { AmountTypeAmountValue } from '../model/Basics.model';

export const addLeadingZero = (val: number): string => val.toString(10).padStart(2, '0');

export const getNumber = (val: string | number | undefined): number => {
    if (typeof val === 'number') {
        return val;
    } else if (typeof val === 'string') {
        return parseInt(val);
    }

    return 0;
};

export const getTotalReps = (entities: AmountTypeAmountValue[]): number => {
    return entities
        .filter((entity) => entity.amountType === 'COUNT_BASED')
        .map((entity) => getNumber(entity.amountValue))
        .reduce((a, b) => a + b, 0);
};
