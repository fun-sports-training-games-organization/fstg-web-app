import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ResponsiveDialogProps } from './ResponsiveDialog.types';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface DialogTitleProps {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitleWithCloseButton = (props: DialogTitleProps) => {
    const theme = useTheme();
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle
            sx={{
                root: {
                    borderRadius: '0 !important',
                    margin: 0,
                    padding: theme.spacing(2)
                }
            }}
            {...other}
        >
            <Typography variant="h6">{children}</Typography>
            {onClose && (
                <IconButton
                    aria-label="close-button-icon"
                    sx={{
                        position: 'absolute',
                        right: theme.spacing(1),
                        top: theme.spacing(1),
                        color: theme.palette.grey[500]
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            )}
        </DialogTitle>
    );
};

const ResponsiveDialog: FC<ResponsiveDialogProps> = ({
    title,
    message,
    messageFontWeight,
    content,
    dialogActions,
    dialogActionsJustifyContent,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    autoFocus,
    onClose,
    showCloseButton,
    fullScreenOverride,
    ...rest
}: ResponsiveDialogProps) => {
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const fullScreen = fullScreenOverride === undefined ? isMdDown : fullScreenOverride;

    return (
        <Dialog fullScreen={fullScreen} onClose={onClose} aria-labelledby="responsive-dialog-title" {...rest}>
            {showCloseButton && onClose ? (
                <DialogTitleWithCloseButton id="responsive-dialog-title" onClose={onClose}>
                    {title}
                </DialogTitleWithCloseButton>
            ) : (
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            )}
            <DialogContent>
                {message && <DialogContentText fontWeight={messageFontWeight}>{message}</DialogContentText>}
                {typeof content === 'string' ? <DialogContentText>{content}</DialogContentText> : content}
            </DialogContent>
            {!showCloseButton && (
                <DialogActions sx={{ justifyContent: dialogActionsJustifyContent, width: '100%' }}>
                    {dialogActions ? (
                        dialogActions
                    ) : (
                        <Stack pr={2} pl={2} pb={2} spacing={1} sx={{ width: '100%' }}>
                            {cancelText && onCancel && (
                                <Button
                                    data-testid={'responsive-dialog-cancel-button'}
                                    color={'secondary'}
                                    onClick={() => {
                                        onCancel && onCancel();
                                    }}
                                    variant={'contained'}
                                    autoFocus={autoFocus === 'cancel'}
                                >
                                    {cancelText}
                                </Button>
                            )}
                            {confirmText && onConfirm && (
                                <Button
                                    data-testid={'responsive-dialog-confirm-button'}
                                    color={'primary'}
                                    onClick={onConfirm}
                                    variant={'contained'}
                                    autoFocus={autoFocus === 'confirm'}
                                >
                                    {confirmText}
                                </Button>
                            )}
                        </Stack>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ResponsiveDialog;
