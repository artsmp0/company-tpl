export interface TableItem {
    urn: string;
    name: string;
    description: string;
    editablDescription: string;
    dbType: string;
    notes: string;
    sqId: string;
    taskName: string;
    instanceName: string;
    dbUrn: string;
    dbName: string;
    colCount: number;
    rowCount: number;
    updateType: number;
    storageSize: number;
    storageSizeStr: string;
    activeTime: string;
    jgTagNameList: string[];
    /** 是否发布 */
    isPublish: 0 | 1;
    firstActive: string;
}

export interface TagTbBindListParams {
    dbUrn?: string;
    domainTagCodes?: string;
    domainTagTypes?: string;
    isAsc?: string;
    keyword?: string;
    orderByColumn?: string;
    sqId?: string;
    tagCodes?: string;
    tagTypes?: string;
}
