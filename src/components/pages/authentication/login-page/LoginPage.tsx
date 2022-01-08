import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { capitalize, Divider, Grid, Link, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import EmailLoginForm, { EmailLoginFormField } from '../email-login-form/EmailLoginForm';
import ProviderLoginButton from '../../../atoms/provider-login-button/ProviderLoginButton';
import AuthContainer from '../../../templates/containers/auth-container/AuthContainer';
import SwipingTabs from '../../../organisms/swiping-tabs/SwipingTabs';
import { LoginProvider, LoginProviders, useAuth } from '../../../../contexts/AuthContextProvider';
import RegistrationForm, { RegistrationFormFields } from '../registration-form/RegistrationForm';
import PageTitle from '../../../atoms/page-title/PageTitle';

const LoginPage: FC = (): JSX.Element => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { t } = useTranslation();
    const { registerWithEmail, loginWithEmail, sendResetPasswordLink } = useAuth();

    const LoginWithExternal = () => (
        <>
            <EmailLoginForm
                onSubmit={async ({ email, password }: EmailLoginFormField) => {
                    if (email && password) {
                        await loginWithEmail(email, password);
                    } else if (email) {
                        await sendResetPasswordLink(email);
                    }
                    // forgotPasswordMode ? resetPassword() : signIn();
                }}
            />
            <Stack spacing={2}>
                <Divider sx={{ marginTop: 2 }}>OR</Divider>
                {LoginProviders.map(({ name, color, icon }: LoginProvider) => (
                    <ProviderLoginButton useAuth={useAuth} key={name} name={name} color={color} icon={icon}>
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
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            width={'100%'}
            style={{ marginTop: smDown ? '0px' : '100px' }}
        >
            <AuthContainer header={<PageTitle align={'center'} translationKey={'FSTG'} />}>
                <SwipingTabs
                    tabs={[
                        { label: t('page.login.tabLabel.login'), content: LoginWithExternal() },
                        {
                            label: t('page.login.tabLabel.register'),
                            content: (
                                <RegistrationForm
                                    onSubmit={({
                                        email,
                                        password,
                                        firstName,
                                        lastName,
                                        username
                                    }: RegistrationFormFields) =>
                                        registerWithEmail(email, password, firstName, lastName, username)
                                    }
                                />
                            )
                        }
                    ]}
                />
            </AuthContainer>
        </Grid>
    );
};

export default LoginPage;
