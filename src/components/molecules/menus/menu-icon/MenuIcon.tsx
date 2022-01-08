import React from 'react';

import { IconButton } from '@mui/material';
import { MenuIconProps } from './MenuIcon.types';
import Menu from './Menu';
import HTMLAttributes from '../../../../interfaces/HTMLAttributes.interface';

const MenuIcon: React.FC<MenuIconProps & HTMLAttributes> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    return (
        <div data-testid={props['data-testid']} style={{ textAlign: 'right' }} className="menu-icon">
            <IconButton
                style={{ marginRight: '-13px' }} // this is necessary so that it's on the edge of the xs column, while not affecting the hover effect
                onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
            >
                {props.icon}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <div onClick={() => setAnchorEl(null)}>{props.children}</div>
            </Menu>
        </div>
    );
};

export default MenuIcon;
