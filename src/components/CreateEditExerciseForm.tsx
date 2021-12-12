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
    setEntity: Dispatch<SetStateAction<Entity>> | ((entity: Entity) => void);
    inWorkout?: boolean;
};

const CreateEditExerciseForm = ({ entity, setEntity, inWorkout = false }: Props): JSX.Element => {
    const { t } = useTranslation();
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEntity({ ...entity, [event.target.name]: event.target.value });
    };

    const onCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean): void => {
        setEntity({ ...entity, [event.target.name]: checked });
    };

    const getAmountValueInSeconds = (date: unknown): number => {
        const dateValue = (date as Date).valueOf();
        const d = new Date();
        d.setMinutes(0, 0, 0);
        return Math.round((dateValue < 86400000 ? dateValue : dateValue - d.valueOf()) / 1000);
    };

    const getDateFromSeconds = (seconds: number): Date => {
        const date = new Date();
        const minutes = seconds < 60 ? 0 : Math.floor(seconds / 60);
        const displaySeconds = seconds < 60 ? seconds : seconds % 60;
        date.setMinutes(minutes, displaySeconds, 0);
        return date;
    };

    return (
        <form>
            <Stack spacing={2} mt={2}>
                {!inWorkout ? (
                    <>
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
                            hidden={inWorkout}
                        />
                    </>
                ) : null}

                <FormControl component="fieldset">
                    <FormLabel component="legend">{inWorkout ? '' : 'Default '}Amount Type</FormLabel>
                    <RadioGroup
                        row
                        aria-label={inWorkout ? 'amountType' : 'defaultAmountType '}
                        name="row-radio-buttons-group"
                    >
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
                        label={`${inWorkout ? '' : 'Default '}Time`}
                        value={getDateFromSeconds(entity.amountValue)}
                        onChange={(date: unknown) => {
                            setEntity({ ...entity, amountValue: getAmountValueInSeconds(date) });
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
                    checked={inWorkout ? entity.recordResults : entity.recordResultsByDefault}
                    onChange={onCheckboxChange}
                    name={inWorkout ? 'recordResults' : 'recordResultsByDefault'}
                    label={inWorkout ? 'Record Results' : 'Record Results By Default'}
                />
                {(inWorkout ? entity.recordResults : entity.recordResultsByDefault) && (
                    <>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{inWorkout ? '' : 'Default '}Result Type</FormLabel>
                            <RadioGroup
                                row
                                aria-label={inWorkout ? 'amountType' : 'defaultAmountType '}
                                name="row-radio-buttons-group"
                            >
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
                            checked={entity.useDefaultResult}
                            name={'useDefaultResult'}
                            onChange={onCheckboxChange}
                            label={'Use Default Result'}
                        />
                        {entity.useDefaultResult &&
                            (entity.resultType === 'TIME_BASED' ? (
                                <TimeField
                                    label={'Default Result'}
                                    value={getDateFromSeconds(entity.resultValue)}
                                    onChange={(date: unknown) => {
                                        setEntity({ ...entity, resultValue: getAmountValueInSeconds(date) });
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
