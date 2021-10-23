import React, { /*Dispatch, SetStateAction,*/ useEffect } from 'react';
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Loader from '../components/Loader';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { auth } from '../config/firebase';

interface Error {
    code: string;
    message: string;
}

export type AuthContextData = {
    user: User | null;
    logout: () => void;
    loggedInSuccessfully: () => void;
    loginFailed: (error: Error) => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    const [user, setUser] = useState<User | null>(null);
    const [authenticating, setAuthenticating] = useState<boolean>(true);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const loginFailed = (error: Error) => {
        // Handle Errors here.
        if (error) {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            enqueueSnackbar(t('auth.message.login.failure', { errorCode, errorMessage }), { variant: 'error' });
        }
    };

    const loggedInSuccessfully = () => {
        // The signed-in user info.
        history.push('/home');
        enqueueSnackbar(t('auth.message.login.successful'), { variant: 'success' });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setAuthenticating(false);
        });
    }, []);

    if (authenticating) {
        return <Loader />;
    }

    const logout = () => {
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
        <AuthContext.Provider value={{ user, loggedInSuccessfully, loginFailed, logout }}>
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
