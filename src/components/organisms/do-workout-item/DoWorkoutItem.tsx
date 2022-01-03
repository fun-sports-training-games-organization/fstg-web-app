import { Card, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { getPageIdPrefix } from '../../../util/id-util';
import EditImage from '../../molecules/edit-image/EditImage';
import ExercisesTimeRepsIcons from '../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import { ExerciseInProgress } from '../../../model/Exercise.model';
import { FC } from 'react';
import theme from '../../../theme/theme';

export type DoWorkoutItemProps = {
    exercise: ExerciseInProgress;
    index: number;
    isCurrent: boolean;
};

const DoWorkoutItem: FC<DoWorkoutItemProps> = ({ exercise, index, isCurrent }: DoWorkoutItemProps) => {
    const pageName = 'edit_workout';
    const idPrefix = getPageIdPrefix(pageName);

    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    return (
        <Card
            variant="outlined"
            sx={{
                bgcolor: isCurrent ? theme.palette.grey[400] : theme.palette.grey[100],
                padding: 1,
                mt: '3vh !important'
            }}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between" margin={{ xs: 1, sm: 2 }}>
                <Typography variant={smUp ? 'h4' : 'h5'}>{index + 1}.</Typography>
                <Typography variant={smUp ? 'h4' : 'h5'}>{exercise.name ? exercise.name : ''}</Typography>
                <ExercisesTimeRepsIcons
                    entities={[exercise]}
                    id={exercise.id ? exercise.id : ''}
                    length={exercise.amountValue ? exercise.amountValue : 0}
                    parentIdPrefix={idPrefix}
                    index={index}
                    type={exercise.amountType}
                    variant={smUp ? 'h4' : 'h5'}
                />
            </Stack>
            <Stack>
                <EditImage exerciseId={exercise.exerciseId} noImageIconSize="large" />
            </Stack>
        </Card>
    );
};

export default DoWorkoutItem;
