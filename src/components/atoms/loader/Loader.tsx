import React from 'react';
import { Grid, OutlinedInputProps } from '@mui/material';
import './Loader.scss';

type OwnProps = {
    testId?: string;
};

export type LoaderProps = OwnProps & OutlinedInputProps;

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
