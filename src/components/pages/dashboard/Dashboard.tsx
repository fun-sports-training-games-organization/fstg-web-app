import * as React from 'react';
import { Stack } from '@mui/material';
import ResponsiveContainer from '../../templates/containers/responsive-container/ResponsiveContainer';
import ExerciseCard from '../../templates/cards/exercise-card/ExerciseCard';
import WorkoutCard from '../../templates/cards/workout-card/WorkoutCard';
// import StatisticsCard from '../../templates/cards/statistics-card/StatisticsCard';

const Dashboard = () => {
    return (
        <ResponsiveContainer>
            <Stack spacing={2} padding={2}>
                <WorkoutCard />
                <ExerciseCard />
                {/*<StatisticsCard />*/}
            </Stack>
        </ResponsiveContainer>
    );
};

export default Dashboard;
