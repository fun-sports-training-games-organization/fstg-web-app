import React from 'react';
import { Meta } from '@storybook/react';
import MenuIcon, { MenuIconProps } from './MenuIcon';
import { Language as LanguageIcon } from '@mui/icons-material';

export default {
    title: 'atoms/LanguageMenuIcon',
    component: MenuIcon,
    args: {
        icon: <LanguageIcon />,
        onMenuSelect: () => console.log('onMenuSelect was triggered')
    }
} as Meta;

export const menuIcon = (args: MenuIconProps): JSX.Element => <MenuIcon {...args} />;
