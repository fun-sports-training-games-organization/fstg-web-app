import React, { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

export interface AuthContainerProps {
    header: string | ReactNode;
}

const AuthContainer: FC<AuthContainerProps> = (props) => {
    const { header, children } = props;
    return (
        <Card
            sx={{
                maxWidth: 500,
                width: '100%'
            }}
        >
            <CardHeader title={header} />
            <CardContent
                sx={{
                    padding: 0,
                    '&:last-child': {
                        paddingBottom: 0
                    }
                }}
            >
                {children}
            </CardContent>
        </Card>
    );
};

export default AuthContainer;
