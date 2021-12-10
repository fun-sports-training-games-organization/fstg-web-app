import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

const loaderTestId = 'loader';

describe('<Loader> component test with React Testing Library', () => {
    const renderComponent = () => render(<Loader testId={loaderTestId} />);

    it('should display mui grid column container, spinning loader container, and spinning loader elements', () => {
        const { getByTestId } = renderComponent();

        const component = getByTestId(loaderTestId);
        expect(component).toHaveClass('MuiGrid-container MuiGrid-direction-xs-column');
        expect(component.querySelector('.spinning-loader-container')).toBeVisible();
        expect(component.querySelector('.spinning-loader')).toBeVisible();
    });
});
