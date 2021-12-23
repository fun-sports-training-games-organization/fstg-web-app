import { Grid, Stack } from '@mui/material';
import { ReactNode } from 'react';
import PageTitle from '../../atoms/page-title/PageTitle';

type Props = {
    actionButton: ReactNode;
    titleTranslationKey: string;
    idPrefix: string;
};

const PageTitleActionButton = ({ actionButton, titleTranslationKey, idPrefix }: Props): JSX.Element => {
    return (
        <Stack data-testid={`${idPrefix}title_action`} ml={2} mr={2} mt={3}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <PageTitle translationKey={titleTranslationKey}></PageTitle>
                </Grid>
                <Grid item>{actionButton}</Grid>
            </Grid>
        </Stack>
    );
};

export default PageTitleActionButton;
