import React from 'react';
import { Meta } from '@storybook/react';
import EmailField from './EmailField';
import { OutlinedInputProps } from '@mui/material';

export default {
    title: 'molecules/PasswordField',
    component: EmailField,
    args: {
        label: 'Password',
        error: false,
        disabled: false,
        required: false
    }
} as Meta;

export const passwordField = (args: OutlinedInputProps): JSX.Element => <EmailField {...args} />;
passwordField.args = {
    label: 'Password',
    disabled: false
};
