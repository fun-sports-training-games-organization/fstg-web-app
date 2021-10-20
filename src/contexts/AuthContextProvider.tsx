import React, { /*Dispatch, SetStateAction,*/ useEffect } from 'react';
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Loader from '../components/Loader';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export type AuthContextData = {
    // authenticated?: boolean;
    // setAuthenticated: Dispatch<SetStateAction<boolean | undefined>>;
    user: User | null;
    // setUser: Dispatch<SetStateAction<User | null>>;
    // isAdmin: boolean | undefined;
    // login: (username: string | undefined, password: string | undefined, resetForm: () => void) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const auth = getAuth();
    // const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);
    const [user, setUser] = useState<User | null>(null);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            // setAuthenticated(!!user);
            // if (user) {
            //     console.log(user);
            setUser(user);
            // }
            setPending(false);
        });
    }, [auth]);

    if (pending) {
        return <Loader />;
    }

    const logout = () => {
        // setAuthenticated(false);
        getAuth()
            .signOut()
            .then(() => {
                enqueueSnackbar(t('auth.message.logout.successful'), { variant: 'success' });
                setUser(null);
            })
            .catch(() => {
                enqueueSnackbar(t('auth.message.logout.failure'), { variant: 'error' });
            });
    };

    return (
        <AuthContext.Provider value={{ /*authenticated, setAuthenticated,*/ user, /* setUser,*/ logout }}>
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
