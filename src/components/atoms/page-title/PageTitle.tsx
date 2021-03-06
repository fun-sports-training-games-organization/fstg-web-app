import React from 'react';
import { OutlinedInputProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TypographyOverrideable } from '../typography-overrideable/TypographyOverridable';

type OwnProps = {
    translationKey: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
};

export type PageTitleProps = OwnProps & OutlinedInputProps;

const PageTitle = ({ translationKey, align }: PageTitleProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <TypographyOverrideable align={align} fontSize={'twentySix'} fontWeight={'sixHundred'} variant="h5">
            {t(translationKey)}
        </TypographyOverrideable>
    );
};

export default PageTitle;
