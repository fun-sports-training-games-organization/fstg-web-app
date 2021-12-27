import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { IconButton, MenuItem, MenuList } from '@mui/material';
import MenuIcon from '../../../components/atoms/menu-icon/MenuIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC } from 'react';

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
    return handleStart || handleEdit || handleDelete ? (
        <MenuIcon icon={<MoreVertIcon style={{ color: 'black' }} />}>
            <MenuList>
                {handleStart ? (
                    <MenuItem key={`${parentIdPrefix}start_item_${index}`} onClick={handleStart}>
                        <IconButton data-testid={`${parentIdPrefix}start_item_${index}`} onClick={handleStart}>
                            <PlayArrow htmlColor={'green'} />
                        </IconButton>
                    </MenuItem>
                ) : null}
                {handleEdit ? (
                    <MenuItem key={`${parentIdPrefix}edit_item_${index}`} onClick={handleEdit}>
                        <IconButton data-testid={`${parentIdPrefix}edit_item_${index}`} onClick={handleEdit}>
                            <Edit htmlColor={'steelblue'} />
                        </IconButton>
                    </MenuItem>
                ) : null}
                {handleDelete ? (
                    <MenuItem key={`${parentIdPrefix}delete_item_${index}`} onClick={handleDelete}>
                        <IconButton data-testid={`${parentIdPrefix}delete_item_${index}`} onClick={handleDelete}>
                            <Delete htmlColor={'palevioletred'} />
                        </IconButton>
                    </MenuItem>
                ) : null}
            </MenuList>
        </MenuIcon>
    ) : null;
};

export default ActionsMenu;
