import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfiguration from './firebaseConfig';

const Firebase = firebase.initializeApp(firebaseConfiguration);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider(),
    facebook: new firebase.auth.FacebookAuthProvider(),
    twitter: new firebase.auth.TwitterAuthProvider()
};

Providers.google.setCustomParameters({ prompt: 'select_account' });
Providers.facebook.setCustomParameters({ prompt: 'select_account' });
Providers.twitter.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> => auth.signInWithPopup(Providers.google);
export const signInWithFacebook = (): Promise<firebase.auth.UserCredential> => auth.signInWithPopup(Providers.facebook);
export const signInWithTwitter = (): Promise<firebase.auth.UserCredential> => auth.signInWithPopup(Providers.twitter);

export const auth = firebase.auth();
export default Firebase;
