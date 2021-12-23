export const addLeadingZero = (val: number): string => val.toString(10).padStart(2, '0');

export const getNumber = (val: string | number | undefined): number => {
    if (typeof val === 'number') {
        return val;
    } else if (typeof val === 'string') {
        return parseInt(val);
    }

    return 0;
};
