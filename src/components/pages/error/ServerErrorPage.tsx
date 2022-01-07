import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import ResponsiveContainer from '../../templates/containers/responsive-container/ResponsiveContainer';

const ServerErrorPage: FC = (): JSX.Element => (
    <ResponsiveContainer>
        <Stack spacing={3} mt={3}>
            <Typography variant={'h3'}>500 Internal Server Error</Typography>
            <Typography variant={'body1'}>
                Sorry, it seems as though you have encountered a server error! Please try again later or contact support
                for help <a href={'/contact'}>here</a>!
            </Typography>
        </Stack>
    </ResponsiveContainer>
);
export default ServerErrorPage;
