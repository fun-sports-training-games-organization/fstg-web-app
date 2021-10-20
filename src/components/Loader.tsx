import { Grid } from '@mui/material';
import { FC } from 'react';
import './Loader.scss';

const Loader: FC = () => (
    <Grid
        container
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
