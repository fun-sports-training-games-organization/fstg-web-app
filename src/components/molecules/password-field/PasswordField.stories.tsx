import React from 'react';
import { Meta } from '@storybook/react';
import PasswordField from './PasswordField';
import { OutlinedInputProps } from '@mui/material';

export default {
    title: 'molecules/PasswordField',
    component: PasswordField,
    args: {
        label: 'Password',
        error: false,
        disabled: false,
        required: false
    }
} as Meta;

export const passwordField = (args: OutlinedInputProps): JSX.Element => <PasswordField {...args} />;
passwordField.args = {
    label: 'Password',
    disabled: false
};
