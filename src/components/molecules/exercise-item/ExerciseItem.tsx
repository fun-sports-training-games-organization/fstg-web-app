import { Grid, Stack, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { Exercise, ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import ExercisesTimeRepsIcons from '../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import { v4 as uuidv4 } from 'uuid';
import { ResponsiveStyleValue, SxProps, Theme } from '@mui/system';
import EditImage from '../edit-image/EditImage';
import useEntityManager from '../../../hooks/useEntityManager';

export type ExerciseItemProps = {
    exerciseWorkoutSettings: ExerciseWorkoutSettings;
    parentIdPrefix: string;
    index?: number;
    typographySx?: SxProps<Theme> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typographyMarginLeft?: ResponsiveStyleValue<any> | undefined;
};

const ExerciseItem: FC<ExerciseItemProps> = ({
    exerciseWorkoutSettings,
    parentIdPrefix,
    index = 0,
    typographySx,
    typographyMarginLeft
}: ExerciseItemProps) => {
    let length = 0;
    if (typeof exerciseWorkoutSettings.amountValue === 'number') {
        length = exerciseWorkoutSettings.amountValue;
    } else if (typeof exerciseWorkoutSettings.amountValue === 'string') {
        length = parseInt(exerciseWorkoutSettings.amountValue);
    }

    const [exercise, setExercise] = useState<Exercise>({});
    const { findById } = useEntityManager<Exercise>('exercises');

    const loadExercise = useCallback((exerciseId) => {
        findById(exerciseId).then((exercise) => setExercise(exercise));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        exerciseWorkoutSettings.exerciseId ? loadExercise(exerciseWorkoutSettings.exerciseId) : setExercise(exercise);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseWorkoutSettings.exerciseId, loadExercise]);

    return (
        <Grid container display="grid" gridTemplateColumns="repeat(100, 1fr)" gridTemplateRows="7vh">
            <Typography
                key={exerciseWorkoutSettings.id}
                id={`${parentIdPrefix}name__${index}`}
                align="left"
                variant="body2"
                sx={typographySx}
                marginLeft={typographyMarginLeft}
                gridColumn={{ xs: '1 / 50', sm: '8 / 50', lg: '6 / 50' }}
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                {exerciseWorkoutSettings.name}
            </Typography>
            <Stack
                gridColumn={{ xs: '55 / 75', sm: '51 / 75', lg: '51 / 70' }}
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <EditImage exercise={exercise} maxHeight={'100%'} />
            </Stack>
            <ExercisesTimeRepsIcons
                entities={[exerciseWorkoutSettings]}
                id={exerciseWorkoutSettings.id ? exerciseWorkoutSettings.id : uuidv4()}
                length={length}
                parentIdPrefix={parentIdPrefix}
                index={index}
                type={exerciseWorkoutSettings.amountType}
                gridColumns={{
                    exercisesOrRepsIcon: { xs: '81 / 99', lg: '78 / 99' },
                    timeIcon: { xs: '81 / 99', lg: '78 / 99' },
                    repsIcon: { xs: '81 / 99', lg: '78 / 99' }
                }}
                displayInGrid={true}
            ></ExercisesTimeRepsIcons>
        </Grid>
    );
};

export default ExerciseItem;
