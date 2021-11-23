export interface Exercise {
    id?: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageOrGif?: any;
    defaultType?: string;
    defaultValue?: number;
    defaultResult?: number;
    defaultDistance?: number;
    defaultTargetSize?: number;
}
