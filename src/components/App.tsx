import React, { useEffect, useState } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import routes from '../routes/Routes';
import { Box } from '@mui/system';
import ResponsiveDrawer from './organisms/responsive-drawer/ResponsiveDrawer';
import { MenuListItem } from './organisms/responsive-drawer/ResponsiveDrawer.types';
import { useAuth } from '../contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import { Theme, useMediaQuery } from '@mui/material';
import useEntityManager from '../hooks/useEntityManager';
import useFileManager from '../hooks/useFileManager';
import { ProfileState } from '../reducers/profile-reducer';
import ErrorBoundary from './pages/error/ErrorBoundary';

function App(): JSX.Element {
    const { logout, user } = useAuth();
    const { findById } = useEntityManager<ProfileState>('users', false);
    const fileManager = useFileManager<File>('profile_pictures');
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [photoURL, setPhotoURL] = useState<string>();

    const { t } = useTranslation();

    useEffect(() => {
        if (user?.photoURL) {
            setPhotoURL(user.photoURL);
        } else {
            user?.uid &&
                findById(user?.uid).then((userProfile) => {
                    if (userProfile.profilePicturePath) {
                        fileManager
                            .getFileURL(`profile_pictures/${user.uid}/${userProfile?.profilePicturePath}`)
                            .then((url) => {
                                setPhotoURL(url);
                            });
                    }
                });
        }
    }, [user, findById, fileManager]);

    const topMenuListItems: MenuListItem[] = [
        { key: 'dashboard', text: t('nav.dashboard'), icon: 'dashboard', path: '/dashboard' },
        { key: 'exercises', text: t('nav.exercises'), icon: 'fitness_center', path: '/exercises' },
        { key: 'workouts', text: t('nav.workouts'), icon: 'directions_run', path: '/workouts' },
        { key: 'statistics', text: t('nav.statistics'), icon: 'insights', path: '/statistics' }
    ];

    const bottomMenuList: MenuListItem[] | undefined = smDown
        ? [
              { key: 'profile', text: t('nav.profile'), icon: 'person', path: '/profile' },
              { key: 'logout', text: t('nav.logout'), icon: 'logout', onClick: () => logout() }
          ]
        : undefined;
    return (
        <Box>
            <ResponsiveDrawer
                photoURL={photoURL}
                user={user ? user : undefined}
                logout={logout}
                topMenuListItems={topMenuListItems}
                bottomMenuListItems={bottomMenuList}
            >
                <ErrorBoundary>
                    <Switch>
                        {routes.map(({ Route, key, path, exact, component }) => (
                            <Route key={key} path={path} exact={exact} component={component} />
                        ))}
                    </Switch>
                </ErrorBoundary>
            </ResponsiveDrawer>
        </Box>
    );
}

export default App;
