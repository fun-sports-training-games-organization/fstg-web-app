import React from 'react';
import { render } from '@testing-library/react';
import DoWorkout from './DoWorkout';
import { Button, Grid, IconButton, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => {
        return {
            enqueueSnackbar: mockEnqueue
        };
    }
}));

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: () => true
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => {
        return {
            user: {
                displayName: 'testuser',
                email: 'testuser@gmail.com',
                phoneNumber: null,
                photoURL: null,
                providerId: 'google',
                uid: 'test-user-uid'
            },
            logout: () => {},
            loginWith: () => {},
            loginWithEmail: () => {},
            registerWithEmail: () => {},
            sendResetPasswordLink: () => {},
            sendVerificationEmail: () => {},
            loginFailed: () => {}
        };
    }
}));

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    useAuth: () => {
        return {
            logout: () => {},
            user: {
                displayName: 'testuser',
                email: 'testuser@gmail.com',
                phoneNumber: null,
                photoURL: null,
                providerId: 'google',
                uid: 'test-user-uid'
            }
        };
    },
    getAuth: () => {
        return {
            currentUser: {
                displayName: 'testuser',
                email: 'testuser@gmail.com',
                phoneNumber: null,
                photoURL: null,
                providerId: 'google',
                uid: 'test-user-uid'
            }
        };
    }
}));
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key })
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ id: undefined }),
    useHistory: jest.fn().mockReturnValue({})
}));

jest.mock('react-redux-firebase', () => ({
    firebaseReducer: () => null,
    useFirestore: () => {
        return {
            collection: () => {
                return {
                    onSnapshot: () => {
                        return { docs: [] };
                    }
                };
            }
        };
    },
    useFirebase: () => {
        return {
            auth: () => {
                return {
                    currentUser: {
                        displayName: 'testuser',
                        email: 'testuser@gmail.com',
                        phoneNumber: null,
                        photoURL: null,
                        providerId: 'google',
                        uid: 'test-user-uid'
                    }
                };
            }
        };
    }
}));

jest.mock('uuid', () => ({
    v4: () => 'fake-id'
}));

describe('<DoWorkout> component test with React Testing Library', () => {
    beforeEach(() => {});

    const renderComponent = () => render(<DoWorkout />);

    it('should render DoWorkout correctly', () => {
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
    });
});
