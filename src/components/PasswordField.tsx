import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons';
import { FormControl, InputLabel, OutlinedInput, OutlinedInputProps } from '@material-ui/core';

const PasswordField: FC<OutlinedInputProps> = (props) => {
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
                id={'show-hide-password-toggle-button'}
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

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <OutlinedInput endAdornment={inputAdornment} type={showPassword ? 'text' : 'password'} {...props} />
        </FormControl>
    );
};

export default PasswordField;
