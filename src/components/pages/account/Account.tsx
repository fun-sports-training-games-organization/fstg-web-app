import AccountForm from '../../organisms/forms/account-form/AccountForm';
import { AccountDispatcher, AccountState } from '../../../reducers/account-reducer';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import useFileManager from '../../../hooks/useFileManager';
import useEntityManager from '../../../hooks/useEntityManager';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

const Account: FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const accountDispatcher = new AccountDispatcher(dispatch);

    const fileManager = useFileManager<File>('profile_pictures');
    const entityManager = useEntityManager<AccountState>('users', false);
    const [profilePicturePath, setProfilePicturePath] = useState<string>();
    const [profilePictureURL, setProfilePictureURL] = useState<string>();
    const [isExternalProvider, setIsExternalProvider] = useState<boolean>();

    const loadProfile = useCallback(() => {
        console.log(user);
        user?.providerData &&
            user.providerData[0] &&
            setIsExternalProvider(user?.providerData[0].providerId !== 'password');
        user &&
            user.uid &&
            user.email &&
            entityManager.findById(user?.uid).then((account: AccountState) => {
                const { firstName, lastName, username, profilePicturePath } = account;
                const { email } = user;
                accountDispatcher.load({ firstName, lastName, username, email, profilePicturePath });
                setProfilePicturePath(profilePicturePath);
                if (profilePicturePath) {
                    fileManager.getFileURL(`profile_pictures/${user?.uid}/${profilePicturePath}`).then((url) => {
                        setProfilePictureURL(url);
                    });
                } else if (user.photoURL) {
                    setProfilePictureURL(user.photoURL);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const handleSubmit = (values: AccountState) => {
        if (values) {
            const { firstName, lastName, username, profilePicture } = values;
            let emptyUsername;
            if (typeof username === 'string' && username.trim().length === 0) {
                emptyUsername = true;
            }
            let profilePicturePath;
            if (profilePicture && profilePicture.length > 0) {
                profilePicture && fileManager.uploadFile(profilePicture[0], user?.uid);
                profilePicturePath = profilePicture && profilePicture[0].name;
            }
            entityManager
                .updateEntity({
                    id: user?.uid,
                    firstName,
                    lastName,
                    ...((username || emptyUsername) && { username }),
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
        await fileManager.deleteFile(`profile_pictures/${user?.uid}/${profilePicturePath}`).finally(() => {
            entityManager
                .updateEntity({ id: user?.uid, profilePicturePath: '' })
                .then(() => {
                    enqueueSnackbar(t('notifications.profile.deleteProfilePicture.success'), { variant: 'success' });
                })
                .catch(() => {
                    enqueueSnackbar(t('notifications.profile.deleteProfilePicture.failed'), { variant: 'error' });
                })
                .finally(() => {
                    loadProfile();
                    setProfilePictureURL(undefined);
                });
        });

    return (
        <AccountForm
            isExternalProvider={isExternalProvider}
            onSubmit={handleSubmit}
            profilePictureURL={profilePictureURL}
            handleDeleteProfilePicture={handleDeleteProfilePicture}
        />
    );
};
export default Account;
