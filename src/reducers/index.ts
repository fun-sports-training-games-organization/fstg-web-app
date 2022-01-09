import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profile-reducer';

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: formReducer,
    profile: profileReducer
});
