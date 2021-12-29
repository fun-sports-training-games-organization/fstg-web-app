import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileChooser from '../file-input/FileChooser';
import useEntityManager from '../../../hooks/useEntityManager';
import { Exercise } from '../../../model/Exercise.model';
import useFileManager from '../../../hooks/useFileManager';
import { useAuth } from '../../../contexts/AuthContextProvider';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

type Props = {
    exercise: Exercise;
    maxHeight?: string;
    maxWidth?: string;
    noImageIconSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
    setExercise?: React.Dispatch<React.SetStateAction<Exercise>>;
    setChosenFile?: React.Dispatch<React.SetStateAction<File | null>>;
};

const CreateEditExerciseForm = ({
    exercise,
    maxHeight = '40vh',
    maxWidth = '100%',
    noImageIconSize = 'small',
    setExercise,
    setChosenFile
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { user } = useAuth();

    const fileManager = useFileManager<File>('exercises');
    const { updateEntity } = useEntityManager<Exercise>('exercises');
    const [imgUrl, setImUrl] = useState<string>();
    const PREFIX = 'form.label.exercise';

    useEffect(() => {
        if (exercise.imageOrGifUrl) {
            fileManager.getFileURL(exercise.imageOrGifUrl).then((imageUrl) => {
                setImUrl(imageUrl);
            });
        } else {
            setImUrl('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exercise.imageOrGifUrl]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setChosenFile && setChosenFile(file);
        setExercise &&
            setExercise({
                ...exercise,
                imageOrGifUrl: `exercises/${user?.uid}/${file?.name}`
            });
    };

    const deleteImage = () => {
        setExercise && setExercise({ ...exercise, imageOrGifUrl: '' });
        updateEntity(exercise).then(() => {
            exercise.imageOrGifUrl && fileManager.deleteFile(exercise.imageOrGifUrl);
        });
    };

    return imgUrl ? (
        <>
            <img
                src={imgUrl}
                alt={exercise.name}
                style={{
                    objectFit: 'contain',
                    maxWidth,
                    maxHeight
                }}
            />
            {setExercise ? (
                <Button variant={'contained'} color={'secondary'} onClick={deleteImage}>
                    {t('Delete Image')}
                </Button>
            ) : null}
        </>
    ) : setExercise && setChosenFile ? (
        <FileChooser
            fullWidth
            id={'exercise.image'}
            label={t(`${PREFIX}.imgUrl`)}
            name={exercise.imageOrGifUrl}
            onChange={handleChange}
        />
    ) : (
        <ImageNotSupportedIcon fontSize={noImageIconSize} />
    );
};
export default CreateEditExerciseForm;
