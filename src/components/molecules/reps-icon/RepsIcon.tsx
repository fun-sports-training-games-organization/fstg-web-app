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
};
const RepsIcon: FC<RepsIconProps> = ({ entities, id, parentIdPrefix, index = 0, type, display }: RepsIconProps) => {
    return !type ? (
        <Stack direction="row" alignItems="end" spacing={1} display={display}>
            <Typography key={id} id={`${parentIdPrefix}__reps__${index}`}>
                {getTotalReps(entities)}
            </Typography>
            <NumbersIcon />
        </Stack>
    ) : null;
};

export default RepsIcon;
