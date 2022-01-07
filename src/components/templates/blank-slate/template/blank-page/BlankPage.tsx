import { Button, Slide, Stack, Typography } from '@mui/material';
import { BlankPageProps } from './BlankPageProps.types';
import { FC } from 'react';
import PageTitle from '../../../../atoms/page-title/PageTitle';

const BlankPage: FC<BlankPageProps> = ({
    slideProps,
    imageAttributes,
    titleTranslateKey,
    message,
    buttonText,
    buttonAction
}: BlankPageProps) => (
    <Slide direction={'up'} in={true} timeout={500} {...slideProps}>
        <Stack padding={1} mt={2} spacing={2} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            {titleTranslateKey && <PageTitle translationKey={titleTranslateKey} />}
            {imageAttributes && <img alt={imageAttributes.alt} {...imageAttributes} />}
            {message && <Typography variant={'body1'}>{message}</Typography>}
            <Button color={'primary'} variant={'contained'} onClick={buttonAction}>
                {buttonText}
            </Button>
        </Stack>
    </Slide>
);

export default BlankPage;
