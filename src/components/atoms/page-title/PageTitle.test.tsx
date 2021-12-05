import React from 'react';
import { render } from '@testing-library/react';
import PageTitle from './PageTitle';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key })
}));

const pageTitleTestId = 'pageTitle';
const translationKey = 'some.translation.key';

describe('<PageTitle> component test with React Testing Library', () => {
    const renderComponent = () => render(<PageTitle data-testid={pageTitleTestId} translationKey={translationKey} />);

    it('should display translation correctly', () => {
        const { getByText } = renderComponent();
        expect(getByText(translationKey)).toHaveTextContent(translationKey);
    });
});
