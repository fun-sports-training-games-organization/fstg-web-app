import { Grid, Stack } from '@mui/material';
import AddButton from '../atoms/AddButton/AddButton';
import PageTitle from '../atoms/PageTitle';

type Props = {
    onClick: () => void;
    titleTranslationKey: string;
    idPrefix: string;
};

const PageTitleAdd = ({ onClick, titleTranslationKey, idPrefix }: Props): JSX.Element => {
    return (
        <Stack data-testid={`${idPrefix}title_add`} ml={2} mr={2} mt={3}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={9}>
                    <PageTitle translationKey={titleTranslationKey}></PageTitle>
                </Grid>
                <Grid item xs={2}>
                    <AddButton onClick={onClick} testId={`${idPrefix}add_button`} />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default PageTitleAdd;
