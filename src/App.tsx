import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';
import { Box } from '@mui/system';
import PersistentDrawer from './components/organisms/persistant-drawer/PersistentDrawer';
import { MenuListItem } from './components/organisms/persistant-drawer/PersistentDrawer.types';

function App(): JSX.Element {
    const topMenuListItems: MenuListItem[] = [
        { key: 'home', text: 'Home', icon: 'home', path: '/home' },
        { key: 'dashboard', text: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { key: 'exercises', text: 'Exercises', icon: 'fitness_center', path: '/exercises' },
        { key: 'workouts', text: 'Workouts', icon: 'directions_run', path: '/workouts' }
    ];

    const bottomMenuList: MenuListItem[] = [
        { key: 'account', text: 'Account', icon: 'person', path: '/account' },
        { key: 'logout', text: 'Logout', icon: 'logout', path: '/logout' }
    ];
    return (
        <Box>
            {/*<HeaderBar />*/}
            <PersistentDrawer topMenuListItems={topMenuListItems} bottomMenuListItems={bottomMenuList}>
                <Switch>
                    {routes.map((route, index) => {
                        // <Route
                        //     key={index}
                        //     path={route.path}
                        //     exact={route.exact}
                        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        //     render={(routeProps: RouteComponentProps<any>) => {
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
