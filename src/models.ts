import type { iField, iElement } from "./interface";

export class WidgetComponent {
    index: number;
    type: string;
    name: string;
    active: boolean = false;
    fields: Array<iField>;
    element: iElement;

    constructor(index, options = {}){
        this.index = index;
        Object.assign(this, options);

    }

    setElementAttributes(name: string, value: string){
        console.log(`setting attribute ${name} to ${value}`);
        this.element[name] = value;
        console.log(this.element);
    }
}

export class ImageElement implements iElement {
    id: number;
    src: string;
    alt:string;
}