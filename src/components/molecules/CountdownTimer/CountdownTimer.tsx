import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import Countdown, { CountdownProps } from 'react-countdown';
import { TypographyProps } from '@mui/material/Typography/Typography';
import { CountdownRenderProps } from 'react-countdown/dist/Countdown';
import { addLeadingZero } from '../../../util/number-util';
import AlarmIcon from '@mui/icons-material/Alarm';

type OwnProps = {
    seconds: number;
    showHours?: boolean;
    showIcon?: boolean;
    typographyProps?: TypographyProps;
};

const CountdownTimer: FC<Omit<CountdownProps, 'renderer'> & OwnProps> = ({
    seconds,
    showHours,
    showIcon,
    typographyProps,
    children,
    ...rest
}: Omit<CountdownProps, 'renderer'> & OwnProps) => {
    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
        if (completed) {
            // Render a completed state
            return children;
        } else {
            // Render a countdown
            // TODO : add animation when timer is low on seconds
            // source : https://stackoverflow.com/questions/52568739/blink-animation-in-mui
            return (
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
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

    return <Countdown date={Date.now() + seconds * 1000} renderer={renderer} {...rest} />;
};

export default CountdownTimer;
