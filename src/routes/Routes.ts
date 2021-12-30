import IRoute from './route.interface';
import ManageExercises from '../components/pages/exercises/manage/ManageExercises';
import ManageWorkouts from '../components/pages/workouts/manage/ManageWorkouts';
import Account from '../components/pages/account/Account';
import StartWorkout from '../components/pages/workouts/start/StartWorkout';
import LoginPage from '../components/pages/authentication/login-page/LoginPage';
import HomePage from '../components/pages/home/Home';
import PrivacyPolicyPage from '../components/pages/legal/PrivacyPolicyPage';
import TermsOfServicePage from '../components/pages/legal/TermsOfServicePage';
import EditWorkout from '../components/pages/workouts/edit/EditWorkout';
import DoWorkout from '../components/pages/workouts/do/DoWorkout';

const routes: IRoute[] = [
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
        path: '/start-workout/:id',
        exact: true,
        component: StartWorkout,
        name: 'Start Workout',
        protected: true
    },
    {
        path: '/do-workout/:id',
        exact: true,
        component: DoWorkout,
        name: 'Do Workout',
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
