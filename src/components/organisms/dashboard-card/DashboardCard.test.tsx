import { DirectionsRun, FitnessCenter, MoreVert, Pool } from '@mui/icons-material';
import React from 'react';
import MenuButton from '../menu-button/MenuButton';
import DashboardCard from './DashboardCard';
import { DashboardCardProps } from './DashboardCard.types';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { render } from '@testing-library/react';

describe('<DashboardCard> component test with React Testing Library', () => {
    let props: DashboardCardProps;
    beforeEach(() => {
        props = {
            cardProps: { sx: { maxWidth: 400 } },
            cardMediaProps: { sx: { maxWidth: 300 }, src: '../../../assets/exercise.png' },
            cardActionsProps: { sx: { maxWidth: 300 } },
            cardHeaderProps: {
                title: 'Exercises',
                action: (
                    <MenuButton
                        menuItems={[
                            { text: 'Edit', onClick: () => alert('Edit Clicked!'), icon: 'edit' },
                            { text: 'Delete', onClick: () => alert('Delete Clicked!'), icon: 'delete' }
                        ]}
                        buttonElement={<MoreVert />}
                    />
                )
            }
        };
    });

    const renderComponent = () =>
        render(
            <DashboardCard {...props}>
                <Grid
                    container
                    spacing={1}
                    alignItems={'center'}
                    alignContent={'center'}
                    justifyContent={'space-between'}
                >
                    <Grid item xs={8}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FitnessCenter />
                                    </ListItemIcon>
                                    <ListItemText primary="Weight Lifts" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DirectionsRun />
                                    </ListItemIcon>
                                    <ListItemText primary="Jogging" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Pool />
                                    </ListItemIcon>
                                    <ListItemText primary="Swimming" />
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

    it('should render without crashing', () => {
        const { container, getByText } = renderComponent();
        expect(container).toBeInTheDocument();
        expect(getByText('Exercises')).toBeInTheDocument();
    });
});
