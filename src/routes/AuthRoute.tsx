import { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../config/firebase';
import logger from '../logging/logger';

const AuthRoute: FC = (props) => {
    const { children } = props;
    if (!auth.currentUser) {
        logger.warn('no user found! redirecting to login page...');
        return <Redirect to={'/login'} />;
    }
    return <>{children}</>;
};
export default AuthRoute;
