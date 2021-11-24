import { render } from '@testing-library/react';
import ManageWorkouts from './ManageWorkouts';

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

describe('<ManageWorkouts> component test with React Testing Library', () => {
    const renderComponent = () => render(<ManageWorkouts />);

    it('should display something', () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId('manage_workouts');
        expect(true).toBe(true);
    });
});
