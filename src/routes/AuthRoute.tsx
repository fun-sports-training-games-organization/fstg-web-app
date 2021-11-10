import { User, UserCredential } from 'firebase/auth';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InitialState } from '../reducers/authReducer';

interface StateProps {
    user?: User | UserCredential;
}

const AuthRoute: FC = (props) => {
    const { user } = useSelector<InitialState, StateProps>((state: InitialState) => {
        return {
            user: state.user
        };
    });
    console.log(user);

    const { children } = props;
    if (!user) {
        return <Redirect to={'/login'} />;
    }
    return <>{children}</>;
};
export default AuthRoute;
