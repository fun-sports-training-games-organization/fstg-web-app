import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { getNumber } from '../../../util/number-util';
import NumbersIcon from '@mui/icons-material/Numbers';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';

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
    const getTotalReps = (): number => {
        return entities
            .filter((entity) => entity.amountType === 'COUNT_BASED')
            .map((entity) => getNumber(entity.amountValue))
            .reduce((a, b) => a + b, 0);
    };

    return !type ? (
        <Stack direction="row" alignItems="end" spacing={1} display={display}>
            <Typography key={id} id={`${parentIdPrefix}__reps__${index}`}>
                {getTotalReps()}
            </Typography>
            <NumbersIcon></NumbersIcon>
        </Stack>
    ) : null;
};

export default RepsIcon;
