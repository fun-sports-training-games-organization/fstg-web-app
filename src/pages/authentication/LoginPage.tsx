import React, { FC } from 'react';
import { auth, signInWithFacebook, signInWithGoogle, signInWithTwitter } from '../../config/firebase';

import AuthContainer from '../../components/AuthContainer';
import { Trans, useTranslation } from 'react-i18next';
import { Grid, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { getAuth, getRedirectResult, UserCredential } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContextProvider';
// import { Redirect } from 'react-router-dom';
import { Facebook as FacebookIcon, Google as GoogleIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import IdpLoginButton from '../../components/idp/IdPLoginButton';
import EmailLoginForm from './EmailLoginForm';
import SwipingTabs from '../../components/views/SwipingTabs';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../../reducers/authReducer';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const LoginPage: FC = (): JSX.Element => {
    const { loggedInSuccessfully } = useAuth();
    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);

    const handleGoogleSignIn = () => {
        auth.languageCode = i18n.language.split('-')[0];
        // signInWithGoogle().then(loggedInSuccessfully).catch(loginFailed);

        signInWithGoogle()
            .then((userCredential: UserCredential) => {
                const { user } = userCredential;
                authDispatcher.signedIn(user);
                history.push('/home');
                enqueueSnackbar(t('auth.message.login.successful'), { variant: 'success' });
            })
            .catch(authDispatcher.loginFailed);
    };

    const handleFacebookSignIn = () => {
        auth.languageCode = i18n.language.split('-')[0];
        /*signInWithFacebook()
            .then((/!*result: UserCredential*!/) => {
                // we may need to re-enable this later...
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential?.accessToken;
                getRedirectRes();
                loggedInSuccessfully();
            })
            .catch(loginFailed); */

        signInWithFacebook()
            .then((userCredential: UserCredential) => {
                // we may need to re-enable this later...
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential?.accessToken;
                getRedirectRes();
                const { user } = userCredential;
                authDispatcher.signedIn(user);
            })
            .catch(authDispatcher.loginFailed);
    };

    const handleTwitterSignIn = () => {
        auth.languageCode = i18n.language.split('-')[0];
        // signInWithTwitter()
        //     .then((/*result: UserCredential*/) => {
        //         // we may need to re-enable this later...
        //         // const credential = TwitterAuthProvider.credentialFromResult(result);
        //         // const token = credential?.accessToken;
        //         // const secret = credential?.secret;
        //         loggedInSuccessfully();
        //     })
        //     .catch(loginFailed);

        signInWithTwitter()
            .then((userCredential: UserCredential) => {
                const { user } = userCredential;
                authDispatcher.signedIn(user);
                loggedInSuccessfully();
            })
            .catch(authDispatcher.loginFailed);
    };

    const getRedirectRes = () => {
        getRedirectResult(getAuth()).then((result: UserCredential | null) => console.log(result));
    };

    const LoginWithExternal = () => (
        <Stack padding={2} spacing={2} alignItems={'center'}>
            <IdpLoginButton
                data-cy="login-with-google"
                color="#db4437"
                icon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
            >
                {t('idp.login.button', { idp: 'Google' })}
            </IdpLoginButton>
            <IdpLoginButton
                data-cy="login-with-facebook"
                color="#3b5998"
                icon={<FacebookIcon />}
                onClick={handleFacebookSignIn}
            >
                {t('idp.login.button', { idp: 'Facebook' })}
            </IdpLoginButton>
            <IdpLoginButton
                data-cy="login-with-twitter"
                color="#55acee"
                icon={<TwitterIcon />}
                onClick={handleTwitterSignIn}
            >
                {t('idp.login.button', { idp: 'Twitter' })}
            </IdpLoginButton>
            <Typography
                sx={{ marginLeft: '50px !important', marginRight: '50px !important' }}
                color={'textSecondary'}
                variant="caption"
                display="block"
                gutterBottom
            >
                <Trans i18nKey={'idp.login.t&c'}>
                    By continuing, you are indicating that you accept our
                    <Link href={'/terms-of-service'} target="_blank" rel="noopener">
                        Terms of Service
                    </Link>
                    and
                    <Link href={'/privacy-policy'} target="_blank" rel="noopener">
                        Privacy Policy
                    </Link>
                    .
                </Trans>
            </Typography>
        </Stack>
    );
    // not too sure if we need this still...
    // if (user) {
    //     return <Redirect to={'/home'} />;
    // }
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            width={'100%'}
            style={{ marginTop: smDown ? '50px' : '100px' }}
        >
            <AuthContainer
                header={
                    <Typography align={'center'} variant={'h4'}>
                        {t('page.login.header')}
                    </Typography>
                }
            >
                <SwipingTabs
                    tabs={[
                        { label: 'Social', content: LoginWithExternal() },
                        { label: 'Email', content: <EmailLoginForm /> }
                    ]}
                />
            </AuthContainer>
        </Grid>
    );
};

export default LoginPage;
