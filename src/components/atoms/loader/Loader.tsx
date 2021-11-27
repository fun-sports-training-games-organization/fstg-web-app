import React from 'react';
import { Grid } from '@mui/material';
import './Loader.scss';

export type LoaderProps = {
    testId?: string;
};

const Loader = ({ testId }: LoaderProps): JSX.Element => (
    <Grid
        container
        data-testid={testId}
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
    >
        <div className="spinning-loader-container">
            <div className="spinning-loader">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    </Grid>
);

export default Loader;
