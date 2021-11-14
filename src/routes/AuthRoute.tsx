import { FC } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect, Route, /* Route,*/ RouteProps } from 'react-router-dom';
import firebase from 'firebase/compat/app';

const AuthRoute: FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
    const auth = useSelector((state: any) => state.firebase.auth);
    // https://stackoverflow.com/questions/65521427/redux-lose-firebase-user-when-reloading
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });
    return (
        <Route
            {...rest}
            render={({ location }) => {
                console.log(location.pathname);

                return isLoaded(auth) && !isEmpty(auth) ? (
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
