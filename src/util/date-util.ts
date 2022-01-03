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
    return formatSecondsValueInHoursMinutesAndSeconds(totalWorkoutSeconds);
};

export const formatSecondsValueInHoursMinutesAndSeconds = (secondsValue: number): string => {
    const formattedWorkoutHours = secondsValue >= 3600 ? `${addLeadingZero(Math.floor(secondsValue / 3600))}:` : '';
    const formattedWorkoutMinutes = secondsValue >= 60 ? addLeadingZero(Math.floor(secondsValue / 60)) : '0';
    const formattedWorkoutSeconds = addLeadingZero(secondsValue % 60);
    return `${formattedWorkoutHours}${formattedWorkoutMinutes}:${formattedWorkoutSeconds}`;
};
