import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { addLeadingZero } from '../../../util/number-util';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import NumbersIcon from '@mui/icons-material/Numbers';
import { Exercise } from '../../../model/Exercise.model';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';

export type WorkoutIconsSubtitleProps = {
    entities: AmountTypeAmountValue[];
    id: string;
    length: number;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
};
const IconsSubtitle: FC<WorkoutIconsSubtitleProps> = ({
    entities,
    id,
    length,
    parentIdPrefix,
    index = 0,
    type
}: WorkoutIconsSubtitleProps) => {
    const display = type ? undefined : { xs: 'none', sm: 'flex' };

    const getFormattedTotalWorkoutTime = (): string => {
        const getTotalWorkoutSeconds = (): number => {
            const getNumber = (val: string | number | undefined): number => {
                if (typeof val === 'number') {
                    return val;
                } else if (typeof val === 'string') {
                    return parseInt(val);
                }

                return 0;
            };

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

    return (
        <>
            {!type || type === 'COUNT_BASED' ? (
                <Stack direction="row" alignItems="end" spacing={1} display={display}>
                    <Typography key={id} id={`${parentIdPrefix}__reps__${index}`}>
                        {length}
                    </Typography>
                    {type ? <NumbersIcon></NumbersIcon> : <FitnessCenterIcon></FitnessCenterIcon>}
                </Stack>
            ) : null}
            {!type || type === 'TIME_BASED' ? (
                <Stack direction="row" alignItems="end" spacing={1} display={display}>
                    <Typography key={id} id={`${parentIdPrefix}__time__${index}`}>
                        {getFormattedTotalWorkoutTime()}
                    </Typography>
                    <QueryBuilderIcon></QueryBuilderIcon>
                </Stack>
            ) : null}
        </>
    );
};

export default IconsSubtitle;
