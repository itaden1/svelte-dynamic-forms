export interface iField {
    type: string;
    name: string;
    value: string;
}

export interface iComponentOption {
    type: string;
    name: string;
    fields: Array<iField>;
}

export interface iElement {
    id: number;
}
