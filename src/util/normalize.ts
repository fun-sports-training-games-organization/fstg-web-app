export const name = (value: string): string => value && value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
export const lower = (value: string): string => value && value.toLowerCase();
export const upper = (value: string): string => value && value.toUpperCase();
