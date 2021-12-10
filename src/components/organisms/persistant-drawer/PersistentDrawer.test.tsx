import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';

import PersistentDrawer from './PersistentDrawer';
import { MenuListItem, PersistentDrawerProps } from './PersistentDrawer.types';
import { SnackbarProvider } from 'notistack';
import { MemoryRouter } from 'react-router-dom';
import { mockUser } from '../../../__mocks__/mockUserContext';
import userEvent from '@testing-library/user-event';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import i18n from '../../../i18n';
import { I18nextProvider } from 'react-i18next';

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
                <MemoryRouter>
                    <PersistentDrawer {...props}>{props.children}</PersistentDrawer>
                </MemoryRouter>
            </SnackbarProvider>
        );

    it('should render Persistent Drawer with unauthenticated status', () => {
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
        expect(screen.getByTestId('LanguageIcon')).toBeInTheDocument();
    });

    it('should render Persistent Drawer with mock user and clicking on menuIcon should bring up the side menu', async () => {
        props.user = mockUser;
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
        expect(screen.queryByTestId('LanguageIcon')).not.toBeInTheDocument();
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
        expect(screen.queryByTestId('LanguageIcon')).not.toBeInTheDocument();
        const menuIcon = await screen.findByTestId('MenuIcon');
        expect(menuIcon).toBeInTheDocument();
        menuIcon && userEvent.click(menuIcon);
        const closeIcon = await screen.findByTestId('CloseIcon');
        userEvent.click(closeIcon);
        expect(await screen.findByTestId('MenuIcon')).toBeVisible();
    });
});