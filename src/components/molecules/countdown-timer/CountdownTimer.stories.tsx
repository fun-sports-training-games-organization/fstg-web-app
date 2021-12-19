import React from 'react';
import { Meta } from '@storybook/react';
import { Typography } from '@mui/material';
import CountdownTimer, { CountdownTimerProps } from './CountdownTimer';

export default {
    title: 'molecules/countdown-timer',
    component: CountdownTimer,
    args: {
        seconds: 5,
        typographyProps: { variant: 'body1' },
        showIcon: true,
        showHours: false,
        children: <Typography variant={'h4'}>Timer Finished!</Typography>
    }
} as Meta;

export const countdownTimer = (args: CountdownTimerProps): JSX.Element => <CountdownTimer {...args} />;
