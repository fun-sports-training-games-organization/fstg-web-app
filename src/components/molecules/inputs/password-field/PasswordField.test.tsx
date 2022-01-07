import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import PasswordField from './PasswordField';
import { OutlinedInputProps } from '@mui/material';

describe('<PasswordField> component test with React Testing Library', () => {
    let props: OutlinedInputProps;

    beforeEach(() => {
        props = {
            id: 'test-id',
            label: 'test-label'
        };
    });

    const renderComponent = () => render(<PasswordField data-testid={'password-field'} {...props} />);

    it('mousedown should not toggle show / hide password', () => {
        props.id = 'test-id';
        props.label = 'test-label';
        const { getByTestId } = renderComponent();

        const component = getByTestId('password-field');
        expect(component.querySelector('input')).toHaveAttribute('type', 'password');
        const showHideToggleButton = getByTestId('show-hide-password-toggle-button');
        fireEvent.mouseDown(showHideToggleButton);
        expect(component.querySelector('input')).toHaveAttribute('type', 'password');
        expect(component).toHaveTextContent('test-label');
    });

    it('mouse click should toggle show / hide password text', () => {
        props.id = 'test-id';
        props.label = 'test-label';
        const { getByTestId } = renderComponent();

        const component = getByTestId('password-field');
        const showHideToggleButton = getByTestId('show-hide-password-toggle-button');
        expect(component.querySelector('input')).toHaveAttribute('type', 'password');
        fireEvent.click(showHideToggleButton);
        expect(component.querySelector('input')).toHaveAttribute('type', 'text');
        fireEvent.click(showHideToggleButton);
        expect(component.querySelector('input')).toHaveAttribute('type', 'password');
        expect(component).toHaveTextContent('test-label');
    });

    it('should render password-field correctly', () => {
        props.label = 'test-label';
        const { getByTestId } = renderComponent();
        const component = getByTestId('password-field');
        expect(component).toHaveTextContent('test-label');
    });
});
