import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditWorkout from './EditWorkout';

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
    useParams: jest.fn().mockReturnValue({ id: undefined })
}));

const workoutNameInputSelector = 'input#fstg__edit_workout__name';
const getExerciseItemSelector = (index: number): string =>
    `input#fstg__edit_workout__manage_exercise_list__item_${index}`;
const addExerciseButtonTestId = 'fstg__edit_workout__add_exercise_button';

describe('<EditWorkout> component test with React Testing Library', () => {
    const renderComponent = () => render(<EditWorkout />);

    it('should display workout name field', () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('edit_workout');
        expect(component.querySelector(workoutNameInputSelector)).toBeVisible();
        expect(component.querySelector(workoutNameInputSelector)).toHaveAttribute('type', 'text');
    });

    it('should display exactly 1 exercise field after initializing in create mode', () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('edit_workout');
        expect(component.querySelector(getExerciseItemSelector(0)) as Element).toBeVisible();
        expect(component.querySelector(getExerciseItemSelector(0)) as Element).toHaveAttribute('type', 'text');
        expect(component.querySelector(getExerciseItemSelector(1))).not.toBeInTheDocument();
    });

    it('should update value when changing text in workout name field', async () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('edit_workout');
        userEvent.click(component.querySelector(workoutNameInputSelector) as Element);
        userEvent.type(component.querySelector(workoutNameInputSelector) as Element, 'New workout name');
        expect(component.querySelector(workoutNameInputSelector) as Element).toHaveValue('New workout name');
    });

    it('should update value correctly for single exercise field', async () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('edit_workout');
        userEvent.click(component.querySelector(getExerciseItemSelector(0)) as Element);
        userEvent.type(component.querySelector(getExerciseItemSelector(0)) as Element, 'New exercise');
        expect(component.querySelector(getExerciseItemSelector(0)) as Element).toHaveValue('New exercise');
    });

    it('should add 2nd exercise item when clicking add button', async () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('edit_workout');
        userEvent.click(getByTestId(addExerciseButtonTestId));
        expect(component.querySelector(getExerciseItemSelector(0)) as Element).toBeVisible();
        expect(component.querySelector(getExerciseItemSelector(1)) as Element).toBeVisible();
        expect(component.querySelector(getExerciseItemSelector(2))).not.toBeInTheDocument();
    });

    it('should update values correctly for multiple exercise fields', async () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('edit_workout');
        userEvent.click(component.querySelector(getExerciseItemSelector(0)) as Element);
        userEvent.type(component.querySelector(getExerciseItemSelector(0)) as Element, '1st exercise');
        userEvent.click(getByTestId(addExerciseButtonTestId));
        userEvent.click(component.querySelector(getExerciseItemSelector(1)) as Element);
        userEvent.type(component.querySelector(getExerciseItemSelector(1)) as Element, '2nd exercise');
        expect(component.querySelector(getExerciseItemSelector(0)) as Element).toHaveValue('1st exercise');
        expect(component.querySelector(getExerciseItemSelector(1)) as Element).toHaveValue('2nd exercise');
    });
});
