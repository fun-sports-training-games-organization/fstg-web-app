import React, { FC, SyntheticEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
// import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DraggableConfirmationDialogProps {
    title: string | JSX.Element;
    message: string | JSX.Element;
    open?: boolean;
    onClose: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

function PaperComponent(props: PaperProps): JSX.Element {
    return (
        // <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} sx={{ padding: 2 }} />
        // </Draggable>
    );
}

const DraggableConfirmationDialog: FC<DraggableConfirmationDialogProps> = (props): JSX.Element => {
    const { t } = useTranslation();
    const { title, message, open, onClose } = props;
    return (
        <Dialog
            open={!!open}
            onClose={onClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    id={'cancel-button'}
                    value={'cancel'}
                    onClick={onClose}
                    variant={'contained'}
                    color={'secondary'}
                >
                    {t('global.cancel')}
                </Button>
                <Button id={'confirm-button'} value={'confirm'} onClick={onClose} variant={'outlined'} color="primary">
                    {t('global.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DraggableConfirmationDialog;
