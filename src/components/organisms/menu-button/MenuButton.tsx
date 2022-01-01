import * as React from 'react';
import { FC } from 'react';
import Button from '@mui/material/Button';
import { Icon, ListItemIcon, ListItemText, Menu, MenuItem as MUIMenuItem } from '@mui/material';

type MenuItem = {
    text: string;
    onClick: () => void;
    icon?: string;
};

type Props = {
    buttonElement: JSX.Element;
    menuItems: MenuItem[];
};
const MenuButton: FC<Props> = ({ buttonElement, menuItems }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {buttonElement}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {menuItems.map(({ text, icon, onClick }) => (
                    <MUIMenuItem
                        key={text}
                        onClick={() => {
                            handleClose();
                            onClick();
                        }}
                    >
                        {icon && (
                            <ListItemIcon>
                                <Icon>{icon}</Icon>
                            </ListItemIcon>
                        )}
                        <ListItemText>{text}</ListItemText>
                    </MUIMenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MenuButton;
