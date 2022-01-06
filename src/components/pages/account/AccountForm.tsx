import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponsiveContainer from '../../organisms/responsive-container/ResponsiveContainer';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import { renderFileChooser, renderTextField } from '../../molecules/ReduxFields';
import { SaveOutlined } from '@mui/icons-material';
import { connect, RootStateOrAny, useDispatch } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContextProvider';
import useEntityManager from '../../../hooks/useEntityManager';
import useFileManager from '../../../hooks/useFileManager';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { AccountDispatcher } from '../../../reducers/account-reducer';

export interface AccountFormFields {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    profilePicture?: File;
    profilePicturePath?: string;
}

export type UserProfile = {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    profilePicturePath?: string;
};

const AccountForm: FC<InjectedFormProps<AccountFormFields>> = (props: InjectedFormProps<AccountFormFields>) => {
    const { handleSubmit, pristine, submitting } = props;

    const dispatch = useDispatch();
    const accountDispatcher = new AccountDispatcher(dispatch);

    const { t } = useTranslation();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const fileManager = useFileManager<File>('profile_pictures');
    const entityManager = useEntityManager<UserProfile>('users', false);

    const [state, setState] = useState<AccountFormFields>();
    const [profilePictureURL, setProfilePictureURL] = useState<string>();

    const loadProfile = useCallback(() => {
        user &&
            user.uid &&
            user.email &&
            entityManager.findById(user?.uid).then((u: UserProfile) => {
                const { firstName, lastName, username, profilePicturePath } = u;
                const { email } = user;
                setState({ ...state, firstName, lastName, username, email, profilePicturePath });
                accountDispatcher.load({ firstName, lastName, username, profilePicturePath });
                console.log({ firstName, lastName, username, profilePicturePath });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    useEffect(() => {
        if (state?.profilePicturePath) {
            fileManager.getFileURL(`profile_pictures/${user?.uid}/${state?.profilePicturePath}`).then((url) => {
                setProfilePictureURL(url);
            });
        }
    }, [state?.profilePicturePath, user?.uid, fileManager]);

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'file') {
            const file = event.target.files && event.target.files[0];
            setState({
                ...state,
                [event.target.name]: file
            });
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
        }
    };

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (state) {
    //         const { firstName, lastName, username, profilePicture } = state;
    //         state.profilePicture && fileManager.uploadFile(state?.profilePicture, user?.uid);
    //         const profilePicturePath = profilePicture?.name;
    //         entityManager
    //             .updateEntity({
    //                 firstName,
    //                 lastName,
    //                 id: user?.uid,
    //                 ...(username && { username }),
    //                 ...(profilePicturePath && { profilePicturePath })
    //             })
    //             .then(() => {
    //                 enqueueSnackbar(t('notifications.profile.update.success'), { variant: 'success' });
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 enqueueSnackbar(t('notifications.profile.update.failed'), { variant: 'error' });
    //             })
    //             .finally(loadProfile);
    //     }
    // };
    const handleDeleteProfilePicture = async () =>
        await fileManager.deleteFile(`profile_pictures/${user?.uid}/${state?.profilePicturePath}`).finally(() => {
            entityManager
                .updateEntity({ id: user?.uid, profilePicturePath: '' })
                .then(() => {
                    enqueueSnackbar(t('notifications.profile.deleteProfilePicture.success'), { variant: 'success' });
                })
                .catch(() => {
                    enqueueSnackbar(t('notifications.profile.deleteProfilePicture.failed'), { variant: 'error' });
                })
                .finally(loadProfile);
        });

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
                            onChange={handleChangeEvent}
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
                        readonly
                        defaultValue={'ABC@def.gh'}
                        component={renderTextField}
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

export default reduxForm({ form: 'accountForm' /*, validate, asyncValidate*/ })(
    connect((state: RootStateOrAny) => ({ initialValues: state.account.data }))(AccountForm)
);
