export interface Locale {
    label: string;
    key: string;
    value: string;
    text: string;
}

export const locales: Locale[] = [
    {
        label: 'Deutsch',
        key: 'de',
        value: 'de',
        text: 'Deutsch'
    },
    {
        label: 'France',
        key: 'fr',
        value: 'fr',
        text: 'Français'
    },
    {
        label: 'United Kingdom',
        key: 'en',
        value: 'en',
        text: 'English'
    },
    {
        label: 'Italy',
        key: 'it',
        value: 'it',
        text: 'Italiano'
    }
];
