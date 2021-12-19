import React from 'react';
import { Meta } from '@storybook/react';
import StopWatch, { StopwatchProps } from './StopWatch';

export default {
    title: 'molecules/StopWatch',
    component: StopWatch,
    args: { showIcon: true, isPlaying: false, hasResetButton: true, typographyProps: { variant: 'body1' } }
} as Meta;

export const stopWatch = (args: StopwatchProps): JSX.Element => <StopWatch {...args} />;
