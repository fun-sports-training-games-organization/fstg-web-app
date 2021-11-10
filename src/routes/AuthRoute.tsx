import { User } from 'firebase/auth';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootReducerState } from '../reducers/authReducer';

const AuthRoute: FC = (props) => {
    const user = useSelector<RootReducerState, User | undefined>((state: RootReducerState) => {
        return state.rootReducer.user;
    });

    const { children } = props;
    if (!user) {
        return <Redirect to={'/login'} />;
    }
    return <>{children}</>;
};
export default AuthRoute;
