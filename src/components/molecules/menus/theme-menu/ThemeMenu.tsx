import React, { FC } from 'react';
import { DarkMode } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import { MenuItem, MenuList, Theme } from '@mui/material';
import MenuIcon from '../../../atoms/menu-icon/MenuIcon';
import { useTheme } from '../../../../contexts/ThemeContextProvider';
import { ThemeOption, themes } from '../../../../config/themes';

type ThemeMenuProps = {
    color?: string;
};

const ThemeMenu: FC<ThemeMenuProps> = ({ color = 'white' }: ThemeMenuProps) => {
    const { changeTheme } = useTheme();

    const handleSelect = (theme: Theme): void => {
        changeTheme(theme);
    };

    return (
        <MenuIcon icon={<DarkMode style={{ color }} />}>
            <MenuList>
                {themes.map((theme: ThemeOption) => (
                    <MenuItem key={theme.key} onClick={(): void => handleSelect(theme.value)}>
                        <ListItemText primary={theme.text} />
                    </MenuItem>
                ))}
            </MenuList>
        </MenuIcon>
    );
};

export default ThemeMenu;
