import { Grid, GridSize } from '@mui/material';
import { FC, PropsWithChildren, RefObject } from 'react';

type Props = {
    ref?: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined;
    xs?: boolean | GridSize;
    sm?: boolean | GridSize;
    md?: boolean | GridSize;
    lg?: boolean | GridSize;
    xl?: boolean | GridSize;
};

const ResponsiveContainer: FC<Props> = ({
    ref,
    xs = 12,
    sm = 10,
    md = 8,
    lg = 6,
    xl = 4,
    children
}: PropsWithChildren<Props>) => (
    <Grid ref={ref} container justifyContent="center">
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            {children}
        </Grid>
    </Grid>
);
export default ResponsiveContainer;
