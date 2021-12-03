import * as React from 'react';
import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuListItem, PersistentDrawerProps } from './PersistentDrawer.types';
import { Icon } from '@mui/material';
import { useHistory } from 'react-router-dom';
import HeaderBar from '../header-bar/HeaderBar';
import { useAuth } from '../../../contexts/AuthContextProvider';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    })
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth
    })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    color: theme.palette.common.white
}));

const PersistentDrawer: FC<PersistentDrawerProps> = ({
    children,
    topMenuListItems,
    bottomMenuListItems
}: PersistentDrawerProps) => {
    const history = useHistory();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [appBarText, setAppBarText] = useState<string>();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuClick = ({ path, text, onClick }: MenuListItem) => {
        path && history.push(path);
        onClick && onClick();
        handleDrawerClose();
        setAppBarText(text);
    };

    type MenuListProps = {
        menuItemsList: MenuListItem[];
    };
    const MenuList: FC<MenuListProps> = ({ menuItemsList }: MenuListProps) => (
        <List>
            {menuItemsList.map((menuListItem: MenuListItem) => {
                const { key, text, icon } = menuListItem;
                return (
                    <ListItem button key={key} onClick={() => handleMenuClick(menuListItem)}>
                        <ListItemIcon>{typeof icon === 'string' ? <Icon>{icon}</Icon> : { icon }}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                {user ? (
                    <Toolbar>
                        <Typography color={'white'} variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                            {appBarText}
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            sx={{ ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                ) : (
                    <HeaderBar />
                )}
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth
                    }
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <MenuList menuItemsList={topMenuListItems} />
                </List>
                {bottomMenuListItems && <Divider />}
                {bottomMenuListItems && <MenuList menuItemsList={bottomMenuListItems} />}
            </Drawer>
        </Box>
    );
};

export default PersistentDrawer;
