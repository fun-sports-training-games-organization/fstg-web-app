import { ListItemIcon, MenuItem, MenuList } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React from 'react';

export const mockMenuList = (
    <MenuList style={{ fontFamily: 'OpenSans' }}>
        <MenuItem>
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            Edit
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            Delete
        </MenuItem>
    </MenuList>
);
