import { ReactNode } from 'react';

export interface ActionMenuOption {
    name: string;
    handleClick: () => void;
    translationKey: string;
    icon: ReactNode;
}
