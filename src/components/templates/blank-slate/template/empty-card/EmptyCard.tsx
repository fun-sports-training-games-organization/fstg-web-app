import DashboardCard from '../../../cards/dashboard-card/DashboardCard';
import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';

type EmptyCardProps = {
    title: string | ReactNode;
    message: string | ReactNode;
    buttonText: string;
    buttonAction: () => void;
};

const EmptyCard: FC<EmptyCardProps> = ({ title, message, buttonText, buttonAction }: EmptyCardProps) => {
    return (
        <DashboardCard
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
