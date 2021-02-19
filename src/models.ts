import type { iField, iElement, iIndexedObj } from "./interface";

export class WidgetComponent implements iIndexedObj {
    index: number;
    type: string;
    name: string;
    active: boolean = false;
    fields: Array<iField>;
    element: iElement;

    constructor(index, options = {}) {
        this.index = index;
        Object.assign(this, options);

    }
    
    getFieldByName(name: string){
        return this.fields.filter(f => f.name === name).pop();
    }

    setFieldByName(name: string, value: string) {
        let fields = this.fields.map(f => {
            if(f.name == name){
                f.value = value;
            }
            return f;
        });
        this.fields = fields;
    }

    setElementAttributes(name: string, value: string) {
        this.element.setAttribute(name, value);
    }
}

export class BaseElement implements iElement{
    id: number;
    getAttribute(name: string){
        return this[name];
    }

    setAttribute(name: string, value: string) {
        this[name] = value;
    }
}

export class HTMLElement extends BaseElement implements iElement, iIndexedObj {
    index: number;
}

export class ImageElement extends BaseElement {
    id: number;
    src: string = "https://via.placeholder.com/250";
    alt: string;
}
