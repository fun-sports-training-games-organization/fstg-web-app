import { Theme } from '@mui/material';
import onePirate from '../themes/onePirate';
import defaultTheme from '../themes/defaultTheme';

export interface ThemeOption {
    key: string;
    value: Theme;
    text: string;
}

export const themes: ThemeOption[] = [
    {
        key: 'onePirate',
        text: 'One Pirate',
        value: onePirate as Theme
    },
    {
        key: 'defaultTheme',
        text: 'Default Theme',
        value: defaultTheme
    }
];
