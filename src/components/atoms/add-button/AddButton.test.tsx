import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddButton from './AddButton';

let functionClickCount: number;
const addButtonClickableElement = 'addButtonClickableElement';

describe('<AddButton> component test with React Testing Library', () => {
    beforeEach(() => {
        functionClickCount = 0;
    });

    const renderComponent = () =>
        render(<AddButton onClick={() => (functionClickCount += 1)} testId={addButtonClickableElement} />);

    it('should trigger onClick function correctly', () => {
        const { getByTestId } = renderComponent();

        const clickableElement = getByTestId(addButtonClickableElement);
        userEvent.click(clickableElement);
        expect(functionClickCount).toBe(1);
    });
});
