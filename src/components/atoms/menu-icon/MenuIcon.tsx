import React from 'react';

import { IconButton } from '@mui/material';
import Menu from '../../molecules/menus/menu/Menu';

export interface MenuIconProps {
    icon: React.ReactNode;
    onMenuSelect?: (arg?: unknown) => void;
}

const MenuIcon: React.FC<MenuIconProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    return (
        <>
            <div style={{ textAlign: 'right' }} className="menu-icon">
                <IconButton
                    style={{ marginRight: '-13px' }} // this is necessary so that it's on the edge of the xs column, while not affecting the hover effect
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        event.stopPropagation();
                        setAnchorEl(event.currentTarget);
                    }}
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
                    onClose={(event: React.MouseEvent<HTMLElement>) => {
                        event.stopPropagation();
                        setAnchorEl(null);
                    }}
                >
                    <div onClick={() => setAnchorEl(null)}>{props.children}</div>
                </Menu>
            </div>
        </>
    );
};

export default MenuIcon;
