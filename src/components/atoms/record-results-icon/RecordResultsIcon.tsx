import TimelineIcon from '@mui/icons-material/Timeline';
import { Stack } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import { Exercise } from '../../../model/Exercise.model';
import NumbersIcon from '@mui/icons-material/Numbers';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { getFormattedTotalWorkoutTime } from '../../../util/date-util';
import { getTotalReps } from '../../../util/number-util';

export type RecordResultsIconProps = {
    exercise: Exercise;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
};

const RecordResultsIcon = ({ exercise, display }: RecordResultsIconProps): JSX.Element => {
    return (
        <Stack display={display} flexDirection="row" justifyContent="flex-start">
            {exercise?.recordResults ? (
                <>
                    <TimelineIcon />
                    {exercise.resultType === 'COUNT_BASED' ? (
                        <>
                            <NumbersIcon />
                            {exercise.useDefaultResult && exercise.defaultResult ? getTotalReps([exercise]) : null}
                        </>
                    ) : (
                        <>
                            <QueryBuilderIcon />
                            {exercise.useDefaultResult && exercise.defaultResult
                                ? getFormattedTotalWorkoutTime([exercise])
                                : null}
                        </>
                    )}
                </>
            ) : null}
        </Stack>
    );
};

export default RecordResultsIcon;
