import { FC, useEffect, useState } from 'react';
import { Exercise } from '../../../../model/Exercise.model';
import { ListItem, ListItemIcon, ListItemText, Theme, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { FitnessCenter } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

type ExerciseCardItemProps = {
    exercise: Exercise;
};
const ExerciseCardItem: FC<ExerciseCardItemProps> = ({ exercise }: ExerciseCardItemProps) => {
    const [image, setImage] = useState<string>();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const iconSize = smDown ? 35 : 50;
    const { t } = useTranslation();

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
                    <img style={{ height: iconSize, width: iconSize }} src={image} alt={exercise.name} />
                ) : (
                    <FitnessCenter sx={{ height: iconSize, width: iconSize }} />
                )}
            </ListItemIcon>
            <ListItemText primary={t(exercise.name ? exercise.name : '')} />
        </ListItem>
    );
};

export default ExerciseCardItem;
