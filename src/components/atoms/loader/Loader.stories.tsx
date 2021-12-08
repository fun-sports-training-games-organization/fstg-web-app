import React from 'react';
import { Meta } from '@storybook/react';
import Loader, { LoaderProps } from './Loader';

export default {
    title: 'atoms/Loader',
    component: Loader,
    args: {
        testId: 'testId'
    }
} as Meta;

export const loader = (args: LoaderProps): JSX.Element => <Loader {...args} />;
