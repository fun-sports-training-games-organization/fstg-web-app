import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logger from '../logging/logger';
import { InitialState } from '../reducers/authReducer';
import firebase from 'firebase';

interface StateProps {
    user: firebase.User | undefined;
}

const AuthRoute: FC = (props) => {
    const { user } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            user: state.user
        };
    });
    const { children } = props;
    if (!user) {
        logger.warn('no user found! redirecting to login page...');
        return <Redirect to={'/login'} />;
    }
    return <>{children}</>;
};
export default AuthRoute;
