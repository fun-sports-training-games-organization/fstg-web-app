import React from 'react';
import { Meta } from '@storybook/react';
import { OutlinedInputProps, Typography } from '@mui/material';
import CountdownTimer from './CountdownTimer';

export default {
    title: 'molecules/CountdownTimer',
    component: CountdownTimer,
    args: {
        seconds: 5,
        typographyProps: { variant: 'body1' },
        showIcon: true,
        showHours: false,
        children: <Typography variant={'h4'}>Timer Finished!</Typography>
    }
} as Meta;

export const countdownTimer = (args: OutlinedInputProps): JSX.Element => <CountdownTimer {...args} />;
