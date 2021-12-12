import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';
import { Box } from '@mui/system';
import PersistentDrawer from './components/organisms/persistant-drawer/PersistentDrawer';
import { MenuListItem } from './components/organisms/persistant-drawer/PersistentDrawer.types';
import { useAuth } from './contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';

function App(): JSX.Element {
    const { logout, user } = useAuth();
    const { t } = useTranslation();

    const topMenuListItems: MenuListItem[] = [
        { key: 'home', text: t('nav.home'), icon: 'home', path: '/home' },
        { key: 'dashboard', text: t('nav.dashboard'), icon: 'dashboard', path: '/dashboard' },
        { key: 'exercises', text: t('nav.exercises'), icon: 'fitness_center', path: '/exercises' },
        { key: 'workouts', text: t('nav.workouts'), icon: 'directions_run', path: '/workouts' }
    ];

    const bottomMenuList: MenuListItem[] = [
        { key: 'account', text: t('nav.account'), icon: 'person', path: '/account' },
        { key: 'logout', text: t('nav.logout'), icon: 'logout', onClick: () => logout() }
    ];
    return (
        <Box>
            <PersistentDrawer
                user={user ? user : undefined}
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
