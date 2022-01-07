import { FC, useEffect, useState } from 'react';
import { Exercise } from '../../../../model/Exercise.model';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import { FitnessCenter } from '@mui/icons-material';

type ExerciseCardItemProps = {
    exercise: Exercise;
};
const ExerciseCardItem: FC<ExerciseCardItemProps> = ({ exercise }: ExerciseCardItemProps) => {
    const [image, setImage] = useState<string>();
    useEffect(() => {
        import(`../../../../assets/exercise/icons/${exercise.name?.toLowerCase().trim().split(' ').join('_')}.png`)
            .then((image: { default: string }) => setImage(image.default))
            .catch(() => {
                setImage(undefined);
            });
    }, [exercise.name]);

    return (
        <ListItem key={exercise.id} disablePadding>
            <ListItemIcon>
                {image ? (
                    <img style={{ height: 50, width: 50 }} src={image} alt={exercise.name} />
                ) : (
                    <FitnessCenter sx={{ height: 50, width: 50 }} />
                )}
            </ListItemIcon>
            <ListItemText primary={exercise.name} />
        </ListItem>
    );
};

export default ExerciseCardItem;
