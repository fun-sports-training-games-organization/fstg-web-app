import React from 'react';
import { IconButton, OutlinedInputProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type OwnProps = {
    onClick: () => void;
    testId?: string;
    fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
};

export type AddButtonProps = OwnProps & OutlinedInputProps;

const AddButton = ({ onClick, testId = 'add_button', fontSize = 'large' }: AddButtonProps): JSX.Element => {
    return (
        <IconButton data-testid={testId} onClick={onClick}>
            <AddIcon fontSize={fontSize} />
        </IconButton>
    );
};

export default AddButton;
