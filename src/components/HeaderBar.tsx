import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Box } from '@mui/system';
import LanguageMenu from './LanguageMenu';
import React from 'react';
import { useFirebase } from 'react-redux-firebase';

const HeaderBar = (): JSX.Element => {
    // const { user, logout } = useAuth();
    const firebase = useFirebase();
    return (
        <AppBar position="static">
            <Toolbar>
                {/*{user && (*/}
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                {/*)}*/}
                <Box sx={{ flexGrow: 1 }}></Box>
                {/*{user && user.photoURL && <Avatar src={user.photoURL} alt={'user profile picture'} />}*/}
                {/*{user && (*/}
                <IconButton
                    onClick={() => {
                        firebase
                            .logout()
                            .then(() => console.log('logged out successfully!'))
                            .catch(console.error);
                    }}
                >
                    <LogoutIcon style={{ color: 'white' }} />
                </IconButton>
                {/*)}*/}
                <LanguageMenu />
            </Toolbar>
            <div className="App"></div>
        </AppBar>
    );
};

export default HeaderBar;
