import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import firebase from 'firebase/compat';
import firebaseConfig from './firebaseConfig';
import { createFirestoreInstance } from 'redux-firestore';
import { getAuth } from 'firebase/auth';

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

const initialState = {};
export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
// https://stackoverflow.com/questions/68946446/how-do-i-fix-a-firebase-9-0-import-error-attempted-import-error-firebase-app/68967024#68967024
firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    useFirestoreForProfile: true
};
