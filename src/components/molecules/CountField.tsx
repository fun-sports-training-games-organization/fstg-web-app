import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

export type OwnProps = {
    min?: number;
    max?: number;
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
};
const CountField: FC<OwnProps> = ({
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    value = 0,
    setValue
}: OwnProps) => {
    const handleDecrement = () => {
        if (value > min) {
            setValue((value: number) => value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            setValue((value: number) => value + 1);
        }
    };

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button color={'primary'} onClick={handleDecrement}>
                <RemoveIcon />
            </Button>
            <Button style={{ color: '#1976d2', border: '1px solid #1976d290' }} color={'primary'} disabled>
                {value}
            </Button>
            <Button color={'primary'} onClick={handleIncrement}>
                <AddIcon />
            </Button>
        </ButtonGroup>
    );
};

export default CountField;
