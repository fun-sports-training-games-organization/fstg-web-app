import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { DashboardCardProps } from './DashboardCard.types';

const DashboardCard: FC<PropsWithChildren<DashboardCardProps>> = ({
    cardProps,
    cardHeaderProps,
    cardMediaProps,
    cardContentProps,
    cardActionsProps,
    children
}: PropsWithChildren<DashboardCardProps>) => {
    return (
        <Card {...cardProps}>
            {cardHeaderProps && <CardHeader {...cardHeaderProps} />}
            {cardMediaProps && <CardMedia {...cardMediaProps} />}
            <CardContent {...cardContentProps}>{children}</CardContent>
            {cardActionsProps && <CardActions {...cardActionsProps}></CardActions>}
        </Card>
    );
};

export default DashboardCard;
