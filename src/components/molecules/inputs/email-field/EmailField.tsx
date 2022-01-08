import React, { FC, useEffect, useState } from 'react';
import { CheckCircleOutline, WarningAmber } from '@mui/icons-material';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import TextField, { TextFieldProps } from '../text-field/TextField';
import { useAuth } from '../../../../contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';

const EmailField: FC<TextFieldProps> = (props) => {
    const { t } = useTranslation();
    const { user, sendVerificationEmail } = useAuth();
    const [emailIsVerified, setEmailIsVerified] = useState<boolean>();

    useEffect(() => {
        setEmailIsVerified(user?.emailVerified);
    }, [user?.emailVerified]);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        !emailIsVerified && sendVerificationEmail();
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    const inputAdornment = (
        <InputAdornment position="end">
            <Tooltip
                title={
                    emailIsVerified
                        ? (t('form.tooltip.account.emailVerified') as string)
                        : (t('form.tooltip.account.sendVerificationEmail') as string)
                }
            >
                <IconButton
                    data-testid={'show-hide-password-toggle-button'}
                    aria-label="toggle password visibility"
                    onClick={handleOnClick}
                    onMouseDown={handleMouseDownPassword}
                    disabled={emailIsVerified}
                    disableFocusRipple
                    disableRipple
                    edge="end"
                    tabIndex={-1}
                >
                    {emailIsVerified ? (
                        <CheckCircleOutline color={'success'} />
                    ) : (
                        <WarningAmber style={{ fill: 'orange' }} />
                    )}
                </IconButton>
            </Tooltip>
        </InputAdornment>
    );

    return <TextField readOnly endAdornment={inputAdornment} {...props} />;
};

export default EmailField;
