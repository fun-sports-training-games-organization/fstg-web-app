import { Dispatch } from 'react';
import { Action } from 'redux';

export enum Unit {
    METRIC = 'METRIC',
    IMPERIAL = 'IMPERIAL'
}

export interface ProfileState {
    nickname?: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    gender?: string;
    unit?: Unit;
    weight?: number;
    height?: number;
    dateOfBirth?: string;
    profilePicture?: FileList;
    profilePicturePath?: string;
}

const initialState: ProfileState = {};

export interface DispatchAction extends Action {
    payload: Partial<ProfileState>;
}

export enum ActionType {
    LOAD
}

const profileReducer = (state = initialState, action: DispatchAction): ProfileState & { data?: ProfileState } => {
    switch (action.type) {
        case ActionType.LOAD:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

// export const load = (data: Profile): void => ({ type: LOAD_ACCOUNT, data });

export class ProfileDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;
    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }
    load = (data: ProfileState): void => this.dispatch({ type: ActionType.LOAD, payload: data });
}
export default profileReducer;
