import React from 'react';
import { act, fireEvent, Matcher, render } from '@testing-library/react';

import Accordion from './Accordion';
import { AccordionProps } from './Accordion.types';
import { wait } from '@testing-library/user-event/dist/utils';

const expandIconTestId = 'ArrowForwardIosSharpIcon';
// 1st tab number is 1
const getAccordionPanelId = (tabNumber: number): string => `#panel${tabNumber}bh-header`;
// 1st index is 0
const getExpandIcon = (get: (text: Matcher) => HTMLElement[], index: number): HTMLElement =>
    get(expandIconTestId)[index];

describe('<Accordion> component test with React Testing Library', () => {
    let props: AccordionProps;

    beforeEach(() => {
        props = {
            accordions: [
                { title: 'Title 1', subtitle: 'Subtitle 1', content: 'something content goes here [1]...' },
                { title: 'Title 2', subtitle: 'Subtitle 2', content: 'something content goes here [2]...' },
                { title: 'Title 3', subtitle: 'Subtitle 3', content: 'something content goes here [3]...' },
                { title: 'Title 4', subtitle: 'Subtitle 4', content: 'something content goes here [4]...' }
            ]
        };
    });

    const renderComponent = () => render(<Accordion data-testid={'accordion'} {...props} />);

    it('should render accordions correctly', () => {
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
        expect(container).toHaveTextContent('Subtitle 1');
        expect(container).toHaveTextContent('Subtitle 2');
        expect(container).toHaveTextContent('Subtitle 3');
        expect(container).toHaveTextContent('Subtitle 4');
    });

    it('should expand element when expand button is clicked', async () => {
        const { container, queryAllByTestId } = renderComponent();
        expect(container).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(getExpandIcon(queryAllByTestId, 0));
            await wait();
            // check that the accordion panel 1 is expanded
            expect(container.querySelector(getAccordionPanelId(1))).toHaveAttribute('aria-expanded', 'true');
            fireEvent.click(getExpandIcon(queryAllByTestId, 0));
            await wait();
            // check that the accordion panel 1 is collapsed
            expect(container.querySelector(getAccordionPanelId(1))).toHaveAttribute('aria-expanded', 'false');
        });
    });
});
