import React from 'react';
import ResponsiveDialog from './ResponsiveDialog';
import { ResponsiveDialogProps } from './ResponsiveDialog.types';

export default {
    title: 'organisms/ResponsiveDialog',
    component: ResponsiveDialog,
    args: {
        open: false,
        title: 'Terms & Conditions',
        content: 'Do you accept the terms and conditions?',
        cancelText: 'Decline',
        confirmText: 'Accept'
    }
};

export const _ResponsiveDialog = (args: ResponsiveDialogProps): JSX.Element => (
    <ResponsiveDialog
        {...args}
        onClose={() => {
            alert('onClose called!');
        }}
        onConfirm={() => {
            alert('onConfirm called!');
        }}
        onCancel={() => {
            alert('onCancel called!');
        }}
    />
);
