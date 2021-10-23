import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, List, ListItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContextProvider';
import { Redirect } from 'react-router-dom';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import TextField from '../components/TextField';
import { useSnackbar } from 'notistack';

interface Exercise {
    id: string;
    name: string;
}

const HomePage: FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState<string>();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const { user } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        onSnapshot(collection(db, 'exercises'), (snapshot) => {
            const exercises = snapshot.docs.map((doc) => doc.data());
            setExercises(exercises as Exercise[]);
        });
    }, []);

    const handleNew = async () => {
        const collectionRef = collection(db, 'exercises');
        const payload = { name };
        await addDoc(collectionRef, payload); // to add with auto generate id
        enqueueSnackbar(`${name} has been added successfully!`, { variant: 'success' });
        setName('');
    };

    if (user) {
        const { displayName } = user;
        return (
            <Stack padding={3} spacing={3}>
                <Typography mt={3} ml={3} variant={'h3'} sx={{ textTransform: 'none' }}>
                    {t('page.home.welcome', { displayName })}
                </Typography>
                <List>
                    {exercises.map((exercise: Exercise) => (
                        <ListItem key={exercise.id}>{exercise.name}</ListItem>
                    ))}
                </List>
                <TextField
                    label={'Exercise'}
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                />
                <Button onClick={handleNew}>Add New Exercise</Button>
            </Stack>
        );
    } else {
        return <Redirect to={'/login'} />;
    }
};

export default HomePage;
