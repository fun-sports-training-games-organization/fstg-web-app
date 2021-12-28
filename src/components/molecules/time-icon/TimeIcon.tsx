import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';
import { getFormattedTotalWorkoutTime } from '../../../util/date-util';

export type TimeIconProps = {
    entities: AmountTypeAmountValue[];
    id: string;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
};
const TimeIcon: FC<TimeIconProps> = ({ entities, id, parentIdPrefix, index = 0, type, display }: TimeIconProps) => {
    return !type || type === 'TIME_BASED' ? (
        <Stack direction="row" alignItems="end" spacing={1} display={display}>
            <Typography key={id} id={`${parentIdPrefix}__time__${index}`}>
                {getFormattedTotalWorkoutTime(entities)}
            </Typography>
            <QueryBuilderIcon />
        </Stack>
    ) : null;
};

export default TimeIcon;
