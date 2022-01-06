import { Dispatch } from 'react';
import { Action } from 'redux';

export interface Account {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicturePath?: string;
}

const initialState: Account = {};

export interface DispatchAction extends Action {
    payload: Partial<Account>;
}

export enum ActionType {
    LOAD
}

const accountReducer = (state = initialState, action: DispatchAction) => {
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
    load = (data: Account): void => this.dispatch({ type: ActionType.LOAD, payload: data });
}
export default accountReducer;
