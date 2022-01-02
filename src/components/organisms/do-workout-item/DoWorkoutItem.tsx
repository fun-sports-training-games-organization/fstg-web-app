import { Card, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { getPageIdPrefix } from '../../../util/id-util';
import EditImage from '../../molecules/edit-image/EditImage';
import ExercisesTimeRepsIcons from '../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import { ExerciseInProgress } from '../../../model/Exercise.model';
import CountdownTimer from '../../molecules/countdown-timer/CountdownTimer';
import Countdown from 'react-countdown';
import { FC } from 'react';
import theme from '../../../theme/theme';

export type DoWorkoutItemProps = {
    exercise: ExerciseInProgress;
    index: number;
    isCurrent: boolean;
    onTick: () => void;
    onComplete: () => void;
    setCountdownApiFromRef?: (countdown: Countdown | null) => void | null;
    autoStart?: boolean;
};

const DoWorkoutItem: FC<DoWorkoutItemProps> = ({
    exercise,
    setCountdownApiFromRef,
    index,
    isCurrent,
    onTick,
    onComplete,
    autoStart = false
}: DoWorkoutItemProps) => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    return (
        <Card
            variant="outlined"
            sx={{
                bgcolor: isCurrent ? theme.palette.grey[400] : theme.palette.grey[100],
                padding: 1,
                mt: `${index === 0 ? 40 : '3vh !important'}`
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" margin={{ xs: 1, sm: 2 }}>
                <Typography variant={smUp ? 'h4' : 'h5'}>{index + 1}.</Typography>
                <ExercisesTimeRepsIcons
                    entities={[exercise]}
                    id={exercise.id ? exercise.id : ''}
                    length={exercise.amountValue ? exercise.amountValue : 0}
                    parentIdPrefix={idPrefix}
                    index={index}
                    type={exercise.amountType}
                    variant={smUp ? 'h4' : 'h5'}
                />
                {isCurrent && exercise.amountType === 'TIME_BASED' && exercise.secondsRemaining >= 0 ? (
                    <CountdownTimer
                        onTick={onTick}
                        seconds={exercise.secondsRemaining}
                        typographyProps={{ variant: smUp ? 'h4' : 'h5' }}
                        onComplete={onComplete}
                        key={exercise.id}
                        countdownRef={setCountdownApiFromRef}
                        autoStart={autoStart}
                    />
                ) : null}
            </Stack>
            <Stack>
                <EditImage exerciseId={exercise.exerciseId} noImageIconSize="large" />
            </Stack>
        </Card>
    );
};

export default DoWorkoutItem;
