import { IconButton, Stack, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import ReplayIcon from '@mui/icons-material/Replay';
import { useElapsedTime } from 'use-elapsed-time';

export type StopwatchProps = {
    isPlaying: boolean;
    showIcon?: boolean;
    typographyProps?: TypographyProps;
    hasResetButton?: boolean;
    buttonsRightToLeft?: boolean;
};

const StopWatch: FC<StopwatchProps> = ({
    isPlaying,
    showIcon,
    hasResetButton,
    buttonsRightToLeft,
    typographyProps
}: StopwatchProps) => {
    const { elapsedTime, reset } = useElapsedTime({ isPlaying });

    return (
        // source: https://codesandbox.io/s/epic-dream-hn62k?fontsize=14&hidenavigation=1&theme=dark&file=/src/index.js:179-232
        <Stack
            direction={buttonsRightToLeft ? 'row-reverse' : 'row'}
            spacing={1}
            alignItems={'center'}
            alignContent={'center'}
        >
            {hasResetButton && (
                <IconButton onClick={() => reset()}>
                    <ReplayIcon />
                </IconButton>
            )}
            {showIcon && <AlarmIcon />}
            <Typography {...typographyProps}>{elapsedTime.toFixed(2)}</Typography>
        </Stack>
    );
};

export default StopWatch;
