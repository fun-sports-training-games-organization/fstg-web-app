import IRoute from './route.interface';

import RegistrationForm from '../pages/authentication/RegistrationForm';
import LoginPage from '../pages/authentication/LoginPage';
import HomePage from '../pages/Home';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import ManageExercises from '../pages/ManageExercises';

const routes: IRoute[] = [
    {
        path: '/register',
        exact: true,
        component: RegistrationForm,
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
        path: '/exercises',
        exact: true,
        component: ManageExercises,
        name: 'Manage Exercises',
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
    },
    {
        path: '/privacy-policy',
        exact: true,
        component: PrivacyPolicyPage,
        name: 'Privacy Policy Page',
        protected: false
    },
    {
        path: '/terms-of-service',
        exact: true,
        component: TermsOfServicePage,
        name: 'Terms Of Service Page',
        protected: false
    }
];

export default routes;
