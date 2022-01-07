import * as React from 'react';
import { FC } from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Workout } from '../../../../model/Workout.model';

type WorkoutCardItemProps = {
    workout: Workout;
};
const WorkoutCardItem: FC<WorkoutCardItemProps> = ({ workout }: WorkoutCardItemProps) => {
    return (
        <ListItem key={workout.id} disablePadding>
            <ListItemText primary={workout.name} />
        </ListItem>
    );
};

export default WorkoutCardItem;
