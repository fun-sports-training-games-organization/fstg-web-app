import React from 'react';
// import logo from './assets/logo512.png';
import './App.css';
// import { Box, Typography } from '@material-ui/core';
import AuthContextProvider from './contexts/AuthContextProvider';
// import RegistrationPage from './pages/authentication/RegistrationPage';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';

function App(): JSX.Element {
    return (
        <AuthContextProvider>
            <div className="App">
                {/*<header className="App-header">*/}
                {/*    <img src={logo} className="App-logo" alt="logo" />*/}
                {/*    <Box mt={5}>*/}
                {/*        <Typography variant="h1">FSTG</Typography>*/}
                {/*    </Box>*/}
                {/*</header>*/}

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
            </div>
        </AuthContextProvider>
    );
}

export default App;
