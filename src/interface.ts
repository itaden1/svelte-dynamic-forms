export interface iField {
    type: string;
    name: string;
}

export interface iComponentOption {
    type: string;
    name: string;
    fields: Array<iField>;
}
