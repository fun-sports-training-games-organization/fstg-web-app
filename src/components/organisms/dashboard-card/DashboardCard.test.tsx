import { DirectionsRun, FitnessCenter, MoreVert, Pool } from '@mui/icons-material';
import { Meta } from '@storybook/react';
import React from 'react';
import MenuButton from '../menu-button/MenuButton';
import DashboardCard from './DashboardCard';
import { DashboardCardProps } from './DashboardCard.types';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import ExerciseIcon from '../../../assets/exercise.png';
import { render } from '@testing-library/react';
import AddButton from '../../atoms/add-button/AddButton';

describe('<AddButton> component test with React Testing Library', () => {
    let props: DashboardCardProps;
    beforeEach(() => {
        props = {
            cardProps: { sx: { maxWidth: 400 } },
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
            <DashboardCard data-testid={'test-dashboard-card'} {...props}>
                <Grid
                    container
                    spacing={1}
                    alignItems={'center'}
                    alignContent={'center'}
                    justifyContent={'space-between'}
                >
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
