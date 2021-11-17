import React, { FC } from 'react';
// import { auth, signInWithFacebook, /*signInWithGoogle,*/ signInWithTwitter } from '../../config/firebase';
import AuthContainer from '../../components/AuthContainer';
import { Trans, useTranslation } from 'react-i18next';
import { Grid, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
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
import { useFirebase } from 'react-redux-firebase';

const LoginPage: FC = (): JSX.Element => {
    const { loggedInSuccessfully } = useAuth();
    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const authDispatcher = new AuthDispatcher(dispatch);
    const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
    console.log(dbRequest);

    const handleExternalLogin = (provider: 'google' | 'facebook' | 'twitter') => {
        firebase
            .login({
                provider,
                type: 'popup'
            })
            .then(() => {
                history.push('/home');

                enqueueSnackbar(t('auth.message.login.successful'), { variant: 'success' });
            })
            .catch(authDispatcher.loginFailed);
    };

    const handleGoogleLogin = () => handleExternalLogin('google');
    const handleFacebookLogin = () => handleExternalLogin('facebook');
    const handleTwitterLogin = () => handleExternalLogin('twitter');

    const LoginWithExternal = () => (
        <Stack padding={2} spacing={2} alignItems={'center'}>
            <IdpLoginButton
                data-cy="login-with-google"
                color="#db4437"
                icon={<GoogleIcon />}
                onClick={handleGoogleLogin}
            >
                {t('idp.login.button', { idp: 'Google' })}
            </IdpLoginButton>
            <IdpLoginButton
                data-cy="login-with-facebook"
                color="#3b5998"
                icon={<FacebookIcon />}
                onClick={handleFacebookLogin}
            >
                {t('idp.login.button', { idp: 'Facebook' })}
            </IdpLoginButton>
            <IdpLoginButton
                data-cy="login-with-twitter"
                color="#55acee"
                icon={<TwitterIcon />}
                onClick={handleTwitterLogin}
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
