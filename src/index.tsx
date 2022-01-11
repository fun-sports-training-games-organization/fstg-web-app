import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import './i18n';

import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import AuthContextProvider from './contexts/AuthContextProvider';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rrfProps, store } from './config/firebase';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import history from './history';

ReactDOM.render(
    <Suspense fallback={<></>}>
        <StrictMode>
            <Router history={history}>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <Provider store={store}>
                        <ReactReduxFirebaseProvider {...rrfProps}>
                            <AuthContextProvider>
                                <ThemeProvider theme={theme}>
                                    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                                        <App />
                                    </DndProvider>
                                </ThemeProvider>
                            </AuthContextProvider>
                        </ReactReduxFirebaseProvider>
                    </Provider>
                </SnackbarProvider>
            </Router>
        </StrictMode>
    </Suspense>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
