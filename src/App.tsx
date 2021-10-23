import React from 'react';
import './App.css';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';
import { Box } from '@mui/system';
import HeaderBar from './components/HeaderBar';

function App(): JSX.Element {
    return (
        <Box>
            <HeaderBar />
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        render={(routeProps: RouteComponentProps<any>) => {
                            return route.protected ? (
                                <AuthRoute>
                                    <route.component {...routeProps} />
                                </AuthRoute>
                            ) : (
                                <route.component {...routeProps} />
                            );
                        }}
                    />
                ))}
            </Switch>
        </Box>
    );
}

export default App;
