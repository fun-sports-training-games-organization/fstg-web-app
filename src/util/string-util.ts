export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getHasNotBeenCreated = (): string => 'hasNotBeenCreated';

export const hasBeenCreated = (id: string | undefined): boolean => {
    return id ? !id.includes(getHasNotBeenCreated()) : false;
};

export const hasNotBeenCreated = (id: string | undefined): boolean => {
    return !hasBeenCreated(id);
};
