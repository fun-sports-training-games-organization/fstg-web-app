import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExerciseIcon from '../../../../assets/exercise.png';
import { DirectionsRun, FitnessCenter, Pool } from '@mui/icons-material';
import DashboardCard from '../dashboard-card/DashboardCard';
import * as React from 'react';
import { FC } from 'react';
import { DraggableProps } from '../dashboard-card/DashboardCard.types';

const StatisticsCard: FC<DraggableProps> = ({ id, index, moveCard }: DraggableProps): JSX.Element => {
    return (
        <DashboardCard
            id={id}
            index={index}
            moveCard={moveCard}
            cardProps={{ elevation: 5 }}
            cardHeaderProps={{ title: 'Statistics' }}
        >
            <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'space-between'}>
                <Grid item xs={4}>
                    <img
                        style={{ verticalAlign: 'center', textAlign: 'center' }}
                        src={ExerciseIcon}
                        alt={'exercise icon'}
                        width={75}
                        height={75}
                    />
                </Grid>
                <Grid item xs={8}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FitnessCenter />
                                </ListItemIcon>
                                <ListItemText primary="Lunges" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DirectionsRun />
                                </ListItemIcon>
                                <ListItemText primary="Sit Ups" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Pool />
                                </ListItemIcon>
                                <ListItemText primary="Push-Ups" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="See More..." />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default StatisticsCard;
