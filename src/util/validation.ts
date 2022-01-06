import i18n from 'i18next';
/**
 * Matches a valid email address.
 *
 * sources:
 * https://www.w3resource.com/javascript/form/email-validation.php
 * https://tools.ietf.org/html/rfc3696#page-5
 */

export const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

/**
 * Matches if there is a symbol in the string.
 * source: https://stackoverflow.com/questions/8359566/regex-to-match-symbols
 */
export const containsSymbol = RegExp(/[^\p{L}\d\s@#]/u);
/**
 * Matches if there is an uppercase letter in the string.
 */
export const containsUppercase = RegExp(/[A-Z]/);

/**
 * Matches if there is an lowercase letter in the string.
 */
export const containsLowercase = RegExp(/[a-z]/);

/**
 * Matches exactly 6 numeric digits.
 */
export const contains6Digits = RegExp(/^[0-9]{6}$/);

/**
 * Matches if there is at least one character.
 */
export const minOneCharacters = RegExp(/.+/);

/**
 * Matches if there is at least two character.
 */
export const minTwoCharacters = RegExp(/.{2,}/);

/**
 * Matches if there is at least ten character.
 */
export const minTenCharacters = RegExp(/.{10,}/);

/**
 * Matches if there is at least eight character.
 */
export const minEightCharacters = RegExp(/.{8,}/);

/**
 * Matches if the string is empty OR if it only contains alphanumeric characters or underscore or period.
 */
export const onlyHasAlphaNumericAndUnderscoreOrIsEmpty = RegExp(/^[a-zA-Z0-9_.]*$/);

/**
 * Matches if the string is empty OR if it only contains alphanumeric characters.
 */
export const alphaNumericOnly = RegExp(/^[a-zA-Z0-9]*$/);

/**
 * Matches if the string is in a Swiss phone number format.
 */
export const swissNumber = RegExp(/(\b(41)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/);

/**
 * Matches if the string is a valid url.
 */
export const isValidURL = (url: string): boolean => {
    let _url;
    try {
        _url = new URL(url);
    } catch (_) {
        return false;
    }

    return _url.protocol === 'http:' || _url.protocol === 'https:';
};

export const required = (value: string | number): string | undefined =>
    value || typeof value === 'number' ? undefined : i18n.t('validation.required');
export const minLength =
    (min: number) =>
    (value: string): string | undefined =>
        value && value.trim().length < min ? i18n.t('validation.minLength', { min }) : undefined;
export const maxLength =
    (max: number) =>
    (value: string): string | undefined =>
        value && value.trim().length > max ? i18n.t('validation.maxLength', { max }) : undefined;
export const minLengthName = minLength(1);
export const maxLengthLastName = maxLength(30);
export const minLengthPassword = minLength(8);
export const maxLengthPassword = maxLength(250);
export const minLength2 = minLength(2);
export const maxLength30 = maxLength(30);
export const maxLengthEmail = maxLength(320);

export const number = (value: string | number): string | undefined =>
    value && isNaN(Number(value)) ? i18n.t('validation.number') : undefined;
export const minValue =
    (min: number) =>
    (value: number): string | undefined =>
        value && value < min ? i18n.t('validation.minValue', { min }) : undefined;
export const maxValue =
    (max: number) =>
    (value: number): string | undefined =>
        value && value > max ? i18n.t('validation.maxValue', { max }) : undefined;
export const email = (value: string): string | undefined =>
    value && !emailRegex.test(value.trim()) ? i18n.t('validation.invalidEmail') : undefined;
export const alphaNumeric = (value: string): string | undefined =>
    value && !onlyHasAlphaNumericAndUnderscoreOrIsEmpty.test(value.trim())
        ? i18n.t('validation.alphanumeric')
        : undefined;
export const mustContainSymbol = (value: string): string | undefined =>
    value && !containsSymbol.test(value.trim()) ? i18n.t('validation.mustContainSymbol') : undefined;
export const mustContainLowercase = (value: string): string | undefined =>
    value && !containsLowercase.test(value.trim()) ? i18n.t('validation.mustContainLowercase') : undefined;
export const mustContainUppercase = (value: string): string | undefined =>
    value && !containsUppercase.test(value.trim()) ? i18n.t('validation.mustContainUppercase') : undefined;
