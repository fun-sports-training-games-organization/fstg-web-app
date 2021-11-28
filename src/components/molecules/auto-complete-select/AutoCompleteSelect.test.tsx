import React from 'react';
import { render, screen } from '@testing-library/react';

import AutoCompleteSelect from './AutoCompleteSelect';
import { AutoCompleteSelectorProps } from './AutoCompleteSelect.types';
import userEvent from '@testing-library/user-event';

describe('<AutoCompleteSelect> component test with React Testing Library', () => {
    let props: AutoCompleteSelectorProps;
    const options = [
        { key: 1, value: 'One' },
        { key: 2, value: 'Two' },
        { key: 3, value: 'Three' }
    ];

    beforeEach(() => {
        props = {
            label: 'Test Auto Complete Label',
            options,
            getOptionLabel: (option: { value: string }) => option && option.value,
            noOptionsText: 'Found nothing!'
            // foo: 'bar'
        };
    });

    const renderComponent = () => render(<AutoCompleteSelect data-testid={'auto-complete-selector'} {...props} />);

    it.each(options)(
        `should render component and typing the option should filter out the other options`,
        async (option) => {
            const { getByTestId } = renderComponent();
            const component = getByTestId('auto-complete-selector');
            expect(component).toHaveTextContent('Test Auto Complete Label');
            const input: Element | null = component.querySelector('input');
            input && userEvent.type(input, option.value);
            expect(screen.getByRole('option', { name: option.value })).toBeInTheDocument();
        }
    );
});
