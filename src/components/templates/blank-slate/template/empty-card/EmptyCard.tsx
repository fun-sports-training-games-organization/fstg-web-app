import DashboardCard from '../../../cards/dashboard-card/DashboardCard';
import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import { DraggableProps } from '../../../cards/dashboard-card/DashboardCard.types';

type EmptyCardProps = {
    title: string | ReactNode;
    message: string | ReactNode;
    buttonText: string;
    buttonAction: () => void;
};

const EmptyCard: FC<EmptyCardProps & DraggableProps> = ({
    title,
    message,
    buttonText,
    buttonAction,
    id,
    index,
    moveCard
}: EmptyCardProps & DraggableProps) => {
    return (
        <DashboardCard
            id={id}
            index={index}
            moveCard={moveCard}
            cardProps={{ elevation: 5 }}
            cardHeaderProps={{ title }}
            cardActionsProps={{
                children: (
                    <Button variant={'contained'} fullWidth onClick={buttonAction}>
                        {buttonText}
                    </Button>
                )
            }}
        >
            {message}
        </DashboardCard>
    );
};

export default EmptyCard;
