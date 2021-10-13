import React from 'react';
import './App.css';
import AuthContextProvider from './contexts/AuthContextProvider';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from './routes/Routes';
import AuthRoute from './routes/AuthRoute';

function App(): JSX.Element {
    return (
        <AuthContextProvider>
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
        </AuthContextProvider>
    );
}

export default App;
