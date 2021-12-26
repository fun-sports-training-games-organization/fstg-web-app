import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextField from '../../components/atoms/text-field/TextField';
import { useAuth } from '../../contexts/AuthContextProvider';
import useEntityManager from '../../hooks/useEntityManager';
import FileChooser from '../../components/molecules/file-input/FileChooser';
import useFileManager from '../../hooks/useFileManager';
import { useSnackbar } from 'notistack';

interface State {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    profilePicture?: File;
    profilePicturePath?: string;
}

type UserProfile = {
    firstName?: string;
    lastName?: string;
    username?: string;
    profilePicturePath?: string;
};

const RegistrationForm: FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const fileManager = useFileManager<File>('profile_pictures');
    const entityManager = useEntityManager<UserProfile>('users');

    const [state, setState] = useState<State>();
    const [profilePictureURL, setProfilePictureURL] = useState<string>();

    const loadProfile = useCallback(() => {
        user &&
            user.uid &&
            user.email &&
            entityManager.findById(user?.uid).then((u: UserProfile) => {
                const { firstName, lastName, username, profilePicturePath } = u;
                const { email } = user;
                setState({ ...state, firstName, lastName, username, email, profilePicturePath });
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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state) {
            const { firstName, lastName, username, profilePicture } = state;
            state.profilePicture && fileManager.uploadFile(state?.profilePicture, user?.uid);
            const profilePicturePath = profilePicture?.name;
            entityManager
                .updateEntity({
                    firstName,
                    lastName,
                    username,
                    id: user?.uid,
                    ...(profilePicturePath && { profilePicturePath })
                })
                .then(() => {
                    enqueueSnackbar(t('notifications.profile.update.success'), { variant: 'success' });
                })
                .catch((err) => {
                    console.log(err);
                    enqueueSnackbar(t('notifications.profile.update.failed'), { variant: 'error' });
                })
                .finally(loadProfile);
        }
    };
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
        <form onSubmit={handleSubmit}>
            <Stack padding={2} spacing={2} alignItems={'center'}>
                {profilePictureURL ? (
                    <>
                        <Avatar alt="Profile Picture" src={profilePictureURL} />
                        <Button onClick={handleDeleteProfilePicture}>Delete profile picture</Button>
                    </>
                ) : (
                    <FileChooser
                        fullWidth
                        id={'profilePicture-field'}
                        label={t('form.label.account.profilePicture')}
                        name={'profilePicture'}
                        onChange={handleChangeEvent}
                    />
                )}

                <TextField
                    shrinkLabel={true}
                    fullWidth
                    autoFocus
                    id={'username-field'}
                    label={t('form.label.registration.username')}
                    value={state?.username}
                    name={'username'}
                    onChange={handleChangeEvent}
                />
                <TextField
                    shrinkLabel={true}
                    fullWidth
                    id={'first-name-field'}
                    label={t('form.label.registration.firstName')}
                    value={state?.firstName}
                    name={'firstName'}
                    required
                    onChange={handleChangeEvent}
                />
                <TextField
                    shrinkLabel={true}
                    fullWidth
                    id={'last-name-field'}
                    label={t('form.label.registration.lastName')}
                    value={state?.lastName}
                    name={'lastName'}
                    required
                    onChange={handleChangeEvent}
                />
                <TextField
                    shrinkLabel={true}
                    fullWidth
                    id={'email-field'}
                    label={t('form.label.registration.email')}
                    value={state?.email}
                    name={'email'}
                    required
                    readOnly
                    onChange={handleChangeEvent}
                />
                <Button type={'submit'} variant={'contained'} color={'primary'} fullWidth>
                    {t('form.button.account.saveProfile')}
                </Button>
            </Stack>
        </form>
    );
};

export default RegistrationForm;
