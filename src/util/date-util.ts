import { AmountTypeAmountValue } from '../model/Basics.model';
import { addLeadingZero, getNumber } from './number-util';

export const getDurationFromDate = (_date: unknown): string => {
    const date = new Date(_date as string);
    return `${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
};

export const getFormattedTotalWorkoutTime = (entities: AmountTypeAmountValue[]): string => {
    const getTotalWorkoutSeconds = (): number => {
        return entities
            .map((entity) => (entity.amountType === 'TIME_BASED' ? getNumber(entity.amountValue) : 0))
            .reduce((a, b) => a + b, 0);
    };
    const totalWorkoutSeconds = getTotalWorkoutSeconds();
    const formattedWorkoutHours =
        totalWorkoutSeconds >= 3600 ? `${addLeadingZero(Math.floor(totalWorkoutSeconds / 3600))}:` : '';
    const formattedWorkoutMinutes =
        totalWorkoutSeconds >= 60 ? addLeadingZero(Math.floor(totalWorkoutSeconds / 60)) : '0';
    const formattedWorkoutSeconds = addLeadingZero(totalWorkoutSeconds % 60);
    return `${formattedWorkoutHours}${formattedWorkoutMinutes}:${formattedWorkoutSeconds}`;
};
