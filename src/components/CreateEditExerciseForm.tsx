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
    const PREFIX = 'form.label.exercise';
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setEntity({ ...entity, [event.target.name]: event.target.value });
    };

    const onCheckboxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean): void => {
        setEntity({ ...entity, [event.target.name]: checked });
    };

    return (
        <form>
            <Stack spacing={2} mt={2}>
                {!inWorkout ? (
                    <>
                        <TextField
                            id={`exercise.name`}
                            label={t(`${PREFIX}.name`)}
                            type={'text'}
                            value={entity.name}
                            fullWidth
                            onChange={handleChange}
                            name={'name'}
                        />
                        <TextField
                            id={`${PREFIX}.imgUrl`}
                            label={t(`${PREFIX}.defaultAmountType`)}
                            type={'text'}
                            value={entity.imageOrGifUrl}
                            fullWidth
                            onChange={handleChange}
                            name={'imageOrGifUrl'}
                        />
                    </>
                ) : null}

                <FormControl component="fieldset">
                    <FormLabel component="legend">{t(`${PREFIX}.defaultAmountType`)}</FormLabel>
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
                            label={t(`${PREFIX}.countBased`)}
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
                            label={t(`${PREFIX}.timeBased`)}
                        />
                    </RadioGroup>
                </FormControl>
                {entity.amountType === 'TIME_BASED' ? (
                    <TimeField
                        label={`${PREFIX}.defaultTime`}
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
                    checked={inWorkout ? entity.recordResults : entity.recordResultsByDefault}
                    onChange={onCheckboxChange}
                    name={'recordResultsByDefault'}
                    label={t(`${PREFIX}.recordResultsByDefault`)}
                />
                {(inWorkout ? entity.recordResults : entity.recordResultsByDefault) && (
                    <>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{t(`${PREFIX}.defaultResultType`)}</FormLabel>
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
                                    label={t(`${PREFIX}.countBased`)}
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
                                    label={t(`${PREFIX}.timeBased`)}
                                />
                            </RadioGroup>
                        </FormControl>
                        <LabeledCheckbox
                            checked={entity.useDefaultResult}
                            name={'useDefaultResult'}
                            onChange={onCheckboxChange}
                            label={t(`${PREFIX}.useDefaultResults`)}
                        />
                        {entity.useDefaultResult &&
                            (entity.resultType === 'TIME_BASED' ? (
                                <TimeField
                                    label={t(`${PREFIX}.defaultResults`)}
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
