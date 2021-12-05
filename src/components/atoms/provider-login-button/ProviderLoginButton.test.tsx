import React from 'react';
import { render } from '@testing-library/react';
import ProviderLoginButton from './ProviderLoginButton';
import { Google as GoogleIcon } from '@mui/icons-material';

const providerLoginButtonTestId = 'providerLoginButton';

describe('<ProviderLoginButton> component test with React Testing Library', () => {
    const renderComponent = () =>
        render(
            <ProviderLoginButton
                data-testid={providerLoginButtonTestId}
                name="google"
                color="#db4437"
                icon={<GoogleIcon />}
                useAuth={() => {
                    return { loginWith: (name: string) => console.log({ name }) };
                }}
            />
        );

    it('should display GoogleIcon', () => {
        const { getByTestId } = renderComponent();
        const component = getByTestId(providerLoginButtonTestId);
        expect(component.querySelector('[data-testid="GoogleIcon"]')).toBeVisible();
    });
});
