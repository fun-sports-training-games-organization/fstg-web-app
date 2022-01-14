import { FC } from 'react';
import { Redirect, Route, /* Route,*/ RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';

// eslint-disable-next-line unused-imports/no-unused-vars
const AuthRoute: FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
    const { user } = useAuth();
    return user ? <Route {...rest} /> : <Redirect to={'/login'} />;
};
export default AuthRoute;
