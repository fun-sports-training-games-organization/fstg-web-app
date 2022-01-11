import history from '../history';

export const toManageWorkouts = (): void => {
    history.push('/workouts');
};

export const toEditWorkout = (workoutId?: string): void => {
    history.push(`/workout${workoutId ? `/${workoutId}` : ''}`);
};

export const toStartWorkout = (workoutId: string): void => {
    history.push(`/start-workout/${workoutId}`);
};

export const toDoWorkout = (workoutId: string): void => {
    history.push(`/do-workout/${workoutId}`);
};

export const toDashboard = (): void => {
    history.push('/dashboard');
};

export const toBase = (): void => {
    history.push('/');
};

export const toExercises = (): void => {
    history.push('/exercises');
};

export const toProfile = (): void => {
    history.push('/profile');
};
