import * as React from 'react';
import { Stack } from '@mui/material';
import ResponsiveContainer from '../../templates/containers/responsive-container/ResponsiveContainer';
import RecordCard from '../../templates/cards/record-card/RecordCard';
// import StatisticsCard from '../../templates/cards/statistics-card/StatisticsCard';

const statistics = (): JSX.Element => {
    return (
        <ResponsiveContainer>
            <Stack spacing={2} padding={2}>
                <RecordCard />
            </Stack>
        </ResponsiveContainer>
    );
};

export default statistics;
