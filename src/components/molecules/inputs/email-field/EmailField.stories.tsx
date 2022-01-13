import React from 'react';
import { Meta } from '@storybook/react';
import EmailField from './EmailField';
import { OutlinedInputProps } from '@mui/material';
import AuthContextProvider from '../../../../contexts/AuthContextProvider';
import { SnackbarProvider } from 'notistack';

export default {
    title: 'molecules/EmailField',
    component: EmailField,
    args: {
        label: 'Password',
        error: false,
        disabled: false,
        required: false
    }
} as Meta;

export const emailField = (args: OutlinedInputProps): JSX.Element => (
    <SnackbarProvider>
        <AuthContextProvider>
            <EmailField {...args} />
        </AuthContextProvider>
    </SnackbarProvider>
);
emailField.args = {
    label: 'Email',
    value: 'example@email.com',
    disabled: false
};
