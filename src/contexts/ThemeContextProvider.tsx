import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import onePirate from '../themes/onePirate';
import { themes } from '../config/themes';
import useStickyState from '../hooks/useStickyState';

export type ThemeContextData = {
    changeTheme: (themeName: string) => void;
};

export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const ThemeContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    // we can eventually save this to the user's account in firebase!
    const [themeName, setThemeName] = useStickyState<string>('onePirate', 'fstg.theme.name');
    const [theme, setTheme] = useState<Theme>(onePirate as Theme);
    const changeTheme = (themeName: string) => {
        setThemeName(themeName);
    };
    useEffect(() => {
        const theme = themes.filter((theme) => theme.key === themeName).map((theme) => theme.value)[0];
        theme && setTheme(theme);
    }, [themeName]);
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
