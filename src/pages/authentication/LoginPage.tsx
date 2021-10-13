import { FC, useEffect } from 'react';
import { auth } from '../../config/firebase';

import AuthContainer from '../../components/AuthContainer';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Grid } from '@mui/material';
import LanguageMenu from '../../components/LanguageMenu';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../../reducers/authReducer';

const config: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInSuccessUrl: '/home',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '/terms-of-service',
    privacyPolicyUrl: '/privacy-policy',
    widgetUrl: 'https://www.gstatic.com/firebasejs/ui/5.0.0/firebase-ui-auth__fr.js'
};

// interface Props extends PropsFromRedux {}
const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);
    const { t } = useTranslation();

    useEffect(() => {
        auth.onAuthStateChanged(async (user: firebase.User | null) => {
            !!user ? authDispatcher.signedIn(user) : authDispatcher.loginFailed();
        });
        // eslint-disable-next-line
    }, [auth.currentUser]);
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <LanguageMenu />
            <Grid item xs={3}>
                <AuthContainer header={t('page.login.header')}>
                    <StyledFirebaseAuth className={'loginExternalWrapper'} firebaseAuth={auth} uiConfig={config} />
                </AuthContainer>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
