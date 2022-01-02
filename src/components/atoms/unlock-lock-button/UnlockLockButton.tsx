import { Lock, LockOpen } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type UnlockLockButtonProps = {
    isLocked?: boolean;
    disabled?: boolean;
    handleClick?: () => void;
};

const UnlockLockButton = ({ isLocked = true, disabled = false, handleClick }: UnlockLockButtonProps): JSX.Element => {
    const unlockButton = () => {
        return (
            <IconButton onClick={() => handleClick && handleClick()} disabled={disabled}>
                <LockOpen htmlColor={'black'} transform="scale(2)" />
            </IconButton>
        );
    };
    const lockButton = () => {
        return (
            <IconButton onClick={() => handleClick && handleClick()} disabled={disabled}>
                <Lock htmlColor={'black'} transform="scale(2)" />
            </IconButton>
        );
    };
    return isLocked ? lockButton() : unlockButton();
};

export default UnlockLockButton;
