import SubmitButton from '../atoms/SubmitButton';

type Props = {
    parentIdPrefix: string;
    isCreate: boolean;
    onSubmit: () => void;
};

const EditWorkoutSubmitButton = ({ parentIdPrefix, isCreate, onSubmit }: Props): JSX.Element => {
    return <SubmitButton testId={parentIdPrefix + 'submit_button'} isCreate={isCreate} onSubmit={onSubmit} />;
};

export default EditWorkoutSubmitButton;
