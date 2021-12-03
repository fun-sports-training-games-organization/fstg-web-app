import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FC } from 'react';

type OwnProps = {
    label?: string;
};
const LabeledCheckbox: FC<OwnProps & CheckboxProps> = ({ label, ...rest }: OwnProps & CheckboxProps) => {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox {...rest} />} label={label} />
        </FormGroup>
    );
};

export default LabeledCheckbox;
