import { ChangeEvent, FC, useState } from 'react';
import { Avatar, Button, FormControlLabel, Radio, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';
import {
    renderDatePicker,
    renderEmailField,
    renderFileChooser,
    renderNumberField,
    renderRadioGroup,
    renderTextField
} from '../../../molecules/inputs/redux-fields/ReduxFields';
import { SaveOutlined } from '@mui/icons-material';
import { connect, RootStateOrAny } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { AccountState, Unit } from '../../../../reducers/account-reducer';
import {
    alphaNumeric,
    email,
    heavierThanLightestPersonEver,
    lighterThanHeaviestPersonEver,
    maxLength30,
    minLength2,
    minLengthName,
    number,
    required,
    shorterThanTallestPersonEver,
    tallerThanShortestPersonEver
} from '../../../../util/validation';
import { lower, name } from '../../../../util/normalize';

type OwnProps = {
    profilePictureURL?: string;
    handleDeleteProfilePicture: () => void;
    isExternalProvider?: boolean;
};

const AccountForm: FC<OwnProps & InjectedFormProps<AccountState>> = ({
    handleSubmit,
    pristine,
    submitting,
    profilePictureURL,
    handleDeleteProfilePicture,
    isExternalProvider
}: OwnProps & InjectedFormProps<AccountState>) => {
    const { t, i18n } = useTranslation();
    const [unit, setUnit] = useState<Unit>(Unit.METRIC);
    return (
        <ResponsiveContainer>
            <Form onSubmit={handleSubmit}>
                <Stack padding={2} spacing={2} alignItems={'center'}>
                    {profilePictureURL ? (
                        <>
                            <Avatar sx={{ height: 80, width: 80 }} alt="Profile Picture" src={profilePictureURL} />
                            {!isExternalProvider && (
                                <Button color="secondary" variant="contained" onClick={handleDeleteProfilePicture}>
                                    Delete profile picture
                                </Button>
                            )}
                        </>
                    ) : isExternalProvider ? null : (
                        <Field
                            name={'profilePicture'}
                            label={t('form.label.account.profilePicture')}
                            component={renderFileChooser}
                            // onChange={handleChangeEvent}
                        />
                    )}
                    {!isExternalProvider && (
                        <Field
                            label={t('form.label.profile.email')}
                            name={'email'}
                            validate={[email]}
                            normalize={lower}
                            component={renderEmailField}
                        />
                    )}
                    <Field
                        style={{ width: '100%' }}
                        name={'gender'}
                        label={t('form.label.profile.gender')}
                        component={renderRadioGroup}
                    >
                        <Stack direction={'row'} alignItems={'flex-start'}>
                            <FormControlLabel
                                value={'male'}
                                control={<Radio />}
                                label={t('form.options.profile.gender.male')}
                            />
                            <FormControlLabel
                                value={'female'}
                                control={<Radio />}
                                label={t('form.options.profile.gender.female')}
                            />
                            <FormControlLabel
                                value={'other'}
                                control={<Radio />}
                                label={t('form.options.profile.gender.other')}
                            />
                        </Stack>
                    </Field>
                    <Field
                        autoComplete={'nickname'}
                        name={'nickname'}
                        label={t('form.label.profile.nickname')}
                        validate={[alphaNumeric, minLength2, maxLength30]}
                        normalize={lower}
                        component={renderTextField}
                    />
                    <Field
                        autoComplete={'given-name'}
                        name={'firstName'}
                        label={t('form.label.profile.firstName')}
                        validate={[required, minLengthName, maxLength30]}
                        normalize={name}
                        component={renderTextField}
                    />
                    <Field
                        autoComplete={'family-name'}
                        name={'lastName'}
                        label={t('form.label.profile.lastName')}
                        validate={[required, minLengthName, maxLength30]}
                        normalize={name}
                        component={renderTextField}
                    />
                    <Field
                        name={'dateOfBirth'}
                        label={t('form.label.profile.dateOfBirth')}
                        component={renderDatePicker}
                        locale={i18n.language.split('-')[0]}
                    />
                    <Field
                        style={{ width: '100%' }}
                        name={'unit'}
                        label={t('form.label.profile.unit')}
                        component={renderRadioGroup}
                        onChange={(changeEvent: ChangeEvent<any>) => setUnit(changeEvent as any)}
                    >
                        <Stack direction={'row'} alignItems={'flex-start'}>
                            <FormControlLabel
                                value={Unit.METRIC}
                                control={<Radio />}
                                label={t('form.options.profile.unit.metric')}
                            />
                            <FormControlLabel
                                value={Unit.IMPERIAL}
                                control={<Radio />}
                                label={t('form.options.profile.unit.imperial')}
                            />
                        </Stack>
                    </Field>
                    <Field
                        name={'height'}
                        label={`${t('form.label.profile.height')} (${unit === Unit.METRIC ? 'cm' : 'ft'})`}
                        validate={[number, tallerThanShortestPersonEver, shorterThanTallestPersonEver]}
                        component={renderNumberField}
                    />
                    <Field
                        name={'weight'}
                        label={`${t('form.label.profile.weight')} (${unit === Unit.METRIC ? 'kg' : 'lb'})`}
                        validate={[number, heavierThanLightestPersonEver, lighterThanHeaviestPersonEver]}
                        component={renderNumberField}
                    />
                    <LoadingButton
                        loading={submitting}
                        loadingPosition="start"
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        fullWidth
                        disabled={pristine || submitting}
                        startIcon={<SaveOutlined />}
                        style={{ textTransform: 'none' }}
                    >
                        {t('form.button.account.saveProfile')}
                    </LoadingButton>
                </Stack>
            </Form>
        </ResponsiveContainer>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduxFormAccountForm = reduxForm<any, any>({ form: 'accountForm' /*, validate, asyncValidate*/ })(AccountForm);

const connectedReduxFormAccountForm = connect((state: RootStateOrAny) => ({ initialValues: state.account.data }))(
    reduxFormAccountForm
);

export default connectedReduxFormAccountForm;
