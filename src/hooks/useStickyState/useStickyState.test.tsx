import React, { FC } from 'react';
import { fireEvent, render } from '@testing-library/react';

import useStickyState from './useStickyState';

describe('useStickyState util test with React Testing Library', () => {
    const TestComponent: FC = () => {
        const [testStickyState, setTestStickyState] = useStickyState<string>('', 'testKey');
        const [testStickyStateWithDefault, setTestStickyStateWithDefault] = useStickyState<string>(
            '"default":"value"',
            'testKey'
        );

        return (
            <>
                <button
                    onClick={() => {
                        setTestStickyState('Hello Sticky State');
                        setTestStickyStateWithDefault('Hello Sticky State With Default');
                    }}
                    data-testid={'sticky-state-button'}
                >
                    Test Sticky State
                </button>
                <p data-testid={'sticky-state-paragraph'}>{testStickyState}</p>
                <p data-testid={'sticky-state-paragraph-with-default'}>{testStickyStateWithDefault}</p>
            </>
        );
    };
    const renderComponent = () => render(<TestComponent />);
    it('should set be able to get and set sticky state correctly', () => {
        const { getByTestId } = renderComponent();
        const button = getByTestId('sticky-state-button');
        const paragraph = getByTestId('sticky-state-paragraph');
        const paragraphWithDefault = getByTestId('sticky-state-paragraph-with-default');
        expect(paragraph.innerHTML).toBe('');
        expect(paragraphWithDefault.innerHTML).toBe('"default":"value"');
        fireEvent.click(button);
        expect(paragraph).toHaveTextContent('Hello Sticky State');
        expect(paragraphWithDefault).toHaveTextContent('Hello Sticky State With Default');
    });

    it('should keep sticky state values from last test', () => {
        const { getByTestId } = renderComponent();
        const paragraph = getByTestId('sticky-state-paragraph');
        const paragraphWithDefault = getByTestId('sticky-state-paragraph-with-default');
        expect(paragraph).toHaveTextContent('Hello Sticky State');
        expect(paragraphWithDefault).toHaveTextContent('Hello Sticky State With Default');
    });
});
