import React from 'react';
import { OutlinedInputProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TypographyOverrideable } from '../typography-overrideable/TypographyOverridable';

type OwnProps = {
    translationKey: string;
};

export type PageTitleProps = OwnProps & OutlinedInputProps;

const PageTitle = ({ translationKey }: PageTitleProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <TypographyOverrideable fontSize={'twentySix'} fontWeight={'sixHundred'} variant="h5">
            {t(translationKey)}
        </TypographyOverrideable>
    );
};

export default PageTitle;
