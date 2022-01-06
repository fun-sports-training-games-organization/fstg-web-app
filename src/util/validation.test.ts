import { contains6Digits, containsLowercase, containsUppercase, emailRegex, isValidURL } from './validation';

describe('containsLowercase', () => {
    it(' should be false', () => {
        expect(containsLowercase.test('AAA')).toBe(false);
        expect(containsLowercase.test('123')).toBe(false);
        expect(containsLowercase.test('!!!')).toBe(false);
    });

    it(' should be true', () => {
        expect(containsLowercase.test('AAa')).toBe(true);
        expect(containsLowercase.test('123aa')).toBe(true);
        expect(containsLowercase.test('!!!aa!!!')).toBe(true);
    });
});

describe('containsUppercase', () => {
    it(' should be false', () => {
        expect(containsUppercase.test('aaa')).toBe(false);
        expect(containsUppercase.test('123')).toBe(false);
        expect(containsUppercase.test('!!!')).toBe(false);
    });

    it(' should be true', () => {
        expect(containsUppercase.test('AAA')).toBe(true);
        expect(containsUppercase.test('123AA')).toBe(true);
        expect(containsUppercase.test('!!!AA!!!')).toBe(true);
    });
});

describe('emailRegex', () => {
    it(' should be false', () => {
        expect(emailRegex.test('aaa')).toBe(false);
        expect(emailRegex.test('123')).toBe(false);
        expect(emailRegex.test('!!!')).toBe(false);
    });

    it(' should be true', () => {
        expect(emailRegex.test('a@b.ch')).toBe(true);
        expect(emailRegex.test('nimbus@nimbus.ch')).toBe(true);
    });
});

describe('contains6Digits', () => {
    it(' should be false', () => {
        expect(contains6Digits.test('12345')).toBe(false);
        expect(contains6Digits.test('')).toBe(false);
    });

    it(' should be true', () => {
        expect(contains6Digits.test('123456')).toBe(true);
        expect(contains6Digits.test('000000')).toBe(true);
    });
});

describe('isValidURL', () => {
    it(' should be false', () => {
        expect(isValidURL('httpss://www.google.ch')).toBe(false);
        expect(isValidURL('')).toBe(false);
    });

    it(' should be true', () => {
        expect(isValidURL('http://www.google.ch')).toBe(true);
        expect(isValidURL('https://abc.de')).toBe(true);
        expect(isValidURL('http://localhost:12345')).toBe(true);
        expect(isValidURL('https://url.with?query=parameters')).toBe(true);
    });
});
