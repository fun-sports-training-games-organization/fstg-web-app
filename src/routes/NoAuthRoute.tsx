import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';

const NoAuthRoute: FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
    const { user } = useAuth();
    return user ? <Redirect to={'/dashboard'} /> : <Route {...rest} />;
};
export default NoAuthRoute;
