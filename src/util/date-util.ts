export const getDurationFromDate = (_date: unknown): string => {
    const date = new Date(_date as string);
    return `${date?.getMinutes().toString().padStart(2, '0')}:${date?.getSeconds().toString().padStart(2, '0')}`;
};
