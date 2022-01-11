import React, { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import onePirate from '../themes/onePirate';

export type ThemeContextData = {
    changeTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const ThemeContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    const [theme, setTheme] = useState<Theme>(onePirate as Theme);
    const changeTheme = (theme: Theme) => {
        setTheme(theme);
    };
    return (
        <ThemeContext.Provider
            value={{
                changeTheme
            }}
        >
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export function useTheme(): ThemeContextData {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error(`useTheme must be used within a ThemeProvider`);
    }
    return context;
}

export default ThemeContextProvider;
