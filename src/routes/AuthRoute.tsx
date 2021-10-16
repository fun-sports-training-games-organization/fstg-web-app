import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import logger from '../logging/logger';
import { useAuth } from '../contexts/AuthContextProvider';

const AuthRoute: FC = (props) => {
    const { user, authenticated } = useAuth();
    const { children } = props;
    if (!authenticated) {
        console.log(authenticated);
        // auth.currentUser?.delete();
        console.log(user);
        logger.warn('no user found! redirecting to login page...');
        return <Redirect to={'/login'} />;
    }
    return <>{children}</>;
};
export default AuthRoute;
