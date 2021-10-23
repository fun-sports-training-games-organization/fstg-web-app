import { Card, CardContent, CardHeader } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface AuthContainerProps {
    header: string | ReactNode;
}

const AuthContainer: FC<AuthContainerProps> = (props) => {
    const { header, children } = props;
    return (
        <Card
            sx={{
                maxWidth: 500
            }}
        >
            <CardHeader sx={{ textAlign: 'center' }} title={header} />
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default AuthContainer;
