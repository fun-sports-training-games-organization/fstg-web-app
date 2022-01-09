import { Stack, Typography } from '@mui/material';
import { Workout } from '../../../model/Workout.model';
import { useTranslation } from 'react-i18next';

type Props = {
    parentIdPrefix: string;
    workout: Workout;
};

const DisplayWorkoutExercises = ({ parentIdPrefix, workout }: Props): JSX.Element => {
    const idPrefix = `${parentIdPrefix}display_exercise_list__`;
    const exerciseItemPrefix = `${idPrefix}item_`;
    const { t } = useTranslation();

    return (
        <>
            <Stack ml={4} mb={1}>
                {workout.exercises?.map((exercise, index) => {
                    return (
                        <Typography key={exercise.id} id={`${exerciseItemPrefix}${index}`} align="left" variant="body2">
                            {t(exercise?.name ? exercise.name : '')}
                        </Typography>
                    );
                })}
            </Stack>
        </>
    );
};

export default DisplayWorkoutExercises;
