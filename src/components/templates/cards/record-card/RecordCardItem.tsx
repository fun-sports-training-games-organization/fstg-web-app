import * as React from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { WorkoutResult } from '../../../../model/Workout.model';
import { useTranslation } from 'react-i18next';
import { formatSecondsValueInHoursMinutesAndSeconds } from '../../../../util/date-util';
import { RecordType } from '../../../../model/Basics.model';
import NumbersIcon from '@mui/icons-material/Numbers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotYetImplementedDialog from '../../../molecules/not-yet-implemented-dialog/NotYetImplementedDialog';

type WorkoutCardItemProps = {
    workoutResult: WorkoutResult;
};
const RecordCardItem: FC<WorkoutCardItemProps> = ({ workoutResult }: WorkoutCardItemProps) => {
    const { t } = useTranslation();
    const value = workoutResult.exercises.map((e) => (e.resultValue ? e.resultValue : 0)).reduce((a, b) => a + b, 0);
    const resultType: RecordType =
        workoutResult.exercises.length > 0 && workoutResult.exercises[0].resultType === 'TIME_BASED'
            ? 'TIME_BASED'
            : 'COUNT_BASED';
    const formattedValue = resultType === 'TIME_BASED' ? formatSecondsValueInHoursMinutesAndSeconds(value) : value;
    const name = workoutResult.name ? workoutResult.name : '';
    const [isNotYetImplementedDialogOpen, setIsNotYetImplementedDialogOpen] = useState<boolean>(false);

    return (
        <>
            <ListItem key={workoutResult.id} disablePadding sx={{ marginBottom: 1 }}>
                <Tooltip arrow title={t('global.notYetImplemented') as string}>
                    <ListItemButton onClick={() => setIsNotYetImplementedDialogOpen(true)}>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={12} sm={6}>
                                <ListItemText primary={`${name}${t('global.colon')}`} />
                            </Grid>
                            <Grid item xs={12} sm={6} display="flex" flexDirection="row" justifyContent="flex-start">
                                <ListItemIcon sx={{ minWidth: '2rem' }}>
                                    {resultType === 'COUNT_BASED' ? <NumbersIcon /> : <AccessTimeIcon />}
                                </ListItemIcon>
                                <Typography>{formattedValue}</Typography>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </Tooltip>
            </ListItem>
            <NotYetImplementedDialog
                open={isNotYetImplementedDialogOpen}
                onClose={() => setIsNotYetImplementedDialogOpen(false)}
            ></NotYetImplementedDialog>
        </>
    );
};

export default RecordCardItem;
