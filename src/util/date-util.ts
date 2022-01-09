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

export const formatSecondsValueInHoursMinutesAndSeconds = (
    secondsValue: number,
    showZeroWhenNegative = true
): string => {
    if (showZeroWhenNegative && secondsValue < 0) {
        return '0:00';
    }
    const formattedWorkoutHours = secondsValue >= 3600 ? `${addLeadingZero(Math.floor(secondsValue / 3600))}:` : '';
    const formattedWorkoutMinutes = secondsValue >= 60 ? addLeadingZero(Math.floor(secondsValue / 60)) : '0';
    const formattedWorkoutSeconds = addLeadingZero(secondsValue % 60);
    return `${formattedWorkoutHours}${formattedWorkoutMinutes}:${formattedWorkoutSeconds}`;
};

/**
 *
 * @param date the date string to be returned as a [[`Date`]] object with a specified locale (default 'de-CH').
 * @param locale locale string to define the date's locale (default 'de-CH')
 * @return date object with the given locale (default 'de-CH').
 */
export const convertStringToDateWithLocale = (date?: string | Date | null, locale = 'de-CH'): string => {
    return date ? new Date(date).toLocaleDateString(locale) : '';
};

/**
 * @param date The date string to be returned as a {@link Date} object
 * @return Date object or undefined
 */
export const convertStringToDate = (date?: string | Date): Date | undefined => {
    return date ? new Date(date) : undefined;
};

type FirebaseTimestamp = {
    seconds: number;
    nanoseconds: number;
};

export const getAge = (date: string | FirebaseTimestamp): number => {
    const today = new Date();
    const birthDate = typeof date === 'string' ? new Date(date) : new Date(date.seconds * 1000);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const convertFirebaseDateObjectToDateString = (firebaseDateObject: string | FirebaseTimestamp): string => {
    return typeof firebaseDateObject === 'string'
        ? firebaseDateObject
        : new Date(firebaseDateObject.seconds * 1000).toDateString();
};

// export const daysInMilliseconds = (numberOfDays: number): number => {
//     return numberOfDays > 0 ? numberOfDays + 1000 * 60 * 60 * 24 * 2 * 365 : NaN;
// };
//
// export const yearsInMilliseconds = (numberOfYears: number): number => {
//     return numberOfYears > 0 ? numberOfYears * daysInMilliseconds(1) : NaN;
// };
//
// export const xYearsAgo = (x: number): Date => {
//     const today = new Date();
//     const yearsAgo = today.getMilliseconds() - yearsInMilliseconds(x);
//     return new Date(yearsAgo);
// };
