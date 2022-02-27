import { Workout, WorkoutResult } from '../model/Workout.model';
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

export const getRecordValid = (workoutResults: WorkoutResult[]): WorkoutResult[] => {
    return workoutResults.filter((w) => {
        let allAreSame = true;
        for (let i = 0; i + 1 < w.exercises.length; i++) {
            if (w.exercises[i].amountType !== w.exercises[i + 1].amountType) {
                allAreSame = false;
                break;
            }
        }
        return allAreSame;
    });
};

export const getMostRecent = (workoutResults: WorkoutResult[]): WorkoutResult => {
    return workoutResults.reduce((a, b) =>
        (a?.createdUTCMilliseconds ?? 0) >= (b?.createdUTCMilliseconds ?? 0) ? a : b
    );
};

export const getRecords = (workoutResults: WorkoutResult[], maxRecords = 100): WorkoutResult[] => {
    const records = [];
    const originalValid = getRecordValid(workoutResults);
    let filteredValid = [...originalValid];
    for (let i = 0; (filteredValid ? filteredValid.length : 0) > 0 && i < maxRecords; i++) {
        const mostRecentValid = getMostRecent(filteredValid);
        const allMostRecentValid = filteredValid.filter((w) => w.workoutId === mostRecentValid.workoutId);
        let bestMostRecentValid;
        if (mostRecentValid.exercises.length > 0 && mostRecentValid.exercises[0].resultType === 'TIME_BASED') {
            bestMostRecentValid = allMostRecentValid.reduce((a: WorkoutResult, b: WorkoutResult) =>
                a.exercises.map((e) => e.resultValue ?? 0).reduce((c, d) => c + d) <=
                b.exercises.map((e) => e.resultValue ?? 0).reduce((e, f) => e + f)
                    ? a
                    : b
            );
        } else {
            bestMostRecentValid = allMostRecentValid.reduce((a: WorkoutResult, b: WorkoutResult) =>
                a.exercises.map((e) => e.resultValue ?? 0).reduce((c, d) => c + d) >=
                b.exercises.map((e) => e.resultValue ?? 0).reduce((e, f) => e + f)
                    ? a
                    : b
            );
        }
        records.push(bestMostRecentValid);
        filteredValid = filteredValid.filter((w) => w.workoutId !== mostRecentValid.workoutId);
    }

    return records;
};
