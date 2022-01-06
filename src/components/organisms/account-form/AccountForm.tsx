import { FC } from 'react';
import { Avatar, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponsiveContainer from '../responsive-container/ResponsiveContainer';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import { renderFileChooser, renderReadOnlyTextField, renderTextField } from '../../molecules/ReduxFields';
import { SaveOutlined } from '@mui/icons-material';
import { connect, RootStateOrAny } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { AccountState } from '../../../reducers/account-reducer';

type OwnProps = {
    profilePictureURL?: string;
    handleDeleteProfilePicture: () => void;
};

const AccountForm: FC<OwnProps & InjectedFormProps<AccountState>> = (
    props: OwnProps & InjectedFormProps<AccountState>
) => {
    const { handleSubmit, pristine, submitting, profilePictureURL, handleDeleteProfilePicture } = props;
    const { t } = useTranslation();
    return (
        <ResponsiveContainer>
            <Form onSubmit={handleSubmit}>
                <Stack padding={2} spacing={2} alignItems={'center'}>
                    {profilePictureURL ? (
                        <>
                            <Avatar sx={{ height: 56, width: 56 }} alt="Profile Picture" src={profilePictureURL} />
                            <Button color="secondary" variant="contained" onClick={handleDeleteProfilePicture}>
                                Delete profile picture
                            </Button>
                        </>
                    ) : (
                        <Field
                            name={'profilePicture'}
                            label={t('form.label.account.profilePicture')}
                            component={renderFileChooser}
                            // onChange={handleChangeEvent}
                        />
                    )}
                    <Field
                        autoComplete={'username'}
                        name={'username'}
                        label={t('form.label.registration.username')}
                        component={renderTextField}
                    />
                    <Field
                        autoComplete={'given-name'}
                        name={'firstName'}
                        label={t('form.label.registration.firstName')}
                        component={renderTextField}
                    />
                    <Field
                        autoComplete={'family-name'}
                        name={'lastName'}
                        label={t('form.label.registration.lastName')}
                        component={renderTextField}
                    />
                    <Field
                        label={t('form.label.registration.email')}
                        name={'email'}
                        component={renderReadOnlyTextField}
                    />
                    <LoadingButton
                        loading={submitting}
                        loadingPosition="start"
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        fullWidth
                        disabled={pristine || submitting}
                        startIcon={<SaveOutlined />}
                    >
                        {t('form.button.account.saveProfile')}
                    </LoadingButton>
                </Stack>
            </Form>
        </ResponsiveContainer>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduxFormAccountForm = reduxForm<any, any>({ form: 'accountForm' /*, validate, asyncValidate*/ })(AccountForm);

const connectedReduxFormAccountForm = connect((state: RootStateOrAny) => ({ initialValues: state.account.data }))(
    reduxFormAccountForm
);

export default connectedReduxFormAccountForm;
