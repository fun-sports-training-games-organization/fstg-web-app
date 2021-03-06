import { SlideProps } from '@mui/material';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type BlankPageProps = {
    slideProps?: Omit<SlideProps, 'children'>;
    imageAttributes?: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    titleTranslateKey?: string;
    message?: string;
    buttonText: string;
    buttonAction: () => void;
};
