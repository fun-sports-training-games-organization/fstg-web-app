import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, MenuList, Theme, useMediaQuery } from '@mui/material';
import MenuIcon from '../../../components/atoms/menu-icon/MenuIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC } from 'react';
import * as navigate from '../../../util/navigation-util';
import { useHistory } from 'react-router-dom';
import { Id } from '../../../model/Basics.model';
import { useTranslation } from 'react-i18next';

export type ActionsMenuProps = {
    entity: Id;
    handleDelete: (entity: unknown) => void;
    parentIdPrefix: string;
    index?: number;
};

const ActionsMenu: FC<ActionsMenuProps> = ({ entity, handleDelete, parentIdPrefix, index = 0 }: ActionsMenuProps) => {
    const history = useHistory();
    const { t } = useTranslation();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <MenuIcon icon={<MoreVertIcon style={{ color: 'black' }} />}>
            <MenuList>
                <MenuItem
                    key={`${parentIdPrefix}start_item_${index}`}
                    onClick={() => entity.id && navigate.toStartWorkout(history, entity.id)}
                >
                    <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                        <PlayArrow htmlColor={'green'} />
                    </ListItemIcon>
                    {!smDown && <ListItemText>{t('actionMenu.workout.start')}</ListItemText>}
                </MenuItem>
                <MenuItem
                    key={`${parentIdPrefix}edit_item_${index}`}
                    onClick={() => navigate.toEditWorkout(history, entity.id)}
                >
                    <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                        <Edit htmlColor={'steelblue'} />
                    </ListItemIcon>
                    {!smDown && <ListItemText>{t('actionMenu.workout.edit')}</ListItemText>}
                </MenuItem>
                <MenuItem key={`${parentIdPrefix}delete_item_${index}`} onClick={() => handleDelete(entity)}>
                    <ListItemIcon sx={smDown ? { justifyContent: 'center' } : undefined}>
                        <Delete htmlColor={'palevioletred'} />
                    </ListItemIcon>
                    {!smDown && <ListItemText>{t('actionMenu.workout.delete')}</ListItemText>}
                </MenuItem>
            </MenuList>
        </MenuIcon>
    );
};

export default ActionsMenu;
