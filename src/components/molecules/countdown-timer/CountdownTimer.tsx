/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import Countdown, { CountdownProps } from 'react-countdown';
import { TypographyProps } from '@mui/material/Typography/Typography';
import { CountdownRenderProps, CountdownTimeDeltaFn } from 'react-countdown/dist/Countdown';
import { addLeadingZero } from '../../../util/number-util';
import AlarmIcon from '@mui/icons-material/Alarm';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ResponsiveStyleValue, Theme } from '@mui/system';
type OwnProps = {
    seconds?: number;
    showHours?: boolean;
    showIcon?: boolean;
    typographyProps?: TypographyProps;
    onTick?: CountdownTimeDeltaFn | undefined;
    countdownRef?: (countdown: Countdown | null) => void | null;
    autoStart?: boolean;
    display?:
        | ResponsiveStyleValue<any | any[] | undefined>
        | ((theme: Theme) => ResponsiveStyleValue<any | any[] | undefined>);
};

export type CountdownTimerProps = Omit<CountdownProps, 'renderer'> & OwnProps;

const CountdownTimer: FC<CountdownTimerProps> = ({
    seconds = 3599,
    showHours,
    showIcon,
    typographyProps,
    // eslint-disable-next-line unused-imports/no-unused-vars
    children,
    countdownRef,
    onTick,
    autoStart,
    display,
    ...rest
}: Omit<CountdownProps, 'renderer'> & Omit<CountdownProps, 'onTick'> & OwnProps) => {
    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            // Render a completed state
            // return children;
            return <AssignmentTurnedInIcon color="success" sx={{ fontSize: 40 }} />;
        } else {
            // Render a countdown
            // TODO : add animation when timer is low on seconds
            // source : https://stackoverflow.com/questions/52568739/blink-animation-in-mui
            return (
                <Stack direction={'row'} spacing={1} alignItems={'center'} display={display}>
                    {showIcon && <AlarmIcon />}
                    <Typography {...typographyProps}>
                        {showHours && addLeadingZero(hours)}
                        {showHours && ':'}
                        {addLeadingZero(minutes)}:{addLeadingZero(seconds)}
                    </Typography>
                </Stack>
            );
        }
    };

    return (
        <Countdown
            ref={countdownRef}
            onTick={onTick}
            date={Date.now() + seconds * 1000}
            renderer={renderer}
            {...rest}
            autoStart={autoStart}
        />
    );
};

export default CountdownTimer;
