import { AppBar, Avatar, IconButton, Toolbar } from '@mui/material';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import LanguageMenu from './LanguageMenu';
import React from 'react';
import { useAuth } from '../contexts/AuthContextProvider';

const HeaderBar = (): JSX.Element => {
    const { user, logout } = useAuth();
    return (
        <AppBar position="static">
            <Toolbar>
                {user && (
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Box sx={{ flexGrow: 1 }}></Box>
                {user && user.photoURL && <Avatar src={user.photoURL} alt={'user profile picture'} />}
                {user && (
                    <IconButton onClick={logout}>
                        <LogoutIcon style={{ color: 'white' }} />
                    </IconButton>
                )}
                <LanguageMenu />
            </Toolbar>
            <div className="App"></div>
        </AppBar>
    );
};

export default HeaderBar;
