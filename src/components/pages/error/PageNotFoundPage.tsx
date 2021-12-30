import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import ResponsiveContainer from '../../organisms/responsive-container/ResponsiveContainer';

const PageNotFoundPage: FC = (): JSX.Element => (
    <ResponsiveContainer>
        <Stack spacing={3} mt={3}>
            <Typography variant={'h3'}>Page not found! (404)</Typography>
            <Typography variant={'body1'}>
                Sorry, the page you are looking for does not exist! Click <a href={'/login'}>here</a> to continue!
            </Typography>
        </Stack>
    </ResponsiveContainer>
);
export default PageNotFoundPage;
