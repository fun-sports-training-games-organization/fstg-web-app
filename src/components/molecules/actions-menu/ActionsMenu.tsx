import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import { IconButton, MenuItem, MenuList } from '@mui/material';
import MenuIcon from '../../../components/atoms/menu-icon/MenuIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC } from 'react';
import * as navigate from '../../../util/navigation-util';
import { useHistory } from 'react-router-dom';
import { Id } from '../../../model/Basics.model';

export type ActionsMenuProps = {
    entity: Id;
    handleDelete: (entity: unknown) => void;
    parentIdPrefix: string;
    index?: number;
};

const ActionsMenu: FC<ActionsMenuProps> = ({ entity, handleDelete, parentIdPrefix, index = 0 }: ActionsMenuProps) => {
    const history = useHistory();

    return (
        <MenuIcon icon={<MoreVertIcon style={{ color: 'black' }} />}>
            <MenuList>
                <MenuItem
                    key={`${parentIdPrefix}start_item_${index}`}
                    onClick={() => entity.id && navigate.toStartWorkout(history, entity.id)}
                >
                    <IconButton
                        data-testid={`${parentIdPrefix}start_item_${index}`}
                        onClick={() => entity.id && navigate.toStartWorkout(history, entity.id)}
                    >
                        <PlayArrow htmlColor={'green'} />
                    </IconButton>
                </MenuItem>
                <MenuItem
                    key={`${parentIdPrefix}edit_item_${index}`}
                    onClick={() => navigate.toEditWorkout(history, entity.id)}
                >
                    <IconButton
                        data-testid={`${parentIdPrefix}edit_item_${index}`}
                        onClick={() => navigate.toEditWorkout(history, entity.id)}
                    >
                        <Edit htmlColor={'steelblue'} />
                    </IconButton>
                </MenuItem>
                <MenuItem
                    key={`${parentIdPrefix}delete_item_${index}`}
                    onClick={() => {
                        handleDelete(entity);
                    }}
                >
                    <IconButton
                        data-testid={`${parentIdPrefix}delete_item_${index}`}
                        onClick={() => {
                            handleDelete(entity);
                        }}
                    >
                        <Delete htmlColor={'palevioletred'} />
                    </IconButton>
                </MenuItem>
            </MenuList>
        </MenuIcon>
    );
};

export default ActionsMenu;
