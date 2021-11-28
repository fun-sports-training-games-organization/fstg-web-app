import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { LoginProvider, useAuth } from '../../../contexts/AuthContextProvider';

const ProviderLoginButton: FC<LoginProvider & Omit<ButtonProps, 'color'>> = (props) => {
    const { color, icon, name, ...rest } = props;
    const { loginWith } = useAuth();
    return (
        <Button
            style={{
                backgroundColor: color,
                borderRadius: 0,
                textTransform: 'none',
                width: '100%'
            }}
            data-cy={`login-with-${name}`}
            variant={'contained'}
            startIcon={icon}
            onClick={() => loginWith(name)}
            {...rest}
        />
    );
};

export default ProviderLoginButton;
