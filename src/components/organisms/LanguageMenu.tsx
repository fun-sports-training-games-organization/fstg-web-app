import React, { FC } from 'react';
import { Language as LanguageIcon } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
// import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { MenuItem, MenuList } from '@mui/material';
import MenuIcon from '../MenuIcon';
import { Locale, locales } from '../../config/Locales';

const LanguageMenu: FC = () => {
    const { i18n } = useTranslation();

    const handleSelect = (locale: string): void => {
        i18n.changeLanguage(locale).catch(console.error);
        // const cookies = new Cookies();
        // cookies.set('i18next', locale, { path: '/' });
        // setAnchorEl(null);
    };

    return (
        <MenuIcon icon={<LanguageIcon style={{ color: 'white' }} />}>
            <MenuList>
                {locales.map((locale: Locale) => (
                    <MenuItem key={locale.key} onClick={(): void => handleSelect(locale.value)}>
                        <ListItemText primary={locale.text} />
                    </MenuItem>
                ))}
            </MenuList>
        </MenuIcon>
    );
};

export default LanguageMenu;
