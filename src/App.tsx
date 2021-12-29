import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';
import { Box } from '@mui/system';
import PersistentDrawer from './components/organisms/persistant-drawer/PersistentDrawer';
import { MenuListItem } from './components/organisms/persistant-drawer/PersistentDrawer.types';
import { useAuth } from './contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import { Theme, useMediaQuery } from '@mui/material';
import useEntityManager from './hooks/useEntityManager';
import { UserProfile } from './pages/account/Account';
import useFileManager from './hooks/useFileManager';

function App(): JSX.Element {
    const { logout, user } = useAuth();
    const { findById } = useEntityManager<UserProfile>('users', false);
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
                    fileManager
                        .getFileURL(`profile_pictures/${user.uid}/${userProfile?.profilePicturePath}`)
                        .then((url) => {
                            setPhotoURL(url);
                        });
                });
        }
    }, [user, findById, fileManager]);

    const topMenuListItems: MenuListItem[] = [
        { key: 'home', text: t('nav.home'), icon: 'home', path: '/home' },
        { key: 'dashboard', text: t('nav.dashboard'), icon: 'dashboard', path: '/dashboard' },
        { key: 'exercises', text: t('nav.exercises'), icon: 'fitness_center', path: '/exercises' },
        { key: 'workouts', text: t('nav.workouts'), icon: 'directions_run', path: '/workouts' }
    ];

    const bottomMenuList: MenuListItem[] | undefined = smDown
        ? [
              { key: 'profile', text: t('nav.account'), icon: 'person', path: '/account' },
              { key: 'logout', text: t('nav.logout'), icon: 'logout', onClick: () => logout() }
          ]
        : undefined;
    return (
        <Box>
            <PersistentDrawer
                photoURL={photoURL}
                user={user ? user : undefined}
                logout={logout}
                topMenuListItems={topMenuListItems}
                bottomMenuListItems={bottomMenuList}
            >
                <Switch>
                    {routes.map((route, index) => {
                        return route.protected ? (
                            <AuthRoute key={index} path={route.path} exact={route.exact}>
                                <route.component />
                            </AuthRoute>
                        ) : (
                            <Route key={index} path={route.path} exact={route.exact}>
                                <route.component />
                            </Route>
                        );
                    })}
                </Switch>
            </PersistentDrawer>
        </Box>
    );
}

export default App;
