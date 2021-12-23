import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { addLeadingZero, getNumber } from '../../../util/number-util';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import NumbersIcon from '@mui/icons-material/Numbers';
import { Exercise } from '../../../model/Exercise.model';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';

export type WorkoutIconsSubtitleProps = {
    entities: AmountTypeAmountValue[];
    id: string;
    length: number;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
};
const IconsSubtitle: FC<WorkoutIconsSubtitleProps> = ({
    entities,
    id,
    length,
    parentIdPrefix,
    index = 0,
    type,
    display
}: WorkoutIconsSubtitleProps) => {
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

    const getTotalReps = (): number => {
        return entities
            .filter((entity) => entity.amountType === 'COUNT_BASED')
            .map((entity) => getNumber(entity.amountValue))
            .reduce((a, b) => a + b);
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
            {!type ? (
                <Stack direction="row" alignItems="end" spacing={1} display={display}>
                    <Typography key={id} id={`${parentIdPrefix}__reps__${index}`}>
                        {getTotalReps()}
                    </Typography>
                    <NumbersIcon></NumbersIcon>
                </Stack>
            ) : null}
        </>
    );
};

export default IconsSubtitle;
