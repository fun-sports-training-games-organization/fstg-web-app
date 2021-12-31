import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import NumbersIcon from '@mui/icons-material/Numbers';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';
import { getTotalReps } from '../../../util/number-util';

export type RepsIconProps = {
    entities: AmountTypeAmountValue[];
    id: string;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
    variant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'button'
        | 'overline'
        | 'inherit'
        | undefined;
};
const RepsIcon: FC<RepsIconProps> = ({
    entities,
    id,
    parentIdPrefix,
    index = 0,
    type,
    display,
    variant = undefined
}: RepsIconProps) => {
    return !type ? (
        <Stack direction="row" alignItems="center" spacing={1} display={display}>
            <Typography key={id} id={`${parentIdPrefix}__reps__${index}`} variant={variant}>
                {getTotalReps(entities)}
            </Typography>
            <NumbersIcon />
        </Stack>
    ) : null;
};

export default RepsIcon;
