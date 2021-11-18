import React, { useEffect } from 'react';
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    User
} from 'firebase/auth';
import Loader from '../components/Loader';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { auth } from '../config/firebase';
import { Facebook as FacebookIcon, Google as GoogleIcon, Twitter as TwitterIcon } from '@mui/icons-material';

interface Error {
    code: string;
    message: string;
}

export type Provider = 'google' | 'facebook' | 'twitter';
export type LoginProvider = {
    name: Provider;
    icon: React.ReactNode;
    color: string;
};

export const LoginProviders: LoginProvider[] = [
    { name: 'google', color: '#db4437', icon: <GoogleIcon /> },
    { name: 'facebook', color: '#3b5998', icon: <FacebookIcon /> },
    { name: 'twitter', color: '#55acee', icon: <TwitterIcon /> }
];

export type AuthContextData = {
    user: User | null;
    logout: () => void;
    loginWith: (provider: Provider) => void;
    loginWithEmail: (email: string, password: string) => void;
    registerWithEmail: (email: string, password: string) => void;
    sendResetPasswordLink: (email: string) => void;
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
    const firebase = useFirebase();
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setAuthenticating(false);
        });
    }, []);

    const loginFailed = (error: Error) => {
        // Handle Errors here.
        if (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            enqueueSnackbar(t('auth.message.login.failure', { errorCode, errorMessage }), { variant: 'error' });
        }
    };

    const loggedInSuccessfully = () => {
        history.push('/home');
        enqueueSnackbar(t('auth.message.login.successful'), { variant: 'success' });
    };

    const loginWith = (provider: Provider) => {
        firebase
            .login({
                provider,
                type: 'popup'
            })
            .then(loggedInSuccessfully)
            .catch(loginFailed);
    };

    const loginWithEmail = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then(loggedInSuccessfully).catch(loginFailed);
    };

    const registerWithEmail = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // logging.info(result);
                console.log(result);
                // setRegistering(false);
                history.push('/login');
            })
            .catch((error) => {
                const { code } = error;
                // 'auth/weak-password'
                if (code === 'auth/email-already-in-use') {
                    enqueueSnackbar('auth.message.registration.emailAlreadyExists', { variant: 'error' });
                } else {
                    enqueueSnackbar(t('auth.message.registration.failed', { code }), { variant: 'error' });
                }
            });
    };

    const sendResetPasswordLink = (email: string) => {
        sendPasswordResetEmail(auth, email)
            .then(() => enqueueSnackbar(t('auth.message.resetPassword.emailSent'), { variant: 'success' }))
            .catch(() => enqueueSnackbar(t('auth.message.resetPassword.emailSent'), { variant: 'success' }));
    };

    if (authenticating) {
        return <Loader />;
    }

    const logout = () => {
        firebase
            .logout()
            .then(() => {
                enqueueSnackbar(t('auth.message.logout.successful'), { variant: 'success' });
                setUser(null);
            })
            .catch(() => enqueueSnackbar(t('auth.message.logout.failure'), { variant: 'error' }));
    };

    return (
        <AuthContext.Provider
            value={{ user, loginWith, loginWithEmail, registerWithEmail, sendResetPasswordLink, loginFailed, logout }}
        >
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
