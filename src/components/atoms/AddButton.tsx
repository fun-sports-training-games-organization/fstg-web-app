import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    clickFunction: () => void;
    fontSize: 'small' | 'inherit' | 'large' | 'medium' | undefined;
    testId?: string;
};

const AddButton = ({ testId = 'add_button', clickFunction, fontSize }: Props): JSX.Element => {
    return (
        <IconButton data-testid={testId} onClick={clickFunction}>
            <AddIcon fontSize={fontSize} />
        </IconButton>
    );
};

export default AddButton;
