import React, { FC } from 'react';
import { LoadingButton as MULoadingButton, LoadingButtonProps } from '@mui/lab';

const LoadingButton: FC<LoadingButtonProps> = (props: LoadingButtonProps): JSX.Element => (
    <MULoadingButton
        loadingPosition="start"
        type={'submit'}
        variant={'contained'}
        color={'primary'}
        fullWidth
        {...props}
    >
        {props.children}
    </MULoadingButton>
);

export default LoadingButton;
