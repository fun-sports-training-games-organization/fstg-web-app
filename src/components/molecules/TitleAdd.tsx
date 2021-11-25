import { Grid, Stack } from '@mui/material';
import AddButton from '../atoms/AddButton';
import Title from '../atoms/Title';

type Props = {
    onClick: () => void;
    titleTranslationKey: string;
    idPrefix: string;
};

const TitleAdd = ({ onClick, titleTranslationKey, idPrefix }: Props): JSX.Element => {
    return (
        <Stack data-testid={`${idPrefix}title_add`} ml={2} mr={2} mt={3}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={9}>
                    <Title translationKey={titleTranslationKey}></Title>
                </Grid>
                <Grid item xs={2}>
                    <AddButton onClick={onClick} testId={`${idPrefix}add_button`} />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default TitleAdd;
