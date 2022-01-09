import React from 'react';

function useStickyState<T>(defaultValue: T, key?: string): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = React.useState<T>(() => {
        const stickyValue = key && localStorage.getItem(key);
        return typeof stickyValue === 'string' ? JSON.parse(stickyValue) : defaultValue;
    });
    React.useEffect(() => {
        key && localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default useStickyState;
