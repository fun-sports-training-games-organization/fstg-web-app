import { Avatar, Button, Grid, List, ListItem, ListItemText, Theme, Typography, useMediaQuery } from '@mui/material';
import DashboardCard from '../dashboard-card/DashboardCard';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import useEntityManager from '../../../../hooks/useEntityManager';
import * as navigate from '../../../../util/navigation-util';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../../atoms/page-title/PageTitle';
import Loader from '../../../atoms/loader/Loader';
import { ProfileState, Unit } from '../../../../reducers/profile-reducer';
import { useAuth } from '../../../../contexts/AuthContextProvider';
import useFileManager from '../../../../hooks/useFileManager';
import { convertStringToDateWithLocale, getAge } from '../../../../util/date-util';
import { calculateBmiInImperial, calculateBmiInMetric } from '../../../../util/bmi-util';
import { DraggableProps } from '../dashboard-card/DashboardCard.types';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            background: stringToColor(name),
            height: 100,
            width: 100
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
}

const generateListItemText = (text?: string) =>
    text && (
        <ListItem disablePadding sx={{ marginTop: 1 }}>
            <ListItemText>
                <Typography variant={'body1'}>{text}</Typography>
            </ListItemText>
        </ListItem>
    );

const ProfileCard: FC<DraggableProps> = ({ id, index, moveCard }: DraggableProps): JSX.Element => {
    const history = useHistory();
    const { t } = useTranslation();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { user } = useAuth();
    const fileManager = useFileManager<File>('profile_pictures');
    const { findById, loading } = useEntityManager<ProfileState>('users', false);
    const [profilePictureURL, setProfilePictureURL] = useState<string>();
    const [profile, setProfile] = useState<ProfileState>({});
    useEffect(() => {
        user &&
            user.uid &&
            findById(user.uid).then((profile: ProfileState) => {
                setProfile(profile);
                const { profilePicturePath } = profile;
                if (user?.photoURL) {
                    setProfilePictureURL(user.photoURL);
                } else if (profilePicturePath) {
                    fileManager.getFileURL(`profile_pictures/${user?.uid}/${profilePicturePath}`).then((url) => {
                        setProfilePictureURL(url);
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const goToProfilePage = () => navigate.toProfile(history);
    const ExerciseTitle = <PageTitle translationKey={'page.dashboard.profile.title'} align={'center'} />;
    return loading ? (
        <Loader />
    ) : (
        <DashboardCard
            id={id}
            index={index}
            moveCard={moveCard}
            cardProps={{ elevation: 5 }}
            cardHeaderProps={{ title: ExerciseTitle, ...(smDown && { sx: { paddingBottom: 0 } }) }}
            cardContentProps={smDown ? { sx: { paddingTop: 0 } } : undefined}
        >
            <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'space-between'}>
                <Grid item md={1} />
                <Grid item xs={4}>
                    {profilePictureURL ? (
                        <img
                            style={{
                                verticalAlign: 'center',
                                textAlign: 'center',
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '50%'
                            }}
                            src={profilePictureURL}
                            alt={'profile pic'}
                        />
                    ) : (
                        <Avatar {...stringAvatar(user?.displayName || `${profile.firstName} ${profile.lastName}`)} />
                    )}
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem disablePadding sx={{ marginTop: 1 }}>
                            <ListItemText>
                                <Typography fontWeight={'bold'} variant={'h5'}>
                                    {`${user?.displayName || `${profile.firstName} ${profile.lastName}`}`}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        {generateListItemText(
                            profile.dateOfBirth &&
                                t('page.dashboard.profile.age', {
                                    age: getAge(profile.dateOfBirth)
                                })
                        )}
                        {profile.height &&
                            profile.weight &&
                            profile.unit &&
                            typeof profile.height !== 'undefined' &&
                            typeof profile.height !== 'undefined' &&
                            generateListItemText(
                                t('page.dashboard.profile.bmi', {
                                    bmi:
                                        profile.unit === Unit.METRIC
                                            ? calculateBmiInMetric(profile.weight, profile.height).toFixed(2)
                                            : calculateBmiInImperial(profile.weight, profile.height).toFixed(2)
                                })
                            )}
                        {generateListItemText(
                            t('page.dashboard.profile.memberSince', {
                                datetime: convertStringToDateWithLocale(user?.metadata?.creationTime)
                            })
                        )}
                        <ListItem disablePadding sx={{ marginTop: 1 }}>
                            <Button
                                fullWidth
                                style={{ textTransform: 'none' }}
                                variant={'contained'}
                                onClick={goToProfilePage}
                                color={'primary'}
                            >
                                {t('page.dashboard.goToProfile')}
                            </Button>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default ProfileCard;
