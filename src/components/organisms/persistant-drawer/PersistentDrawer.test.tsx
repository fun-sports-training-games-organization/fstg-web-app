import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';

import PersistentDrawer from './PersistentDrawer';
import { MenuListItem, PersistentDrawerProps } from './PersistentDrawer.types';
import { SnackbarProvider } from 'notistack';
import { MemoryRouter } from 'react-router-dom';
import { mockUser } from '../../../__mocks__/mockUserContext';
import userEvent from '@testing-library/user-event';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key })
}));

jest.mock(
    '../../../assets/fstg-logo-35x35.png',
    () => 'https://icon-library.com/images/icon-running-man/icon-running-man-24.jpg'
);

describe('<PersistentDrawer> component test with React Testing Library', () => {
    let props: PersistentDrawerProps;
    const onClick = jest.fn();
    const topMenuListItems: MenuListItem[] = [
        { key: 'home', text: 'Home', icon: 'home', path: '/home' },
        { key: 'dashboard', text: 'Dashboard', icon: 'dashboard', path: '/dashboard', onClick },
        { key: 'exercises', text: 'Exercises', icon: <FitnessCenterIcon />, path: '/exercises' },
        { key: 'workouts', text: 'Workouts', icon: 'directions_run', path: '/workouts' }
    ];

    const bottomMenuListItems: MenuListItem[] = [
        { key: 'profile', text: 'Profile', icon: 'person', path: '/profile' },
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
                <MemoryRouter>
                    <ThemeProvider theme={createTheme()}>
                        <PersistentDrawer {...props}>{props.children}</PersistentDrawer>
                    </ThemeProvider>
                </MemoryRouter>
            </SnackbarProvider>
        );

    it('should render Persistent Drawer with unauthenticated status', () => {
        const { container } = renderComponent();
        expect(container).toHaveTextContent('Main Content');
    });

    it('should render Persistent Drawer with mock user and clicking on menuIcon should bring up the side menu', async () => {
        props.user = mockUser;
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
        const menuIcon = await screen.findByTestId('MenuIcon');
        expect(menuIcon).toBeInTheDocument();
        menuIcon && userEvent.click(menuIcon);
        for (const menuItem of topMenuListItems) {
            menuItem.text && expect(await screen.findByText(menuItem.text)).toBeVisible();
        }
        for (const menuItem of bottomMenuListItems) {
            menuItem.text && expect(await screen.findByText(menuItem.text)).toBeVisible();
        }
        userEvent.click(await screen.findByText('Dashboard'));
        expect(await screen.findByTestId('MenuIcon')).toBeVisible();
        expect(onClick).toBeCalledTimes(1);
    });

    it('should render Persistent Drawer with mock user and test menu close button', async () => {
        props.user = mockUser;
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
        const menuIcon = await screen.findByTestId('MenuIcon');
        expect(menuIcon).toBeInTheDocument();
        menuIcon && userEvent.click(menuIcon);
        const closeIcon = await screen.findByTestId('CloseIcon');
        userEvent.click(closeIcon);
        expect(await screen.findByTestId('MenuIcon')).toBeVisible();
    });
});
