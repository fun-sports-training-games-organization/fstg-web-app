import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    UserCredential,
    signInWithPopup
} from 'firebase/auth';
import firebaseConfiguration from './firebaseConfig';

const Firebase = initializeApp(firebaseConfiguration);

const auth = getAuth();

export const Providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    twitter: new TwitterAuthProvider()
};

Providers.google.setCustomParameters({ prompt: 'select_account' });
Providers.facebook.setCustomParameters({ prompt: 'select_account' });
Providers.twitter.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = (): Promise<UserCredential> => signInWithPopup(auth, Providers.google);
export const signInWithFacebook = (): Promise<UserCredential> => signInWithPopup(auth, Providers.facebook);
export const signInWithTwitter = (): Promise<UserCredential> => signInWithPopup(auth, Providers.twitter);

export default Firebase;
