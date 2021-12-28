import { FC } from 'react';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';
import ExercisesOrRepsIcon from '../../molecules/exercises-or-reps-icon/ExercisesOrRepsIcon';
import TimeIcon from '../../molecules/time-icon/TimeIcon';
import RepsIcon from '../../molecules/reps-icon/RepsIcon';
import { Stack } from '@mui/material';
import { ExercisesTimeRepsIconsGridColumns } from '../../../model/ExercisesTimeRepsIconsGridColumns.model';

export type ExercisesTimeRepsIconsProps = {
    entities: AmountTypeAmountValue[];
    id: string;
    length: number;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
    gridColumns?: ExercisesTimeRepsIconsGridColumns;
    displayInGrid?: boolean;
};
const ExercisesTimeRepsIcons: FC<ExercisesTimeRepsIconsProps> = ({
    entities,
    id,
    length,
    parentIdPrefix,
    index = 0,
    type,
    display,
    gridColumns = { exercisesOrRepsIcon: '41 / 57', timeIcon: '58 / 77', repsIcon: '78 / 94' },
    displayInGrid = false
}: ExercisesTimeRepsIconsProps) => {
    const exercisesOrRepsIcon = (
        <ExercisesOrRepsIcon
            id={id}
            length={length}
            parentIdPrefix={parentIdPrefix}
            index={index}
            type={type}
            display={display}
        />
    );
    const timeIcon = (
        <TimeIcon
            entities={entities}
            id={id}
            parentIdPrefix={parentIdPrefix}
            index={index}
            type={type}
            display={display}
        />
    );

    const repsIcon = (
        <RepsIcon
            entities={entities}
            id={id}
            parentIdPrefix={parentIdPrefix}
            index={index}
            type={type}
            display={display}
        />
    );

    return type && !displayInGrid ? (
        <>
            {exercisesOrRepsIcon}
            {timeIcon} {repsIcon}
        </>
    ) : (
        <>
            <Stack
                gridColumn={gridColumns.exercisesOrRepsIcon}
                display={display ? display : type === 'TIME_BASED' ? 'none' : undefined}
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                {exercisesOrRepsIcon}
            </Stack>
            <Stack
                gridColumn={gridColumns.timeIcon}
                display={display}
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                {timeIcon}
            </Stack>
            <Stack
                gridColumn={gridColumns.repsIcon}
                display={display ? display : type === 'TIME_BASED' ? 'none' : undefined}
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                {repsIcon}
            </Stack>
        </>
    );
};

export default ExercisesTimeRepsIcons;
