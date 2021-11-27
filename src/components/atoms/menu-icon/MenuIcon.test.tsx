import React from 'react';
import { render } from '@testing-library/react';
import MenuIcon from './MenuIcon';
import { Language as LanguageIcon } from '@mui/icons-material';

const menuIconTestId = 'menuIcon';
const languageIconTestId = 'languageIcon';

describe('<MenuIcon> component test with React Testing Library', () => {
    const renderComponent = () =>
        render(
            <MenuIcon
                data-testid={menuIconTestId}
                icon={<LanguageIcon data-testid={languageIconTestId} style={{ color: 'white' }} />}
            />
        );

    it('should display language icon', () => {
        const { getByTestId } = renderComponent();

        expect(getByTestId(languageIconTestId)).toBeVisible();
    });
});
