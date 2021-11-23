import SubmitButton from './atoms/SubmitButton';

type Props = {
    isCreate: boolean;
    onSubmit: () => void;
};

const EditWorkoutSubmitButton = ({ isCreate, onSubmit }: Props): JSX.Element => {
    return <SubmitButton isCreate={isCreate} onSubmit={onSubmit} />;
};

export default EditWorkoutSubmitButton;
