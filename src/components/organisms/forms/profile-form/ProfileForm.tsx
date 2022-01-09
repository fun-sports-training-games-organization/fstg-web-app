import { FC } from 'react';
import { Avatar, Button, FormControlLabel, Radio, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponsiveContainer from '../../../templates/containers/responsive-container/ResponsiveContainer';
import { Field, Form, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
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
import { ProfileState, Unit } from '../../../../reducers/profile-reducer';
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
    formUnit?: Unit;
};

const ProfileForm: FC<OwnProps & InjectedFormProps<ProfileState>> = ({
    handleSubmit,
    pristine,
    submitting,
    profilePictureURL,
    handleDeleteProfilePicture,
    isExternalProvider,
    formUnit
}: OwnProps & InjectedFormProps<ProfileState>) => {
    const { t, i18n } = useTranslation();

    return (
        <ResponsiveContainer>
            <Form onSubmit={handleSubmit}>
                <Stack padding={2} spacing={2} alignItems={'center'}>
                    {profilePictureURL ? (
                        <>
                            <Avatar sx={{ height: 80, width: 80 }} alt="Profile Picture" src={profilePictureURL} />
                            {!isExternalProvider && (
                                <Button color="secondary" variant="contained" onClick={handleDeleteProfilePicture}>
                                    {t('form.button.profile.deleteProfilePicture')}
                                </Button>
                            )}
                        </>
                    ) : isExternalProvider ? null : (
                        <Field
                            name={'profilePicture'}
                            label={t('form.label.profile.profilePicture')}
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
                        label={`${t('form.label.profile.height')} (${formUnit === Unit.IMPERIAL ? 'ft' : 'cm'})`}
                        validate={[number, tallerThanShortestPersonEver, shorterThanTallestPersonEver]}
                        component={renderNumberField}
                    />
                    <Field
                        name={'weight'}
                        label={`${t('form.label.profile.weight')} (${formUnit === Unit.IMPERIAL ? 'lb' : 'kg'})`}
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
                        {t('form.button.profile.saveProfile')}
                    </LoadingButton>
                </Stack>
            </Form>
        </ResponsiveContainer>
    );
};

// we are getting the following error on this page:
// Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.
// * Move code with side effects to componentDidMount, and set initial state in the constructor.
// According to my sources below, this seems to be caused by the redux-form library and is not yet fixed!
// source: https://github.com/redux-form/redux-form/issues/3954
// source: https://stackoverflow.com/questions/62202890/how-can-i-fix-using-unsafe-componentwillmount-in-strict-mode-is-not-recommended
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduxFormProfileForm = reduxForm<any, any>({ form: 'profileForm' /*, validate, asyncValidate*/ })(ProfileForm);

const connectedReduxFormProfileForm = connect((state: RootStateOrAny) => ({ initialValues: state.profile.data }))(
    reduxFormProfileForm
);

const selector = formValueSelector('profileForm');
const connectedReduxFormProfileFormWithSelector = connect((state: RootStateOrAny) => {
    const formUnit = selector(state, 'unit');
    return { formUnit };
})(connectedReduxFormProfileForm);

export default connectedReduxFormProfileFormWithSelector;
