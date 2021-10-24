import React from 'react';
import { Meta } from '@storybook/react';
import Loader from './Loader';

export default {
    title: 'atoms/Loader',
    component: Loader
} as Meta;

export const loader = (): JSX.Element => <Loader />;
