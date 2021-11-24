import AddButton from '../atoms/AddButton';

type Props = {
    parentIdPrefix: string;
    addWorkout: () => void;
};

const ManageWorkoutsAddWorkoutButton = ({ parentIdPrefix, addWorkout }: Props): JSX.Element => {
    return <AddButton testId={parentIdPrefix + 'add_workout_button'} onClick={addWorkout} fontSize="large" />;
};

export default ManageWorkoutsAddWorkoutButton;
