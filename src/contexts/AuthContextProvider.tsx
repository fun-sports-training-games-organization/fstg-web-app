import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';

export type AuthContextData = {
    authenticated?: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean | undefined>>;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    // isAdmin: boolean | undefined;
    // login: (username: string | undefined, password: string | undefined, resetForm: () => void) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    const auth = getAuth();
    const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            setAuthenticated(!!user);
            if (user) {
                console.log(user);
                setUser(user);
            }
        });
    }, [auth]);

    const logout = () => {
        setAuthenticated(false);
        getAuth().signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, user, setUser, logout }}>
            {props.children}
        </AuthContext.Provider>
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
