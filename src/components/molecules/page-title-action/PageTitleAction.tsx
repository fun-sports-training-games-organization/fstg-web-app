/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Stack } from '@mui/material';
import { ResponsiveStyleValue, Theme } from '@mui/system';
import { ReactNode } from 'react';
import PageTitle from '../../atoms/page-title/PageTitle';

type Props = {
    preTitleActionButton?: ReactNode;
    postTitleActionButton?: ReactNode;
    titleTranslationKey: string;
    idPrefix: string;
    ml?: string | number;
    mr?: string | number;
    mt?: string | number;
    pt?: string | number;
    position?:
        | ResponsiveStyleValue<any | (any | undefined)[] | undefined>
        | ((theme: Theme) => ResponsiveStyleValue<any | (any | undefined)[] | undefined>);
    top?: ResponsiveStyleValue<any | any[] | undefined> | ((theme: Theme) => ResponsiveStyleValue<any>);
    height?: ResponsiveStyleValue<any | any[] | undefined> | ((theme: Theme) => ResponsiveStyleValue<any>);
    bgcolor?: ResponsiveStyleValue<any | any[] | undefined> | ((theme: Theme) => ResponsiveStyleValue<any>);
    maxTitleWidth?: ResponsiveStyleValue<any | any[] | undefined> | ((theme: Theme) => ResponsiveStyleValue<any>);
};

const PageTitleActionButton = ({
    preTitleActionButton,
    postTitleActionButton,
    titleTranslationKey,
    idPrefix,
    ml = 2,
    mr = 2,
    mt = 3,
    pt,
    position,
    top,
    height,
    bgcolor,
    maxTitleWidth
}: Props): JSX.Element => {
    return (
        <Stack
            data-testid={`${idPrefix}title_action`}
            ml={ml}
            mr={mr}
            mt={mt}
            pt={pt}
            position={position}
            top={top}
            height={height}
            bgcolor={bgcolor}
        >
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                {preTitleActionButton && <Grid item>{preTitleActionButton}</Grid>}
                <Grid maxWidth={maxTitleWidth} item>
                    <PageTitle translationKey={titleTranslationKey}></PageTitle>
                </Grid>
                {postTitleActionButton && <Grid item>{postTitleActionButton}</Grid>}
            </Grid>
        </Stack>
    );
};

export default PageTitleActionButton;
