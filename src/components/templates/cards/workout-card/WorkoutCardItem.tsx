import * as React from 'react';
import { FC } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Workout } from '../../../../model/Workout.model';
import { PlayArrow } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { toStartWorkout as navigateToStartWorkout } from '../../../../util/navigation-util';
import { useHistory } from 'react-router-dom';

type WorkoutCardItemProps = {
    workout: Workout;
};
const WorkoutCardItem: FC<WorkoutCardItemProps> = ({ workout }: WorkoutCardItemProps) => {
    const { t } = useTranslation();
    const history = useHistory();
    const goToWorkout = () => workout.id && navigateToStartWorkout(history, workout.id);

    return (
        <ListItem key={workout.id} disablePadding sx={{ marginBottom: 1 }}>
            <Tooltip arrow title={t('page.dashboard.workout.tooltip') as string}>
                <ListItemButton onClick={goToWorkout}>
                    <ListItemIcon>
                        <PlayArrow color={'success'} />
                    </ListItemIcon>
                    <ListItemText primary={workout.name} />
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
};

export default WorkoutCardItem;
