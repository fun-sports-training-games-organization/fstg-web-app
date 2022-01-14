import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import AuthContextProvider from './contexts/AuthContextProvider';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rrfProps, store } from './config/firebase';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import ThemeContextProvider from './contexts/ThemeContextProvider';
import Loader from './components/atoms/loader/Loader';

ReactDOM.render(
    <Suspense fallback={<Loader />}>
        <StrictMode>
            <BrowserRouter>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <Provider store={store}>
                        <ReactReduxFirebaseProvider {...rrfProps}>
                            <AuthContextProvider>
                                <ThemeContextProvider>
                                    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                                        <App />
                                    </DndProvider>
                                </ThemeContextProvider>
                            </AuthContextProvider>
                        </ReactReduxFirebaseProvider>
                    </Provider>
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
