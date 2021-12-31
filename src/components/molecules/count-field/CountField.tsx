import React, { FC } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

export type OwnProps = {
    min?: number;
    max?: number;
    value?: number;
    setValue: (value: number) => void;
};
const CountField: FC<OwnProps> = ({
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    value = 0,
    setValue
}: OwnProps) => {
    // const [val, setVal] = useState<number>(value);
    const handleDecrement = () => {
        if (value > min) {
            setValue(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            setValue(value + 1);
        }
    };

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button color={'primary'} onClick={handleDecrement}>
                <RemoveIcon />
            </Button>
            <Button style={{ color: '#00000080', border: '1px solid #00000080' }} color={'primary'} disabled>
                {value}
            </Button>
            <Button color={'primary'} onClick={handleIncrement}>
                <AddIcon />
            </Button>
        </ButtonGroup>
    );
};

export default CountField;
