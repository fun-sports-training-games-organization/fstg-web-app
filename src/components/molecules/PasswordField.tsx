import React, { FC } from 'react';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import TextField, { TextFieldProps } from '../atoms/TextField';

const PasswordField: FC<TextFieldProps> = (props) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    const inputAdornment = (
        <InputAdornment position="end">
            <IconButton
                data-testid={'show-hide-password-toggle-button'}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disableFocusRipple
                disableRipple
                edge="end"
                tabIndex={-1}
            >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
        </InputAdornment>
    );

    return <TextField endAdornment={inputAdornment} type={showPassword ? 'text' : 'password'} {...props} />;
};

export default PasswordField;
