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

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    exerciseId: string;
    name: string;
    setName: Dispatch<SetStateAction<string | undefined>>;
};

const FormDialog = ({ open, setOpen, name, setName, exerciseId }: Props): JSX.Element => {
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
                <DialogTitle>Edit Exercise</DialogTitle>
                <DialogContent>
                    <DialogContentText>You can update your exercise here.</DialogContentText>
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default FormDialog;
