import React from 'react';
import { Menu as MUIMenu, MenuProps } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Menu = React.forwardRef<any, MenuProps>((props, ref) => {
    Menu.displayName = 'Menu';
    return <MUIMenu ref={ref} {...props} open={props['open']} />;
});

export default Menu;
