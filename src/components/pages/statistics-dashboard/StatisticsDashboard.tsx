import * as React from 'react';
import { Stack } from '@mui/material';
import ResponsiveContainer from '../../templates/containers/responsive-container/ResponsiveContainer';
import RecordCard from '../../templates/cards/record-card/RecordCard';

const StatisticsDashboard = (): JSX.Element => {
    return (
        <ResponsiveContainer>
            <Stack spacing={2} padding={2}>
                <RecordCard
                    id={1}
                    index={1}
                    moveCard={() => {
                        // will need to eventually implement this so that it can be re-arrangeable when there are more items here!
                    }}
                />
            </Stack>
        </ResponsiveContainer>
    );
};

export default StatisticsDashboard;
