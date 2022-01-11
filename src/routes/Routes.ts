import IRoute from './route.interface';
import ManageExercises from '../components/pages/exercises/manage/ManageExercises';
import ManageWorkouts from '../components/pages/workouts/manage/ManageWorkouts';
import StartWorkout from '../components/pages/workouts/start/StartWorkout';
import LoginPage from '../components/pages/authentication/login-page/LoginPage';
import PrivacyPolicyPage from '../components/pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from '../components/pages/legal/TermsOfServicePage';
import EditWorkout from '../components/pages/workouts/edit/EditWorkout';
import DoWorkout from '../components/pages/workouts/do/DoWorkout';
import { Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NoAuthRoute from './NoAuthRoute';
import PageNotFoundPage from '../components/pages/error/PageNotFoundPage';
import Dashboard from '../components/pages/dashboard/Dashboard';
import Profile from '../components/pages/profile/Profile';
import StatisticsDashboard from '../components/pages/statistics-dashboard/StatisticsDashboard';

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Dashboard,
        key: 'Dashboard',
        Route: AuthRoute
    },
    {
        path: '/dashboard',
        exact: true,
        component: Dashboard,
        key: 'dashboard',
        Route: AuthRoute
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        key: 'Login Page',
        Route: NoAuthRoute
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
        key: 'Profile',
        Route: AuthRoute
    },
    {
        path: '/exercises',
        exact: true,
        component: ManageExercises,
        key: 'Manage Exercises',
        Route: AuthRoute
    },
    {
        path: '/workout/:id',
        exact: true,
        component: EditWorkout,
        key: 'Edit Workout',
        Route: AuthRoute
    },
    {
        path: '/start-workout/:id',
        exact: true,
        component: StartWorkout,
        key: 'Start Workout',
        Route: AuthRoute
    },
    {
        path: '/do-workout/:id',
        exact: true,
        component: DoWorkout,
        key: 'Do Workout',
        Route: AuthRoute
    },
    {
        path: '/workout',
        exact: true,
        component: EditWorkout,
        key: 'Create Workout',
        Route: AuthRoute
    },
    {
        path: '/workouts',
        exact: true,
        component: ManageWorkouts,
        key: 'Manage Workouts',
        Route: AuthRoute
    },
    {
        path: '/statistics',
        exact: true,
        component: StatisticsDashboard,
        key: 'Statistics Dashboard',
        Route: AuthRoute
    },
    {
        path: '/privacy-policy',
        exact: true,
        component: PrivacyPolicyPage,
        key: 'Privacy Policy Page',
        Route
    },
    {
        path: '/terms-of-service',
        exact: true,
        component: TermsOfServicePage,
        key: 'Terms Of Service Page',
        Route
    },
    {
        path: '/server-error-500',
        exact: true,
        component: TermsOfServicePage,
        key: 'Server Error 500',
        Route
    },
    {
        // catch all route goes to Error 404 page
        key: '404 Error',
        component: PageNotFoundPage,
        Route: Route
    }
];

export default routes;
