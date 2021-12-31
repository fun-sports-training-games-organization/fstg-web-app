import React, { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface RouteProps {
    component: React.FC;
    path: string;
    exact?: boolean;
    redirectTo?: string;
}

interface IRoute {
    key: string;
    path?: string;
    exact?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Route?: any;
}

export default IRoute;
