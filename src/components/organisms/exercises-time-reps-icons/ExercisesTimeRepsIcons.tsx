import { FC } from 'react';
import { AmountTypeAmountValue, RecordType } from '../../../model/Basics.model';
import { ResponsiveStyleValue } from '@mui/system';
import ExercisesOrRepsIcon from '../../molecules/exercises-or-reps-icon/ExercisesOrRepsIcon';
import TimeIcon from '../../molecules/time-icon/TimeIcon';
import RepsIcon from '../../molecules/reps-icon/RepsIcon';

export type ExercisesTimeRepsIconsProps = {
    entities: AmountTypeAmountValue[];
    id: string;
    length: number;
    parentIdPrefix: string;
    index?: number;
    type?: RecordType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    display?: ResponsiveStyleValue<any> | undefined;
};
const ExercisesTimeRepsIcons: FC<ExercisesTimeRepsIconsProps> = ({
    entities,
    id,
    length,
    parentIdPrefix,
    index = 0,
    type,
    display
}: ExercisesTimeRepsIconsProps) => {
    return (
        <>
            <ExercisesOrRepsIcon
                id={id}
                length={length}
                parentIdPrefix={parentIdPrefix}
                index={index}
                type={type}
                display={display}
            />
            <TimeIcon
                entities={entities}
                id={id}
                parentIdPrefix={parentIdPrefix}
                index={index}
                type={type}
                display={display}
            />
            <RepsIcon
                entities={entities}
                id={id}
                parentIdPrefix={parentIdPrefix}
                index={index}
                type={type}
                display={display}
            />
        </>
    );
};

export default ExercisesTimeRepsIcons;
