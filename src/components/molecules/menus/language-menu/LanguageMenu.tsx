import React, { FC } from 'react';
import { Language as LanguageIcon } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import { MenuItem, MenuList } from '@mui/material';
import MenuIcon from '../../../atoms/menu-icon/MenuIcon';
import { Locale, locales } from '../../../../config/Locales';

type LanguageMenuProps = {
    color?: string;
};
const LanguageMenu: FC<LanguageMenuProps> = ({ color = 'white' }: LanguageMenuProps) => {
    const { i18n } = useTranslation();

    const handleSelect = async (locale: string): Promise<void> => {
        await i18n.changeLanguage(locale);
    };

    return (
        <MenuIcon icon={<LanguageIcon style={{ color }} />}>
            <MenuList>
                {locales.map((locale: Locale) => (
                    <MenuItem key={locale.key} onClick={(): Promise<void> => handleSelect(locale.value)}>
                        <ListItemText primary={locale.text} />
                    </MenuItem>
                ))}
            </MenuList>
        </MenuIcon>
    );
};

export default LanguageMenu;
