import { FC } from 'react';
import { auth } from '../../config/firebase';

// import FirebaseUIAuth from 'react-firebaseui-localized';
// import { StyledFirebaseAuth } from 'react-firebaseui';
import AuthContainer from '../../components/AuthContainer';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Grid } from '@mui/material';
import LanguageMenu from '../../components/LanguageMenu';
import LocalizedFirebaseUIAuth from '../../elements/LocalizedFirebaseUIAuth';

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

const LoginPage: FC = () => {
    const { t, i18n } = useTranslation();

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
                    <LocalizedFirebaseUIAuth
                        auth={auth}
                        config={config}
                        lang={i18n.language.split('-')[0]}
                        firebase={firebase}
                    />
                    {/*<StyledFirebaseAuth*/}
                    {/*    firebaseAuth={auth}*/}
                    {/*    uiConfig={config}*/}
                    {/*    uiCallback={(x) => {*/}
                    {/*        console.log(x);*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*<FirebaseUIAuth*/}
                    {/*    lang={i18n.language.split('-')[0]}*/}
                    {/*    version="5.0.0"*/}
                    {/*    config={config}*/}
                    {/*    auth={auth}*/}
                    {/*    firebase={firebase}*/}
                    {/*    rtl={false}*/}
                    {/*/>*/}
                </AuthContainer>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
