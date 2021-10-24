import React from 'react';
import { Meta } from '@storybook/react';
import TextField from './TextField';
import { OutlinedInputProps } from '@mui/material';

export default {
    title: 'atoms/TextField',
    component: TextField,
    args: {
        label: 'TextField'
    }
} as Meta;

export const textField = (args: OutlinedInputProps): JSX.Element => <TextField {...args} />;
textField.args = {
    label: 'TextField'
};
