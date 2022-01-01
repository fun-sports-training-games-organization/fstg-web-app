import { StringMap, TOptions } from 'i18next';
import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from 'notistack';
import { TFunction } from 'react-i18next';

export const createSuccess = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    item?: string
): SnackbarKey => notificationItem(enqueueSnackbar, t, 'notifications.createSuccess', 'success', item);

export const createError = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    item?: string
): SnackbarKey => notificationItem(enqueueSnackbar, t, 'notifications.createFailure', 'error', item);

export const updateSuccess = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    item?: string
): SnackbarKey => notificationItem(enqueueSnackbar, t, 'notifications.updateSuccess', 'success', item);

export const updateError = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    item?: string
): SnackbarKey => notificationItem(enqueueSnackbar, t, 'notifications.updateFailure', 'error', item);

export const loginSuccess = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.login.successful', 'success');

export const loginError = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    options?: string | TOptions<StringMap> | undefined
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.login.failure', 'error', options);

export const loginFailedWrongCredentials = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.login.wrongCredentials', 'error');

export const logoutSuccess = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.logout.successful', 'success');

export const logoutError = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.logout.failure', 'error');

export const passwordResetEmailSuccess = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.resetPassword.emailSent', 'success');

export const passwordResetEmailError = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>
): SnackbarKey => notification(enqueueSnackbar, t, 'auth.message.resetPassword.emailError', 'error');

const notificationItem = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    translationKey: string,
    variant: VariantType | undefined,
    item: string | undefined
): SnackbarKey => notification(enqueueSnackbar, t, translationKey, variant, { item });

const notification = (
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
    t: TFunction<'translation', undefined>,
    translationKey: string,
    variant: VariantType | undefined,
    options?: string | TOptions<StringMap> | undefined
): SnackbarKey => enqueueSnackbar(t(translationKey, options), { variant });
