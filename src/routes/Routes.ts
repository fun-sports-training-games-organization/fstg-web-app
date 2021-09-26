import IRoute from './route.interface';

import RegistrationPage from '../pages/authentication/RegistrationPage';
import LoginPage from '../pages/authentication/LoginPage';
import HomePage from '../pages/Home';

const routes: IRoute[] = [
    {
        path: '/register',
        exact: true,
        component: RegistrationPage,
        name: 'Registration Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/home',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    }
];

export default routes;
