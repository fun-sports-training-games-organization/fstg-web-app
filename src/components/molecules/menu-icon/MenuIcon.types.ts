import React from 'react';

export interface MenuIconProps {
    icon: React.ReactNode;
    onMenuSelect?: (arg?: unknown) => void;
}
