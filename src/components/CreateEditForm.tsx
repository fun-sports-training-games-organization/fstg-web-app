import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Stack } from '@mui/material';
import TextField from './atoms/TextField';
import { FirestoreReducer } from 'redux-firestore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = FirestoreReducer.Entity<any>;
type Props = {
    entity: Entity;
    setEntity: Dispatch<SetStateAction<Entity>>;
};

const CreateEditForm = ({ entity, setEntity }: Props): JSX.Element => {
    const firstNonIdKey = entity && Object.keys(entity).filter((key: string) => key !== 'id')[0];
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string): void => {
        setEntity({ ...entity, [key]: event.target.value });
    };
    return (
        <form>
            <Stack spacing={2} mt={2}>
                {Object.keys(entity)
                    .filter((key: string) => key !== 'id')
                    .map((key: string) => (
                        <TextField
                            key={key}
                            autoFocus={firstNonIdKey === key}
                            id={`${key}.${key}`}
                            label={key}
                            type={'text'}
                            value={entity[key]}
                            fullWidth
                            onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
                                handleChange(event, key)
                            }
                        />
                    ))}
            </Stack>
        </form>
    );
};
export default CreateEditForm;
