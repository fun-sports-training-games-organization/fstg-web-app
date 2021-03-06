import * as React from 'react';
import { FC, useState } from 'react';
import { Avatar, Button, Grid, List, ListItem, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashboardCard from '../dashboard-card/DashboardCard';
import EmptyCard from '../../blank-slate/template/empty-card/EmptyCard';
import { useTranslation } from 'react-i18next';
import useEntityManager from '../../../../hooks/useEntityManager';
import PageTitle from '../../../atoms/page-title/PageTitle';
import RecordCardItem from './RecordCardItem';
import { WorkoutResult } from '../../../../model/Workout.model';
import Loader from '../../../atoms/loader/Loader';
import { getRecords } from '../../../../util/workout-util';
import NotYetImplementedDialog from '../../../molecules/not-yet-implemented-dialog/NotYetImplementedDialog';
import { toManageWorkouts } from '../../../../util/navigation-util';
import { DraggableProps } from '../dashboard-card/DashboardCard.types';

const RecordCard: FC<DraggableProps> = ({ id, index, moveCard }: DraggableProps): JSX.Element => {
    const { t } = useTranslation();
    const [isNotYetImplementedDialogOpen, setIsNotYetImplementedDialogOpen] = useState<boolean>(false);
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { entities: workoutResults, loading } = useEntityManager<WorkoutResult>('workoutResults', true);
    const RecordsTitle = <PageTitle translationKey={'page.statistics.records.title'} align={'center'} />;
    return loading ? (
        <Loader />
    ) : workoutResults.length > 0 ? (
        <>
            <DashboardCard
                id={id}
                index={index}
                moveCard={moveCard}
                cardProps={{ elevation: 5 }}
                cardHeaderProps={{ title: RecordsTitle, ...(smDown && { sx: { paddingBottom: 0 } }) }}
                cardContentProps={smDown ? { sx: { paddingTop: 0 } } : undefined}
            >
                <Grid
                    container
                    spacing={1}
                    alignItems={'center'}
                    alignContent={'center'}
                    justifyContent={'space-between'}
                >
                    <Grid item md={1} />
                    <Grid item xs={4}>
                        <EmojiEventsIcon
                            sx={{
                                transform: { xs: 'scale(5)', sm: 'scale(6)', md: 'scale(8)' },
                                marginLeft: { xs: 4, md: 5 },
                                color: 'gold'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            {getRecords(workoutResults)
                                .slice(0, 3)
                                .map((workoutResult) => (
                                    <RecordCardItem key={workoutResult.id} workoutResult={workoutResult} />
                                ))}
                            <ListItem disablePadding sx={{ marginTop: 1 }}>
                                <Button
                                    fullWidth
                                    style={{ textTransform: 'none' }}
                                    variant={'contained'}
                                    onClick={() => setIsNotYetImplementedDialogOpen(true)}
                                    color={'primary'}
                                >
                                    {t('page.dashboard.showMore')}
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </DashboardCard>
            <NotYetImplementedDialog
                open={isNotYetImplementedDialogOpen}
                onClose={() => setIsNotYetImplementedDialogOpen(false)}
            ></NotYetImplementedDialog>
        </>
    ) : (
        <EmptyCard
            id={id}
            index={index}
            moveCard={moveCard}
            title={RecordsTitle}
            message={
                <Stack spacing={2} alignItems={'center'}>
                    <Avatar style={{ height: 200, width: 200, padding: 25, background: '#63a5f5' }}>
                        <EmojiEventsIcon
                            sx={{
                                transform: { xs: 'scale(5)', sm: 'scale(6)', md: 'scale(8)' },
                                color: 'gold'
                            }}
                        />
                    </Avatar>
                    <Typography align={'justify'} variant={'body1'}>
                        {t('page.statistics.records.message')}
                    </Typography>
                </Stack>
            }
            buttonText={t('page.statistics.records.button')}
            buttonAction={toManageWorkouts}
        />
    );
};

export default RecordCard;
