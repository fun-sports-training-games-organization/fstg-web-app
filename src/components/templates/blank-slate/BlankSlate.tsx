import { Button, Slide, Stack, Typography } from '@mui/material';
import { BlankSlateProps } from './BlankSlate.types';
import { FC } from 'react';
import PageTitle from '../../atoms/page-title/PageTitle';

const BlankSlate: FC<BlankSlateProps> = ({
    slideProps,
    imageAttributes,
    titleTranslateKey,
    message,
    buttonText,
    buttonAction
}: BlankSlateProps) => (
    <Slide direction={'up'} in={true} timeout={500} {...slideProps}>
        <Stack mt={2} spacing={2} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            {titleTranslateKey && <PageTitle translationKey={titleTranslateKey} />}
            {imageAttributes && <img alt={imageAttributes.alt} {...imageAttributes} />}
            {message && <Typography variant={'body1'}>{message}</Typography>}
            <Button color={'primary'} variant={'contained'} onClick={buttonAction}>
                {buttonText}
            </Button>
        </Stack>
    </Slide>
);

export default BlankSlate;
