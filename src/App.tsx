import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';
import { Box } from '@mui/system';
import HeaderBar from './components/organisms/HeaderBar';

function App(): JSX.Element {
    return (
        <Box>
            <HeaderBar />
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
        </Box>
    );
}

export default App;
