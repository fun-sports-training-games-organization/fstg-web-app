import React, { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { FirestoreReducer } from 'redux-firestore';
import { useTranslation } from 'react-i18next';
import TimeField from './molecules/TimeField';
import CountField from './molecules/CountField';
import LabeledCheckbox from './molecules/LabeledCheckbox';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = FirestoreReducer.Entity<any>;
type Props = {
    entity: Entity;
    setEntity: Dispatch<SetStateAction<Entity>>;
};

const CreateEditExerciseForm = ({ entity, setEntity }: Props): JSX.Element => {
    const { t } = useTranslation();
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEntity({ ...entity, [event.target.name]: event.target.value });
    };

    const onCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean): void => {
        setEntity({ ...entity, [event.target.name]: checked });
    };

    return (
        <form>
            <Stack spacing={2} mt={2}>
                <TextField
                    id={`exercise.name`}
                    label={t('Exercise Name')}
                    type={'text'}
                    value={entity.name}
                    fullWidth
                    onChange={handleChange}
                    name={'name'}
                />
                <TextField
                    id={`exercise.imageOrGifUrl`}
                    label={t('Image/GIF URL')}
                    type={'text'}
                    value={entity.imageOrGifUrl}
                    fullWidth
                    onChange={handleChange}
                    name={'imageOrGifUrl'}
                />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Default Amount Type</FormLabel>
                    <RadioGroup row aria-label="defaultAmountType" name="row-radio-buttons-group">
                        <FormControlLabel
                            value="COUNT_BASED"
                            control={
                                <Radio
                                    checked={entity.amountType === 'COUNT_BASED'}
                                    name={'amountType'}
                                    onChange={handleChange}
                                />
                            }
                            label="Count-based"
                        />
                        <FormControlLabel
                            value="TIME_BASED"
                            control={
                                <Radio
                                    checked={entity.amountType === 'TIME_BASED'}
                                    name={'amountType'}
                                    onChange={handleChange}
                                />
                            }
                            label="Time-based"
                        />
                    </RadioGroup>
                </FormControl>
                {entity.amountType === 'TIME_BASED' ? (
                    <TimeField
                        label={'Default Time'}
                        value={entity.amountValue}
                        setValue={(seconds: number) => {
                            setEntity({ ...entity, amountValue: seconds });
                        }}
                    />
                ) : (
                    <CountField
                        min={0}
                        max={100}
                        value={entity.amountValue}
                        setValue={(value: number) => setEntity({ ...entity, amountValue: value })}
                    />
                )}
                <LabeledCheckbox
                    checked={entity.recordResultsByDefault}
                    onChange={onCheckboxChange}
                    name={'recordResultsByDefault'}
                    label={'Record Results By Default'}
                />
                {entity.recordResultsByDefault && (
                    <>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Default Result Type</FormLabel>
                            <RadioGroup row aria-label="defaultAmountType" name="row-radio-buttons-group">
                                <FormControlLabel
                                    value="COUNT_BASED"
                                    control={
                                        <Radio
                                            checked={entity.resultType === 'COUNT_BASED'}
                                            name={'resultType'}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Count-based"
                                />
                                <FormControlLabel
                                    onChange={(e: SyntheticEvent) => console.log(e)}
                                    value="TIME_BASED"
                                    control={
                                        <Radio
                                            checked={entity.resultType === 'TIME_BASED'}
                                            name={'resultType'}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Time-based"
                                />
                            </RadioGroup>
                        </FormControl>
                        <LabeledCheckbox
                            checked={entity.useDefaultResults}
                            name={'useDefaultResults'}
                            onChange={onCheckboxChange}
                            label={'Use Default Results'}
                        />
                        {entity.useDefaultResults &&
                            (entity.resultType === 'TIME_BASED' ? (
                                <TimeField
                                    label={'Default Results'}
                                    value={entity.resultValue}
                                    setValue={(seconds: number) => {
                                        setEntity({ ...entity, resultValue: seconds });
                                    }}
                                />
                            ) : (
                                <CountField
                                    min={0}
                                    max={100}
                                    value={entity.resultValue}
                                    setValue={(value: number) => setEntity({ ...entity, resultValue: value })}
                                />
                            ))}
                    </>
                )}
            </Stack>
        </form>
    );
};
export default CreateEditExerciseForm;
