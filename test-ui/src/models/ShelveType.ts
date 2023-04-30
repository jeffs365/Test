export interface ShelveType {
    shelveId?: number;
    name?: string;
    parentShelveId?: number;
    children?: ShelveType[];
    readOnly?: boolean;
    _v?: number;
}