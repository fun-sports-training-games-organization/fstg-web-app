import { ListItemIcon, ListItemText, MenuItem, MenuList, Theme, useMediaQuery } from '@mui/material';
import MenuIcon from '../../../atoms/menu-icon/MenuIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionMenuOption } from '../../../../model/ActionMenuOption.model';

export type ActionsMenuProps = {
    parentIdPrefix: string;
    index?: number;
    options?: ActionMenuOption[];
};

const ActionsMenu: FC<ActionsMenuProps> = ({ parentIdPrefix, index = 0, options }: ActionsMenuProps) => {
    const { t } = useTranslation();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return options ? (
        <MenuIcon icon={<MoreVertIcon style={{ color: 'black' }} />}>
            <MenuList>
                {options.map((option) => {
                    return (
                        <MenuItem key={`${parentIdPrefix}${option.name}_item_${index}`} onClick={option.handleClick}>
                            <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                                {option.icon}
                            </ListItemIcon>
                            {!smDown && option.translationKey && (
                                <ListItemText>{t(option.translationKey)}</ListItemText>
                            )}
                        </MenuItem>
                    );
                })}
            </MenuList>
        </MenuIcon>
    ) : null;
};

export default ActionsMenu;
