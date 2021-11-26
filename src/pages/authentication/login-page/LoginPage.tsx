import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { capitalize, Divider, Grid, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import EmailLoginForm from '../email-login-form/EmailLoginForm';
import ProviderLoginButton from '../../../components/atoms/provider-login-button/ProviderLoginButton';
import AuthContainer from '../../../components/organisms/auth-container/AuthContainer';
import SwipingTabs from '../../../components/organisms/swiping-tabs/SwipingTabs';
import { LoginProviders, LoginProvider } from '../../../contexts/AuthContextProvider';
import RegistrationForm from '../registration-form/RegistrationForm';

const LoginPage: FC = (): JSX.Element => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    const LoginWithExternal = () => (
        <>
            <EmailLoginForm />
            <Stack spacing={2}>
                <Divider sx={{ marginTop: 2 }}>OR</Divider>
                {LoginProviders.map(({ name, color, icon }: LoginProvider) => (
                    <ProviderLoginButton key={name} name={name} color={color} icon={icon}>
                        {t('idp.login.button', { idp: capitalize(name) })}
                    </ProviderLoginButton>
                ))}
                <Typography
                    sx={{ textAlign: 'justify' }}
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
        </>
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
                        { label: 'Login', content: LoginWithExternal() },
                        { label: 'Register', content: <RegistrationForm /> }
                    ]}
                />
            </AuthContainer>
        </Grid>
    );
};

export default LoginPage;
