import React from 'react';
import PersistentDrawer from './PersistentDrawer';
import { PersistentDrawerProps } from './PersistentDrawer.types';
import { mockUser } from '../../../__mocks__/mockUserContext';
import { AuthContext } from '../../../contexts/AuthContextProvider';
import { SnackbarProvider } from 'notistack';

export default {
    title: 'organisms/PersistentDrawer',
    component: PersistentDrawer,
    args: {
        topMenuListItems: [
            { key: 'home', text: 'Home', icon: 'home', path: '/home' },
            { key: 'dashboard', text: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
            { key: 'exercises', text: 'Exercises', icon: 'fitness_center', path: '/exercises' },
            { key: 'workouts', text: 'Workouts', icon: 'directions_run', path: '/workouts' }
        ],
        bottomMenuListItems: [
            { key: 'profile', text: 'Account', icon: 'person', path: '/profile' },
            { key: 'logout', text: 'Logout', icon: 'logout', onClick: () => console.log('logout clicked') }
        ],
        user: mockUser,
        logout: () => console.log('logout clicked!')
    }
};

export const Drawer = (args: PersistentDrawerProps & { authenticated: boolean }): JSX.Element => {
    return (
        <SnackbarProvider>
            <AuthContext.Provider
                value={{
                    user: args.authenticated ? mockUser : null,
                    loginWith: () => console.log(''),
                    loginWithEmail: async () => console.log(''),
                    registerWithEmail: async () => console.log(''),
                    sendResetPasswordLink: async () => console.log(''),
                    loginFailed: () => console.log(''),
                    logout: () => console.log('')
                }}
            >
                <PersistentDrawer {...args}>
                    <>Main Content</>
                </PersistentDrawer>
            </AuthContext.Provider>
        </SnackbarProvider>
    );
};

Drawer.args = { authenticated: true };
