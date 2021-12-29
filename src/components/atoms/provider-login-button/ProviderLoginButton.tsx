import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { LoginProvider, Provider } from '../../../contexts/AuthContextProvider';

type OwnProps = {
    useAuth: () => { loginWith: (provider: Provider) => void };
};

export type ProviderLoginProps = OwnProps & LoginProvider & Omit<ButtonProps, 'color'>;

const ProviderLoginButton: FC<ProviderLoginProps> = (props) => {
    const { color, icon, name, useAuth, ...rest } = props;
    const { loginWith } = useAuth();
    return (
        <Button
            style={{
                backgroundColor: color,
                borderRadius: 4,
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
