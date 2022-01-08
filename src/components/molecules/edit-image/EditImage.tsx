import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileChooser from '../inputs/file-input/FileChooser';
import useEntityManager from '../../../hooks/useEntityManager';
import { Exercise } from '../../../model/Exercise.model';
import useFileManager from '../../../hooks/useFileManager';
import { useAuth } from '../../../contexts/AuthContextProvider';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { getNewEmptyExercise } from '../../../util/exercise-util';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';

type Props = {
    exercise?: Exercise;
    exerciseId?: string;
    maxHeight?: string;
    maxWidth?: string;
    noImageIconSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
    setExercise?: React.Dispatch<React.SetStateAction<Exercise>>;
    setChosenFile?: React.Dispatch<React.SetStateAction<File | null>>;
};

const EditImage = ({
    exercise,
    exerciseId,
    maxHeight = '40vh',
    maxWidth = '100%',
    noImageIconSize = 'small',
    setExercise,
    setChosenFile
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const fileManager = useFileManager<File>('exercises');
    const { findById, updateEntity } = useEntityManager<Exercise>('exercises');
    const [imgUrl, setImUrl] = useState<string>();
    const PREFIX = 'form.label.exercise';
    const [exer, setExer] = useState<Exercise>(exercise ? exercise : getNewEmptyExercise());
    const [isLoading, setIsLoading] = useState<boolean>(exerciseId ? true : false);

    const loadExercise = useCallback((eId) => {
        if (eId) {
            findById(eId)
                .then((e) => {
                    setExer(e);
                    if (!e.imageOrGifUrl) {
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (exerciseId) {
            setIsLoading(true);
            loadExercise(exerciseId);
        } else {
            setExer(exercise ? exercise : getNewEmptyExercise());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exerciseId, exercise]);

    useEffect(() => {
        if (exer.imageOrGifUrl) {
            if (exer.imageOrGifUrl.includes('http')) {
                setImUrl(exer.imageOrGifUrl);
                setIsLoading(false);
            } else {
                fileManager.getFileURL(exer.imageOrGifUrl).then((imageUrl) => {
                    setImUrl(imageUrl);
                    setIsLoading(false);
                });
            }
        } else {
            setImUrl('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exer.imageOrGifUrl]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setChosenFile && setChosenFile(file);
        setExercise &&
            setExercise({
                ...exer,
                imageOrGifUrl: `exercises/${user?.uid}/${file?.name}`
            });
    };

    const deleteImage = () => {
        setExercise && setExercise({ ...exer, imageOrGifUrl: '' });
        updateEntity(exer).then(() => {
            exer.imageOrGifUrl && fileManager.deleteFile(exer.imageOrGifUrl);
        });
    };

    return isLoading ? (
        <Stack direction="row" justifyContent="center">
            <Card sx={{ minWidth: 100, m: 2, flexDirection: 'row', justifyContent: 'center' }}>
                <Skeleton sx={{ minHeight: 100 }} animation="pulse" variant="rectangular" />
            </Card>
        </Stack>
    ) : (
        <>
            {imgUrl && (
                <img
                    src={imgUrl}
                    alt={exer.name}
                    style={{
                        objectFit: 'contain',
                        maxWidth,
                        maxHeight
                    }}
                />
            )}
            {!imgUrl && !setExercise && !setChosenFile && (
                <Stack direction="row" justifyContent="center">
                    <ImageNotSupportedIcon fontSize={noImageIconSize} />
                </Stack>
            )}
            {imgUrl && setExercise && (
                <Button variant={'contained'} color={'secondary'} onClick={deleteImage}>
                    {t('form.button.exercise.deleteImage')}
                </Button>
            )}
            {!imgUrl && setExercise && setChosenFile && (
                <FileChooser
                    fullWidth
                    id={'exercise.image'}
                    label={t(`${PREFIX}.imgUrl`)}
                    name={exer.imageOrGifUrl}
                    onChange={handleChange}
                />
            )}
        </>
    );
};
export default EditImage;
