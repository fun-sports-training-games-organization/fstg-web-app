import React from 'react';
import MenuIcon from './MenuIcon';
import { MenuIconProps } from './MenuIcon.types';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { mockMenuList } from '../../../../__mocks__/mockMenuList';

export default {
    title: 'atoms/MenuIconShowMore',
    component: MenuIcon,
    args: {
        icon: <MoreVertIcon />,
        children: mockMenuList
    }
};

export const menuIcon = (args: MenuIconProps): JSX.Element => <MenuIcon {...args} />;
