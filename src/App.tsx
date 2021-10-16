import React from 'react';
import './App.css';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import LanguageMenu from './components/LanguageMenu';
import { Box } from '@mui/system';
import { useAuth } from './contexts/AuthContextProvider';

function App(): JSX.Element {
    const { authenticated, logout } = useAuth();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}></Box>
                {authenticated && (
                    <IconButton onClick={logout}>
                        <LogoutIcon style={{ color: 'white' }} />
                    </IconButton>
                )}
                <LanguageMenu />
            </Toolbar>
            <div className="App">
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
        </AppBar>
    );
}

export default App;
