import React from 'react';
import { render } from '@testing-library/react';

import PersistentDrawer from './PersistentDrawer';
import { MenuListItem, PersistentDrawerProps } from './PersistentDrawer.types';
import AuthContextProvider from '../../../contexts/AuthContextProvider';
import { SnackbarProvider } from 'notistack';

jest.mock('firebase/app', () => {
    return {
        auth: jest.fn()
    };
});
describe('<PersistentDrawer> component test with React Testing Library', () => {
    let props: PersistentDrawerProps;
    const topMenuListItems: MenuListItem[] = [
        { key: 'home', text: 'Home', icon: 'home', path: '/home' },
        { key: 'dashboard', text: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { key: 'exercises', text: 'Exercises', icon: 'fitness_center', path: '/exercises' },
        { key: 'workouts', text: 'Workouts', icon: 'directions_run', path: '/workouts' }
    ];

    const bottomMenuListItems: MenuListItem[] = [
        { key: 'account', text: 'Account', icon: 'person', path: '/account' },
        { key: 'logout', text: 'Logout', icon: 'logout', onClick: jest.fn() }
    ];
    const children = <>Main Content</>;

    beforeEach(() => {
        props = {
            topMenuListItems,
            bottomMenuListItems,
            children
        };
    });

    const renderComponent = () =>
        render(
            <SnackbarProvider>
                <AuthContextProvider>
                    <PersistentDrawer {...props}>{props.children}</PersistentDrawer>
                </AuthContextProvider>
            </SnackbarProvider>
        );

    it('should render Persistent Drawer without crashing', () => {
        const { container, debug } = renderComponent();
        debug();
        expect(container).toBeInTheDocument();
    });
});
