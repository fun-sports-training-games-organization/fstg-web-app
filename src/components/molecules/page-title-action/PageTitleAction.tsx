import { Grid, Stack } from '@mui/material';
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
};

const PageTitleActionButton = ({
    preTitleActionButton,
    postTitleActionButton,
    titleTranslationKey,
    idPrefix,
    ml = 2,
    mr = 2,
    mt = 3
}: Props): JSX.Element => {
    return (
        <Stack data-testid={`${idPrefix}title_action`} ml={ml} mr={mr} mt={mt}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                {preTitleActionButton && <Grid item>{preTitleActionButton}</Grid>}
                <Grid item>
                    <PageTitle translationKey={titleTranslationKey}></PageTitle>
                </Grid>
                {postTitleActionButton && <Grid item>{postTitleActionButton}</Grid>}
            </Grid>
        </Stack>
    );
};

export default PageTitleActionButton;
