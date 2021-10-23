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
import rootReducer from './reducers';
import { SnackbarProvider } from 'notistack';
import AuthContextProvider from './contexts/AuthContextProvider';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Suspense fallback={<></>}>
        <StrictMode>
            <BrowserRouter>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                >
                    <AuthContextProvider>
                        <Provider store={store}>
                            <ThemeProvider theme={theme}>
                                <App />
                            </ThemeProvider>
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
