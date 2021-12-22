import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import IconsSubtitle from '../icons-subtitle/IconsSubtitle';
import { v4 as uuidv4 } from 'uuid';
import { SxProps, Theme } from '@mui/system';

export type ExerciseItemProps = {
    exercise: ExerciseWorkoutSettings;
    parentIdPrefix: string;
    index?: number;
    typographySx?: SxProps<Theme> | undefined;
};

const ExerciseItem: FC<ExerciseItemProps> = ({
    exercise,
    parentIdPrefix,
    index = 0,
    typographySx
}: ExerciseItemProps) => {
    let length = 0;
    if (typeof exercise.amountValue === 'number') {
        length = exercise.amountValue;
    } else if (typeof exercise.amountValue === 'string') {
        length = parseInt(exercise.amountValue);
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            maxWidth={{ xs: '100%', sm: '60%', md: '40%', lg: '25%', xl: '20%' }}
        >
            <Typography
                key={exercise.id}
                id={`${parentIdPrefix}name__${index}`}
                align="left"
                variant="body2"
                sx={typographySx}
            >
                {exercise.name}
            </Typography>
            <IconsSubtitle
                entities={[exercise]}
                id={exercise.id ? exercise.id : uuidv4()}
                length={length}
                parentIdPrefix={parentIdPrefix}
                index={index}
                type={exercise.amountType}
            ></IconsSubtitle>
        </Grid>
    );
};

export default ExerciseItem;
