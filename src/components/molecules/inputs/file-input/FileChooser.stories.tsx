import React from 'react';
import { Meta } from '@storybook/react';
import FileChooser from './FileChooser';
import { OutlinedInputProps } from '@mui/material';

export default {
    title: 'molecules/FileChooser',
    component: FileChooser,
    args: {
        id: 'file-chooser',
        label: 'File Chooser'
    }
} as Meta;

export const fileInput = (args: OutlinedInputProps): JSX.Element => <FileChooser id={'File Chooser'} {...args} />;
fileInput.args = {
    label: 'File Chooser',
    disabled: false
};
