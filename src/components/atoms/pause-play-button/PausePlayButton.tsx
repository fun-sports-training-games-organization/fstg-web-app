import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import theme from '../../../theme/theme';

type PausePlayButtonProps = {
    isRunning?: boolean;
    disabled?: boolean;
    handleClick?: () => void;
};

const PausePlayButton = ({ isRunning = true, disabled = false, handleClick }: PausePlayButtonProps): JSX.Element => {
    const getButtonColor = (): string => {
        return disabled ? theme.palette.grey[500] : 'black';
    };
    const playButton = () => {
        return (
            <IconButton onClick={() => handleClick && handleClick()} disabled={disabled}>
                <PlayArrow htmlColor={getButtonColor()} transform="scale(2)" />
            </IconButton>
        );
    };
    const pauseButton = () => {
        return (
            <IconButton onClick={() => handleClick && handleClick()} disabled={disabled}>
                <Pause htmlColor={getButtonColor()} transform="scale(2)" />
            </IconButton>
        );
    };
    return isRunning ? pauseButton() : playButton();
};

export default PausePlayButton;
