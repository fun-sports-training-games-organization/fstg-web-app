import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';

const AuthRoute: FC = (props) => {
    const { user } = useAuth();
    const { children } = props;
    if (!user) {
        return <Redirect to={'/login'} />;
    }
    return <>{children}</>;
};
export default AuthRoute;
