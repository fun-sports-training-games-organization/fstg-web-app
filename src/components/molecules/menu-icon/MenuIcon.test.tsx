import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import MenuIcon from './MenuIcon';
import { Person } from '@mui/icons-material';
import { Backdrop } from '@mui/material';
import { mockMenuList } from '../../../__mocks__/mockMenuList';

describe('<MenuIcon> component test with React Testing Library', () => {
    const renderComponent = () =>
        render(
            <Backdrop open={true}>
                <MenuIcon icon={<Person />} data-testid={'menu-icon'}>
                    {mockMenuList}
                </MenuIcon>
            </Backdrop>
        );

    it('should render test value correctly', () => {
        const { getByText, getByRole, getByTestId } = renderComponent();

        const component = getByTestId('menu-icon');
        expect(getByText('Edit')).toBeInTheDocument();
        const button: Element | null = component.querySelector('button');
        if (button) {
            fireEvent.click(button); // open menu
            const backdrop: ChildNode | null = getByRole('presentation').firstChild;
            if (backdrop) {
                fireEvent.click(backdrop); // close menu by clicking backdrop
            }
            fireEvent.click(button); // open menu again
            fireEvent.click(getByText('Edit')); // close menu by clicking menu item
        }
        // still need to figure out a way to test menu open state...
    });
});
