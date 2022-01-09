import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import {
    getAuth,
    getRedirectResult,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    User
} from 'firebase/auth';
import Loader from '../components/atoms/loader/Loader';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { auth } from '../config/firebase';
import { Facebook as FacebookIcon, Google as GoogleIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import * as notification from '../util/notifications-util';
import * as navigate from '../util/navigation-util';

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
    user: Partial<User> | null;
    logout: () => void;
    loginWith: (provider: Provider) => void;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    registerWithEmail: (
        email?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        nickname?: string
    ) => Promise<void>;
    sendResetPasswordLink: (email: string) => Promise<void>;
    sendVerificationEmail: () => Promise<void>;
    loginFailed: (error: Error) => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthContextProvider: FC<PropsWithChildren<Record<string, unknown>>> = (
    props: PropsWithChildren<Record<string, unknown>>
) => {
    const [user, setUser] = useState<User | null>(null);
    const [authenticating, setAuthenticating] = useState<boolean>(true);
    const [newlyRegistered, setNewlyRegistered] = useState<boolean>(false);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const firebase = useFirebase();
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setAuthenticating(false);
        });
    }, [user]);

    const loginFailed = (error: Error) => {
        // Handle Errors here.
        if (error) {
            // here we want to obscure the error message without telling the user either the email or password are incorrect!
            if ('auth/invalid-email' === error.code || 'auth/wrong-password' === error.code) {
                notification.loginFailedWrongCredentials(enqueueSnackbar, t);
            } else {
                const errorCode = error.code;
                const errorMessage = error.message;
                notification.loginError(enqueueSnackbar, t, { errorCode, errorMessage });
            }
        }
    };

    const loggedInSuccessfully = () => {
        notification.loginSuccess(enqueueSnackbar, t);
        return navigate.toDashboard(history);
    };

    const loginWith = (provider: Provider) => {
        firebase
            .login({
                provider,
                type: 'popup'
            })
            .then(async () => {
                if (provider === 'facebook') {
                    await getRedirectRes();
                }
                loggedInSuccessfully();
            })
            .catch(loginFailed);
    };

    const getRedirectRes = async () => {
        await getRedirectResult(getAuth());
    };

    const loginWithEmail = async (email: string, password: string): Promise<void> => {
        await signInWithEmailAndPassword(auth, email, password).then(loggedInSuccessfully).catch(loginFailed);
    };

    const registerWithEmail = async (
        email?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        nickname?: string
    ): Promise<void> => {
        email &&
            password &&
            (await firebase
                .createUser({ email, password }, { ...(nickname && { nickname }), firstName, lastName })
                .then(() => {
                    notification.registrationSuccess(enqueueSnackbar, t);
                    setNewlyRegistered(true);
                    return navigate.toBase(history);
                })
                .catch((error) => {
                    const { code: errorCode, message: errorMessage } = error;
                    notification.registrationFailure(enqueueSnackbar, t, { errorCode, errorMessage });
                }));
    };

    const sendResetPasswordLink = async (email: string): Promise<void> => {
        await sendPasswordResetEmail(auth, email)
            .then(() => notification.passwordResetEmailSuccess(enqueueSnackbar, t))
            .catch(() => notification.passwordResetEmailError(enqueueSnackbar, t));
    };
    const sendVerificationEmail = async (): Promise<void> => {
        user &&
            (await sendEmailVerification(user)
                .then(() => notification.emailVerificationSentSuccess(enqueueSnackbar, t))
                .catch(() => notification.emailVerificationSentError(enqueueSnackbar, t)));
    };

    useEffect(() => {
        if (user && !user.emailVerified && newlyRegistered) {
            sendVerificationEmail();
            setNewlyRegistered(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, newlyRegistered]);

    if (authenticating) {
        return <Loader />;
    }

    const logout = () => {
        firebase
            .logout()
            .then(() => {
                notification.logoutSuccess(enqueueSnackbar, t);
                setUser(null);
            })
            .catch(() => notification.logoutError(enqueueSnackbar, t));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loginWith,
                loginWithEmail,
                registerWithEmail,
                sendResetPasswordLink,
                sendVerificationEmail,
                loginFailed,
                logout
            }}
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
