import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useTranslation } from 'react-i18next';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    exerciseId: string;
    name: string;
    setName: Dispatch<SetStateAction<string | undefined>>;
    title: string;
    message: string;
};

const FormDialog = ({ open, setOpen, title, message, name, setName, exerciseId }: Props): JSX.Element => {
    const { t } = useTranslation();
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const docRef = doc(db, 'exercises', exerciseId);
        await updateDoc(docRef, { name });
        setOpen(false);
    };

    return (
        <div>
            {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
            {/*    Open form dialog*/}
            {/*</Button>*/}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Exercise Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('global.cancel')}</Button>
                    <Button onClick={handleSave}>{t('global.save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default FormDialog;
