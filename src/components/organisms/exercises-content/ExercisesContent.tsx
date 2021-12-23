import { ResponsiveStyleValue, SxProps, Theme } from '@mui/system';
import { FC } from 'react';
import { Workout } from '../../../model/Workout.model';
import ExerciseItem from '../../molecules/exercise-item/ExerciseItem';

export type ExercisesContentProps = {
    workout: Workout;
    parentIdPrefix: string;
    index?: number;
    typographySx?: SxProps<Theme> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typographyMarginLeft?: ResponsiveStyleValue<any> | undefined;
};

const ExercisesContent: FC<ExercisesContentProps> = ({
    workout,
    parentIdPrefix,
    index = 0,
    typographySx,
    typographyMarginLeft
}: ExercisesContentProps) => {
    return (
        <>
            {workout.exercises.map((exercise, i) => {
                return (
                    <ExerciseItem
                        key={`${parentIdPrefix}name__${exercise.name}__${index}__${i}`}
                        exercise={exercise}
                        parentIdPrefix={parentIdPrefix}
                        index={index}
                        typographySx={typographySx}
                        typographyMarginLeft={typographyMarginLeft}
                    ></ExerciseItem>
                );
            })}
        </>
    );
};

export default ExercisesContent;
