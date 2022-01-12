import React from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import { ResponsiveDrawerProps } from './ResponsiveDrawer.types';
import { mockUser } from '../../../__mocks__/mockUserContext';
import { AuthContext } from '../../../contexts/AuthContextProvider';
import { SnackbarProvider } from 'notistack';
import ThemeContextProvider from '../../../contexts/ThemeContextProvider';

export default {
    title: 'organisms/ResponsiveDrawer',
    component: ResponsiveDrawer,
    args: {
        topMenuListItems: [
            { key: 'home', text: 'Home', icon: 'home', path: '/home' },
            { key: 'dashboard', text: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
            { key: 'exercises', text: 'Exercises', icon: 'fitness_center', path: '/exercises' },
            { key: 'workouts', text: 'Workouts', icon: 'directions_run', path: '/workouts' }
        ],
        bottomMenuListItems: [
            { key: 'profile', text: 'Profile', icon: 'person', path: '/profile' },
            { key: 'logout', text: 'Logout', icon: 'logout', onClick: () => console.log('logout clicked') }
        ],
        user: mockUser,
        logout: () => console.log('logout clicked!')
    }
};

export const Drawer = (args: ResponsiveDrawerProps & { authenticated: boolean }): JSX.Element => {
    return (
        <ThemeContextProvider>
            <SnackbarProvider>
                <AuthContext.Provider
                    value={{
                        user: args.authenticated ? mockUser : null,
                        loginWith: () => console.log(''),
                        loginWithEmail: async () => console.log(''),
                        registerWithEmail: async () => console.log(''),
                        sendResetPasswordLink: async () => console.log(''),
                        sendVerificationEmail: async () => console.log(''),
                        loginFailed: () => console.log(''),
                        logout: () => console.log('')
                    }}
                >
                    <ResponsiveDrawer {...args}>
                        <>Main Content</>
                    </ResponsiveDrawer>
                </AuthContext.Provider>
            </SnackbarProvider>
        </ThemeContextProvider>
    );
};

Drawer.args = { authenticated: true };
