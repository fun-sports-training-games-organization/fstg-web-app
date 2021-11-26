import React from 'react';
import { Meta } from '@storybook/react';
import AddButton, { AddButtonProps } from './AddButton';
import Loader from './Loader';

export default {
    title: 'atoms/AddButton',
    component: Loader,
    args: {
        onClick: () => console.log('AddButton was clicked!'),
        testId: 'testId',
        fontSize: 'large'
    }
} as Meta;

export const addButton = (args: AddButtonProps): JSX.Element => <AddButton {...args} />;
