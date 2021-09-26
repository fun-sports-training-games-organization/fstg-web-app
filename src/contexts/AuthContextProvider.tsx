import React from 'react';
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

export type AuthContextData = {
    authenticated: boolean | undefined;
    isAdmin: boolean | undefined;
    login: (username: string | undefined, password: string | undefined, resetForm: () => void) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
    const login = async (
        username: string | undefined,
        password: string | undefined,
        resetForm: () => void
    ): Promise<void> => {
        // TODO: this is unused at the moment... we can still discuss whether or not to use context provider or reducer to store user information
        setAuthenticated(true);
        setIsAdmin(true);
        resetForm();
    };

    const logout = () => {
        // TODO : logout with firebase
    };

    return (
        <AuthContext.Provider value={{ authenticated, isAdmin, login, logout }}>{props.children}</AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`);
    }
    return context;
}

export default AuthContextProvider;
