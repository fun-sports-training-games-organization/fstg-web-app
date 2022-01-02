import { CardHeaderProps, CardActionsProps, CardMediaProps, CardProps, CardContentProps } from '@mui/material';
import { ReactNode } from 'react';

type OwnProps = {
    cardProps?: CardProps;
    cardHeaderProps?: CardHeaderProps;
    cardMediaProps?: CardMediaProps;
    cardContentProps?: CardContentProps;
    cardActionsProps?: CardActionsProps;
    cardActionChildren?: JSX.Element | ReactNode;
};

export type DashboardCardProps = OwnProps;
