import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    onClick: () => void;
    testId?: string;
    fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

const AddButton = ({ onClick, testId = 'add_button', fontSize = 'large' }: Props): JSX.Element => {
    return (
        <IconButton data-testid={testId} onClick={onClick}>
            <AddIcon fontSize={fontSize} />
        </IconButton>
    );
};

export default AddButton;
