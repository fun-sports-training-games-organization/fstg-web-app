import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfiguration from './firebaseConfig';

const Firebase = firebase.initializeApp(firebaseConfiguration);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
};

export const auth = firebase.auth();
export default Firebase;
