import { Action, Reducer } from 'redux';
import { Dispatch } from 'react';
import { User } from 'firebase/auth';

// example taken from: https://dzone.com/articles/react-redux-hooks-with-typescript-in-2020
export interface RootReducerState {
    rootReducer: InitialState;
}

export interface InitialState {
    signingIn?: boolean;
    signedIn?: boolean;
    user?: User;
}

export const initialState: InitialState = {
    signingIn: false,
    signedIn: false,
    user: undefined
};

export interface DispatchAction extends Action {
    payload: Partial<InitialState>;
}

export enum ActionType {
    SigningIn,
    SignedIn,
    LoginFailed,
    Logout
}

const reducer: Reducer<InitialState, DispatchAction> = (state = initialState, action: DispatchAction) => {
    if (action.type) {
        switch (action.type) {
            case ActionType.SigningIn:
                return { ...state, signingIn: true };
            case ActionType.SignedIn:
                return { ...state, signingIn: false, signedIn: true, user: action.payload.user || undefined };
            case ActionType.LoginFailed:
                return { ...state, signingIn: false };
            case ActionType.Logout:
                return { ...state, signedIn: false, user: undefined };
            default:
                return state;
        }
    }

    return state;
};

export class AuthDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;
    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }
    signedIn = (user: User): void => this.dispatch({ type: ActionType.SignedIn, payload: { signedIn: true, user } });
    signingIn = (): void => this.dispatch({ type: ActionType.SigningIn, payload: { signingIn: true } });
    loginFailed = (): void => this.dispatch({ type: ActionType.LoginFailed, payload: {} });
    logout = (): void => this.dispatch({ type: ActionType.Logout, payload: {} });
}

export default reducer;
