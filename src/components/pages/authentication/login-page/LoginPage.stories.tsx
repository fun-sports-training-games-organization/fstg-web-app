import React, { Suspense } from 'react';
import { Meta } from '@storybook/react';
import LoginPage from './LoginPage';
import AuthContextProvider from '../../../../contexts/AuthContextProvider';
import { SnackbarProvider } from 'notistack';
import Loader from '../../../atoms/loader/Loader';
import { Provider } from 'react-redux';
import { store } from '../../../../config/firebase';

export default {
    title: 'pages/LoginPage',
    component: LoginPage
} as Meta;

export const loginPage = (): JSX.Element => (
    <Suspense fallback={<Loader />}>
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
        >
            <Provider store={store}>
                <AuthContextProvider>
                    <LoginPage />
                </AuthContextProvider>
            </Provider>
        </SnackbarProvider>
    </Suspense>
);
