import IRoute from './route.interface';

import RegistrationForm from '../pages/authentication/registration-form/RegistrationForm';
import HomePage from '../pages/home/Home';
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage';
import ManageExercises from '../pages/exercises/manage/ManageExercises';
import LoginPage from '../pages/authentication/login-page/LoginPage';
import TermsOfServicePage from '../pages/legal/TermsOfServicePage';
import EditWorkout from '../pages/workouts/edit/EditWorkout';
import ManageWorkouts from '../pages/workouts/manage/ManageWorkouts';
import Account from '../pages/account/Account';

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
        path: '/account',
        exact: true,
        component: Account,
        name: 'Account',
        protected: true
    },
    {
        path: '/exercises',
        exact: true,
        component: ManageExercises,
        name: 'Manage Exercises',
        protected: true
    },
    {
        path: '/workout/:id',
        exact: true,
        component: EditWorkout,
        name: 'Edit Workout',
        protected: true
    },
    {
        path: '/workout',
        exact: true,
        component: EditWorkout,
        name: 'Create Workout',
        protected: true
    },
    {
        path: '/workouts',
        exact: true,
        component: ManageWorkouts,
        name: 'Manage Workouts',
        protected: true
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
