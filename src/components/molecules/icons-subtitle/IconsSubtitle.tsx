import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Workout } from '../../../model/Workout.model';
import { addLeadingZero } from '../../../util/number-util';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Exercise } from '../../../model/Exercise.model';

export type WorkoutIconsSubtitleProps = {
    workout: Workout;
    parentIdPrefix: string;
    index?: number;
};

const IconsSubtitle: FC<WorkoutIconsSubtitleProps> = ({
    workout,
    parentIdPrefix,
    index = 0
}: WorkoutIconsSubtitleProps) => {
    const getFormattedTotalWorkoutTime = (): string => {
        const getTotalWorkoutSeconds = (): number => {
            const getNumber = (val: string | number | undefined): number => {
                if (typeof val === 'number') {
                    return val;
                } else if (typeof val === 'string') {
                    return parseInt(val);
                }

                return 0;
            };

            return workout.exercises
                .map((exercise) =>
                    exercise.amountType === 'TIME_BASED' ? getNumber((exercise as Exercise).amountValue) : 0
                )
                .reduce((a, b) => a + b);
        };
        const totalWorkoutSeconds = getTotalWorkoutSeconds();
        const formattedWorkoutHours =
            totalWorkoutSeconds >= 3600 ? `${addLeadingZero(Math.floor(totalWorkoutSeconds / 3600))}:` : '';
        const formattedWorkoutMinutes =
            totalWorkoutSeconds >= 60 ? addLeadingZero(Math.floor(totalWorkoutSeconds / 60)) : '0';
        const formattedWorkoutSeconds = addLeadingZero(totalWorkoutSeconds % 60);
        return `${formattedWorkoutHours}${formattedWorkoutMinutes}:${formattedWorkoutSeconds}`;
    };

    return (
        <>
            <Stack direction="row" alignItems="end" spacing={1} display={{ xs: 'none', sm: 'flex' }}>
                <Typography key={workout.id} id={`${parentIdPrefix}__reps__${index}`}>
                    {workout.exercises.length}
                </Typography>
                <FitnessCenterIcon></FitnessCenterIcon>
            </Stack>
            <Stack direction="row" alignItems="end" spacing={1} display={{ xs: 'none', sm: 'flex' }}>
                <Typography key={workout.id} id={`${parentIdPrefix}__time__${index}`}>
                    {getFormattedTotalWorkoutTime()}
                </Typography>
                <QueryBuilderIcon></QueryBuilderIcon>
            </Stack>
        </>
    );
};

export default IconsSubtitle;
