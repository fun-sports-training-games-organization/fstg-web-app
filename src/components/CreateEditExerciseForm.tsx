import React, { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import TextField from './atoms/TextField';
import { FirestoreReducer } from 'redux-firestore';
import { useTranslation } from 'react-i18next';
import TimeField from './molecules/TimeField';
import CountField from './molecules/CountField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = FirestoreReducer.Entity<any>;
type Props = {
    entity: Entity;
    setEntity: Dispatch<SetStateAction<Entity>>;
};

type ValueType = 'CountBased' | 'TimeBased';
const CreateEditExerciseForm = ({ entity, setEntity }: Props): JSX.Element => {
    const { t } = useTranslation();
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEntity({ ...entity, [event.target.name]: event.target.value });
    };
    const [valueType, setValueType] = useState<ValueType>('CountBased');
    const [defaultTimeAmount, setDefaultTimeAmount] = useState<Date | null | unknown>(null);
    const [defaultCountAmount, setDefaultCountAmount] = useState<number>(0);
    return (
        <form>
            <Stack spacing={2} mt={2}>
                <TextField
                    id={`exercise.name`}
                    label={t('exercise.name')}
                    type={'text'}
                    value={entity.name}
                    fullWidth
                    onChange={handleChange}
                    name={entity.name}
                />
                <TextField
                    id={`exercise.imageOrGifUrl`}
                    label={t('exercise.imageOrGifUrl')}
                    type={'text'}
                    value={entity.imageOrGifUrl}
                    fullWidth
                    onChange={handleChange}
                    name={entity.imageOrGifUrl}
                />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Value Type</FormLabel>
                    <RadioGroup row aria-label="defaulAmountType" name="row-radio-buttons-group">
                        <FormControlLabel
                            value="CountBased"
                            control={
                                <Radio
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setValueType(e.target.value as ValueType)
                                    }
                                />
                            }
                            label="Count-based"
                        />
                        <FormControlLabel
                            onChange={(e: SyntheticEvent) => console.log(e)}
                            value="TimeBased"
                            control={
                                <Radio
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setValueType(e.target.value as ValueType)
                                    }
                                />
                            }
                            label="Time-based"
                        />
                    </RadioGroup>
                </FormControl>
                {valueType === 'TimeBased' ? (
                    <TimeField value={defaultTimeAmount} setValue={setDefaultTimeAmount} />
                ) : (
                    <CountField min={0} max={100} value={defaultCountAmount} setValue={setDefaultCountAmount} />
                )}
            </Stack>
        </form>
    );
};
export default CreateEditExerciseForm;
