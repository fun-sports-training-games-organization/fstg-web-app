import * as React from 'react';
import { User } from 'firebase/auth';

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
    user?: Partial<User>;
    photoURL?: string;
    logout?: () => void;
};
