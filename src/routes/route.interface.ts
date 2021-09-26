interface IRoute {
    path: string;
    exact: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any;
    name: string;
    protected: boolean;
}

export default IRoute;
