import { FC } from 'react';
import { Workout } from '../../../model/Workout.model';
import ExerciseItem from '../../molecules/exercise-item/ExerciseItem';

export type ExercisesContentProps = {
    workout: Workout;
    parentIdPrefix: string;
    index?: number;
};

const ExercisesContent: FC<ExercisesContentProps> = ({ workout, parentIdPrefix, index = 0 }: ExercisesContentProps) => {
    return (
        <>
            {workout.exercises.map((exercise) => {
                return (
                    <ExerciseItem
                        key={`${parentIdPrefix}name__${exercise.name}__${index}`}
                        exercise={exercise}
                        parentIdPrefix={parentIdPrefix}
                        index={index}
                    ></ExerciseItem>
                );
            })}
        </>
    );
};

export default ExercisesContent;
