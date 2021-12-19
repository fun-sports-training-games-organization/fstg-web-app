import { render } from '@testing-library/react';
import StartWorkout from './StartWorkout';

const mockEnqueue = jest.fn();
jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => {
        return {
            enqueueSnackbar: mockEnqueue
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

const workoutNameInputSelector = 'input#fstg__start_workout__name';
const getExerciseItemSelector = (index: number): string =>
    `input#fstg__start_workout__manage_exercise_list__item_${index}`;
const addExerciseButtonTestId = 'fstg__start_workout__add_exercise_button';

describe('<StartWorkout> component test with React Testing Library', () => {
    const renderComponent = () => render(<StartWorkout />);

    it('should display workout name', () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('start_workout');
        expect(component.querySelector(workoutNameInputSelector)).toBeVisible();
        expect(component.querySelector(workoutNameInputSelector)).toHaveAttribute('type', 'text');
    });
});
