export interface Id {
    id?: string;
}

export interface IdName extends Id {
    name?: string;
}

export interface CreateInfo {
    createdUTCMilliseconds?: number;
    createdById?: string;
    createdByDisplayName?: string | null;
}

export interface ModifyInfo {
    lastModifiedUTCMilliseconds?: number;
    lastModifiedById?: string;
    lastModifiedByDisplayName?: string | null;
}

export interface CreateAndModifyInfo extends CreateInfo, ModifyInfo {}