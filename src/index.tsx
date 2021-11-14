import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';
import AuthContextProvider from './contexts/AuthContextProvider';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
// import Firebase from './config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rootReducer } from './reducers';
import firebaseConfig from './config/firebaseConfig';

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
// https://stackoverflow.com/questions/68946446/how-do-i-fix-a-firebase-9-0-import-error-attempted-import-error-firebase-app/68967024#68967024
firebase.initializeApp(firebaseConfig);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Suspense fallback={<></>}>
        <StrictMode>
            <BrowserRouter>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <AuthContextProvider>
                        <Provider store={store}>
                            <ReactReduxFirebaseProvider {...rrfProps}>
                                <ThemeProvider theme={theme}>
                                    <App />
                                </ThemeProvider>
                            </ReactReduxFirebaseProvider>
                        </Provider>
                    </AuthContextProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </StrictMode>
    </Suspense>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
