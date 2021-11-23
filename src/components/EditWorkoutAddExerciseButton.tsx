import AddButton from './atoms/AddButton';

type Props = {
    addExerciseToWorkout: () => void;
};

const EditWorkoutAddExerciseButton = ({ addExerciseToWorkout }: Props): JSX.Element => {
    return <AddButton clickFunction={addExerciseToWorkout} fontSize="large" />;
};

export default EditWorkoutAddExerciseButton;
