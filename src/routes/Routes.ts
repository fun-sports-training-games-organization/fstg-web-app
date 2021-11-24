import IRoute from './route.interface';

import RegistrationForm from '../pages/authentication/RegistrationForm';
import LoginPage from '../pages/authentication/LoginPage';
import HomePage from '../pages/Home';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import ManageExercises from '../pages/manage-exercises/ManageExercises';
import EditWorkout from '../pages/edit-workout/EditWorkout';
import ManageWorkouts from '../pages/manage-workouts/ManageWorkouts';

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
