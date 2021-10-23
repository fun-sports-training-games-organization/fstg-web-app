import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';

type Props = {
    color?: string;
    icon?: React.ReactNode;
};

const IdpLoginButton: FC<Props & Omit<ButtonProps, 'color'>> = (props) => {
    const { color, icon, ...rest } = props;
    return (
        <Button
            style={{
                backgroundColor: color,
                borderRadius: 0,
                textTransform: 'none',
                width: '250px'
            }}
            variant={'contained'}
            startIcon={icon}
            {...rest}
        />
    );
};

export default IdpLoginButton;
