import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
    clickFunction: () => void;
    fontSize: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

const AddButton = ({ clickFunction, fontSize }: Props): JSX.Element => {
    return (
        <IconButton onClick={clickFunction}>
            <AddIcon fontSize={fontSize} />
        </IconButton>
    );
};

export default AddButton;
