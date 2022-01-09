import { Dispatch } from 'react';
import { Action } from 'redux';

export enum Unit {
    METRIC = 'METRIC',
    IMPERIAL = 'IMPERIAL'
}

export interface AccountState {
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

const initialState: AccountState = {};

export interface DispatchAction extends Action {
    payload: Partial<AccountState>;
}

export enum ActionType {
    LOAD
}

const accountReducer = (state = initialState, action: DispatchAction): AccountState & { data?: AccountState } => {
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

// export const load = (data: Account): void => ({ type: LOAD_ACCOUNT, data });

export class AccountDispatcher {
    private readonly dispatch: Dispatch<DispatchAction>;
    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }
    load = (data: AccountState): void => this.dispatch({ type: ActionType.LOAD, payload: data });
}
export default accountReducer;
