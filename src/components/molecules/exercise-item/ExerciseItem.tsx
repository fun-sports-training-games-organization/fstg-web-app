import { Typography } from '@mui/material';
import { FC } from 'react';
import { ExerciseWorkoutSettings } from '../../../model/Exercise.model';

export type ExerciseItemProps = {
    exercise: ExerciseWorkoutSettings;
    parentIdPrefix: string;
    index?: number;
};

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise, parentIdPrefix, index = 0 }: ExerciseItemProps) => {
    return (
        <Typography
            key={exercise.id}
            id={`${parentIdPrefix}name__${index}`}
            align="left"
            variant="body2"
            sx={{ lineHeight: 2.2, marginLeft: '4rem' }}
        >
            {exercise.name}
        </Typography>
    );
};

export default ExerciseItem;
