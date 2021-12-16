import { FC } from 'react';
import { Redirect, Route, /* Route,*/ RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextProvider';

const AuthRoute: FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
    const { user } = useAuth();
    // const auth = useSelector((state: any) => state.firebase.auth);
    // https://stackoverflow.com/questions/65521427/redux-lose-firebase-user-when-reloading
    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         console.log(user);
    //         // User is signed in.
    //     } else {
    //         // No user is signed in.
    //     }
    // });
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                );
            }}
        />
    );
};
export default AuthRoute;
