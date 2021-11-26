import React from 'react';
import { Meta } from '@storybook/react';
import PageTitle, { PageTitleProps } from './PageTitle';

export default {
    title: 'atoms/PageTitle',
    component: PageTitle,
    args: {
        translationKey: 'a.translation.key.goes.here'
    }
} as Meta;

export const pageTitle = (args: PageTitleProps): JSX.Element => <PageTitle {...args} />;
