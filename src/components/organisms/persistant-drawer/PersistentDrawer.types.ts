import * as React from 'react';

export type MenuListItem = {
    key?: string | number;
    text?: string;
    icon?: string | React.ReactNode;
    path?: string;
    onClick?: () => void;
};

export type PersistentDrawerProps = {
    children: JSX.Element;
    topMenuListItems: MenuListItem[];
    bottomMenuListItems?: MenuListItem[];
};
