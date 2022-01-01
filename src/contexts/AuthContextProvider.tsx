import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, User } from 'firebase/auth';
import Loader from '../components/atoms/loader/Loader';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { auth } from '../config/firebase';
import { Google as GoogleIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { RegistrationErrorState } from '../components/pages/authentication/registration-form/RegistrationForm';
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
    // { name: 'facebook', color: '#3b5998', icon: <FacebookIcon /> },
    { name: 'twitter', color: '#55acee', icon: <TwitterIcon /> }
];

export type AuthContextData = {
    user: Partial<User> | null;
    logout: () => void;
    loginWith: (provider: Provider) => void;
    loginWithEmail: (email: string, password: string) => void;
    registerWithEmail: (
        email?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        username?: string
    ) => void;
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
        // console.log('user loaded...');
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setAuthenticating(false);
        });
    }, []);

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
        navigate.toDashboard(history);
        notification.loginSuccess(enqueueSnackbar, t);
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

    const registerWithEmail = async (
        email?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        username?: string
    ) => {
        email &&
            password &&
            firebase
                .createUser({ email, password }, { username, firstName, lastName })
                .then(() => {
                    navigate.toBase(history);
                    // console.log(`Provier ID: ${user.providerId}`);
                    // console.log(`UUID: ${user.uid}`);
                })
                .catch(console.error);
    };

    const sendResetPasswordLink = (email: string) => {
        sendPasswordResetEmail(auth, email)
            .then(() => notification.passwordResetEmailSuccess(enqueueSnackbar, t))
            .catch(() => notification.passwordResetEmailError(enqueueSnackbar, t));
    };

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
