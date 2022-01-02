import { History } from 'history';

export const toManageWorkouts = (history: History<unknown>): void => {
    history.push('/workouts');
};

export const toEditWorkout = (history: History<unknown>, workoutId?: string): void => {
    history.push(`/workout${workoutId ? `/${workoutId}` : ''}`);
};

export const toStartWorkout = (history: History<unknown>, workoutId: string): void => {
    history.push(`/start-workout/${workoutId}`);
};

export const toDoWorkout = (history: History<unknown>, workoutId: string): void => {
    history.push(`/do-workout/${workoutId}`);
};

export const toDashboard = (history: History<unknown>): void => {
    history.push('/dashboard');
};

export const toBase = (history: History<unknown>): void => {
    history.push('/');
};

export const toExercises = (history: History<unknown>): void => {
    history.push('/exercises');
};
