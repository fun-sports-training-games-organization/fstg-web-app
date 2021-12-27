import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { addLeadingZero, getNumber } from '../../../util/number-util';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Exercise } from '../../../model/Exercise.model';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';

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
    const getFormattedTotalWorkoutTime = (): string => {
        const getTotalWorkoutSeconds = (): number => {
            return entities
                .map((entity) => (entity.amountType === 'TIME_BASED' ? getNumber((entity as Exercise).amountValue) : 0))
                .reduce((a, b) => a + b);
        };
        const totalWorkoutSeconds = getTotalWorkoutSeconds();
        const formattedWorkoutHours =
            totalWorkoutSeconds >= 3600 ? `${addLeadingZero(Math.floor(totalWorkoutSeconds / 3600))}:` : '';
        const formattedWorkoutMinutes =
            totalWorkoutSeconds >= 60 ? addLeadingZero(Math.floor(totalWorkoutSeconds / 60)) : '0';
        const formattedWorkoutSeconds = addLeadingZero(totalWorkoutSeconds % 60);
        return `${formattedWorkoutHours}${formattedWorkoutMinutes}:${formattedWorkoutSeconds}`;
    };

    return !type || type === 'TIME_BASED' ? (
        <Stack direction="row" alignItems="end" spacing={1} display={display}>
            <Typography key={id} id={`${parentIdPrefix}__time__${index}`}>
                {getFormattedTotalWorkoutTime()}
            </Typography>
            <QueryBuilderIcon></QueryBuilderIcon>
        </Stack>
    ) : null;
};

export default TimeIcon;
