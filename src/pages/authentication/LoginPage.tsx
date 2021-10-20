import { FC } from 'react';
import { signInWithFacebook, signInWithGoogle, signInWithTwitter } from '../../config/firebase';

import AuthContainer from '../../components/AuthContainer';
import { Trans, useTranslation } from 'react-i18next';
import { Grid, Link, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { UserCredential } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContextProvider';
import { Redirect, useHistory } from 'react-router-dom';
import { Twitter as TwitterIcon, Facebook as FacebookIcon, Google as GoogleIcon } from '@mui/icons-material';
import IdpLoginButton from '../../components/idp/IdPLoginButton';

const LoginPage: FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { user } = useAuth();
    const { t } = useTranslation();

    const loggedInSuccessfully = (result: UserCredential) => {
        console.log(result.user);
        history.push('/home');
        enqueueSnackbar(t('auth.message.login.successful'), { variant: 'success' });
    };

    const loginFailed = () => {
        enqueueSnackbar(t('auth.message.login.failure'), { variant: 'error' });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(loggedInSuccessfully).catch(loginFailed);
    };

    const handleFacebookSignIn = () => {
        signInWithFacebook().then(loggedInSuccessfully).catch(loginFailed);
    };

    const handleTwitterSignIn = () => {
        signInWithTwitter().then(loggedInSuccessfully).catch(loginFailed);
    };

    const LoginWithExternal = () => (
        <Stack padding={2} spacing={2} alignItems={'center'}>
            <IdpLoginButton color="#db4437" icon={<GoogleIcon />} onClick={handleGoogleSignIn}>
                {t('idp.login.button', { idp: 'Google' })}
            </IdpLoginButton>
            <IdpLoginButton color="#3b5998" icon={<FacebookIcon />} onClick={handleFacebookSignIn}>
                {t('idp.login.button', { idp: 'Facebook' })}
            </IdpLoginButton>
            <IdpLoginButton color="#55acee" icon={<TwitterIcon />} onClick={handleTwitterSignIn}>
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
    if (user) {
        return <Redirect to={'/home'} />;
    }
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <AuthContainer header={t('page.login.header')}>
                    <Stack padding={2} spacing={2} alignItems={'center'}>
                        {LoginWithExternal()}
                        {/*<SwipingTabs*/}
                        {/*    tabs={[*/}
                        {/*        { label: 'Social Media', content: LoginWithExternal() },*/}
                        {/*        // { label: 'Email Sign-In', content: <EmailLoginForm /> }*/}
                        {/*    ]}*/}
                        {/*/>*/}
                    </Stack>
                </AuthContainer>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
