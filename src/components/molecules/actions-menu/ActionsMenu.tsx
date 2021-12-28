import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, MenuList, Theme, useMediaQuery } from '@mui/material';
import MenuIcon from '../../../components/atoms/menu-icon/MenuIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export type ActionsMenuProps = {
    parentIdPrefix: string;
    index?: number;
    handleStart?: () => void;
    handleEdit?: () => void;
    handleDelete?: () => void;
};

const ActionsMenu: FC<ActionsMenuProps> = ({
    parentIdPrefix,
    index = 0,
    handleStart,
    handleEdit,
    handleDelete
}: ActionsMenuProps) => {
    const { t } = useTranslation();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return handleStart || handleEdit || handleDelete ? (
        <MenuIcon icon={<MoreVertIcon style={{ color: 'black' }} />}>
            <MenuList>
                {handleStart ? (
                    <MenuItem key={`${parentIdPrefix}start_item_${index}`} onClick={handleStart}>
                        <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                            <PlayArrow htmlColor={'green'} />
                        </ListItemIcon>
                        {!smDown && <ListItemText>{t('actionMenu.workout.start')}</ListItemText>}
                    </MenuItem>
                ) : null}
                {handleEdit ? (
                    <MenuItem key={`${parentIdPrefix}edit_item_${index}`} onClick={handleEdit}>
                        <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                            <Edit htmlColor={'steelblue'} />
                        </ListItemIcon>
                        {!smDown && <ListItemText>{t('actionMenu.workout.edit')}</ListItemText>}
                    </MenuItem>
                ) : null}
                {handleDelete ? (
                    <MenuItem key={`${parentIdPrefix}delete_item_${index}`} onClick={handleDelete}>
                        <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                            <Delete htmlColor={'palevioletred'} />
                        </ListItemIcon>
                        {!smDown && <ListItemText>{t('actionMenu.workout.delete')}</ListItemText>}
                    </MenuItem>
                ) : null}
            </MenuList>
        </MenuIcon>
    ) : null;
};

export default ActionsMenu;
