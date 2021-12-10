import React from 'react';
import { Meta } from '@storybook/react';
import ProviderLoginButton, { ProviderLoginProps } from './ProviderLoginButton';
import { ButtonProps } from '@mui/material';
import { LoginProvider } from '../../../contexts/AuthContextProvider';
import { Google as GoogleIcon } from '@mui/icons-material';

export default {
    title: 'atoms/ProviderLoginButton',
    component: ProviderLoginButton,
    args: {
        name: 'google',
        color: '#db4437',
        icon: <GoogleIcon />,
        useAuth: () => {
            return { loginWith: (name: string) => console.log({ name }) };
        }
    }
} as Meta;

export const providerLoginButton = (args: ProviderLoginProps): JSX.Element => <ProviderLoginButton {...args} />;
