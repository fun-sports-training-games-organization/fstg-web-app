import ProfileForm from '../../organisms/forms/profile-form/ProfileForm';
import { ProfileDispatcher, ProfileState } from '../../../reducers/profile-reducer';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';
import useFileManager from '../../../hooks/useFileManager';
import useEntityManager from '../../../hooks/useEntityManager';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { fileSizeTooLarge } from '../../../util/notifications-util';
import { ONE_MEGABYTE } from '../../../util/validation';
import { convertFirebaseDateObjectToDateString } from '../../../util/date-util';

const Profile: FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const profileDispatcher = new ProfileDispatcher(dispatch);

    const fileManager = useFileManager<File>('profile_pictures');
    const entityManager = useEntityManager<ProfileState>('users', false);
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
            entityManager.findById(user?.uid).then((profile: ProfileState) => {
                const {
                    firstName,
                    lastName,
                    nickname,
                    profilePicturePath,
                    weight,
                    height,
                    gender,
                    unit,
                    dateOfBirth: dob
                } = profile;
                const { email } = user;
                const dateOfBirth = dob && convertFirebaseDateObjectToDateString(dob);
                profileDispatcher.load({
                    firstName,
                    lastName,
                    nickname,
                    email,
                    profilePicturePath,
                    weight,
                    height,
                    gender,
                    unit,
                    dateOfBirth
                });

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

    const handleSubmit = async (values: ProfileState): Promise<void | SubmissionError> => {
        if (values) {
            const { firstName, lastName, nickname, gender, height, weight, profilePicture, dateOfBirth, unit } = values;
            let emptyNickname;
            if (typeof nickname === 'string' && nickname.trim().length === 0) {
                emptyNickname = true;
            }
            let profilePicturePath;
            if (profilePicture && profilePicture.length > 0) {
                if (profilePicture[0].size > ONE_MEGABYTE) {
                    fileSizeTooLarge(enqueueSnackbar, t, { limit: '1MB' });
                    return new SubmissionError({ profilePicture: 'File size too large!' });
                } else {
                    profilePicture && (await fileManager.uploadFile(profilePicture[0], user?.uid));
                    profilePicturePath = profilePicture && profilePicture[0].name;
                }
            }
            await entityManager
                .updateEntity({
                    id: user?.uid,
                    firstName,
                    lastName,
                    ...(unit && { unit }),
                    ...(gender && { gender }),
                    ...(height && { height }),
                    ...(weight && { weight }),
                    ...(dateOfBirth && { dateOfBirth }),
                    ...((nickname || emptyNickname) && { nickname }),
                    ...(profilePicturePath && { profilePicturePath })
                })
                .then(() => {
                    enqueueSnackbar(t('notifications.profile.update.success'), { variant: 'success' });
                })
                .catch(() => {
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
        <ProfileForm
            isExternalProvider={isExternalProvider}
            onSubmit={handleSubmit}
            profilePictureURL={profilePictureURL}
            handleDeleteProfilePicture={handleDeleteProfilePicture}
        />
    );
};
export default Profile;
