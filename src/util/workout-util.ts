import { Workout } from '../model/Workout.model';
import { v4 as uuidv4 } from 'uuid';
import { getNewEmptyExerciseWorkoutSettings } from './exercise-util';
import { FormEvent } from 'react';
import { TFunction } from 'react-i18next';

const emptyWorkout: Workout = {
    name: '',
    exercises: [getNewEmptyExerciseWorkoutSettings()],
    hasBeenCreated: false
};

export const getNewEmptyWorkout = (): Workout => {
    return { ...emptyWorkout, id: uuidv4() };
};

export const getShouldSubmitAndNavigate = (
    e: FormEvent<HTMLFormElement>,
    editWorkoutSubmitTestId: string,
    t: TFunction<'translation', undefined>
): { shouldSubmit: boolean; shouldNavigate: boolean } => {
    const submitter = (e?.nativeEvent as SubmitEvent)?.submitter;
    const submitterDataTestId = submitter?.attributes?.getNamedItem('data-testid')?.value;
    const shouldNavigate = submitterDataTestId === editWorkoutSubmitTestId;
    const shouldSubmit =
        submitterDataTestId !== 'fstg__create-edit-exercise-form__submit_button' ||
        submitter?.outerText.toLowerCase() === t('global.save').toLowerCase();
    return { shouldSubmit, shouldNavigate };
};
