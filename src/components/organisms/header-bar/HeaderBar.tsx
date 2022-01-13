import React, { FC } from 'react';
import { AppBar, Avatar, IconButton, Stack, Toolbar } from '@mui/material';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import LanguageMenu from '../../molecules/menus/language-menu/LanguageMenu';
import { HeaderBarProps } from './HeaderBar.types';
import ThemeMenu from '../../molecules/menus/theme-menu/ThemeMenu';

const HeaderBar: FC<HeaderBarProps> = ({ user, logout }: HeaderBarProps): JSX.Element => {
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
                <Stack direction={'row'} spacing={2}>
                    <ThemeMenu />
                    <LanguageMenu />
                </Stack>
            </Toolbar>
            <div className="App"></div>
        </AppBar>
    );
};

export default HeaderBar;
