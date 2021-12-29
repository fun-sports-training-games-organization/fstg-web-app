import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NumbersIcon from '@mui/icons-material/Numbers';
import { RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';

export type ExercisesOrRepsIconProps = {
    id: string;
    length: number;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
};
const ExercisesOrRepsIcon: FC<ExercisesOrRepsIconProps> = ({
    id,
    length,
    parentIdPrefix,
    index = 0,
    type,
    display
}: ExercisesOrRepsIconProps) => {
    return !type || type === 'COUNT_BASED' ? (
        <Stack direction="row" alignItems="end" spacing={1} display={display}>
            <Typography key={id} id={`${parentIdPrefix}__reps__${index}`}>
                {length}
            </Typography>
            {type ? <NumbersIcon></NumbersIcon> : <FitnessCenterIcon></FitnessCenterIcon>}
        </Stack>
    ) : null;
};

export default ExercisesOrRepsIcon;
