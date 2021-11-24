import AddButton from './atoms/AddButton';

type Props = {
    parentIdPrefix: string;
    addExerciseToWorkout: () => void;
};

const EditWorkoutAddExerciseButton = ({ parentIdPrefix, addExerciseToWorkout }: Props): JSX.Element => {
    return (
        <AddButton
            testId={parentIdPrefix + 'add_exercise_button'}
            clickFunction={addExerciseToWorkout}
            fontSize="large"
        />
    );
};

export default EditWorkoutAddExerciseButton;
