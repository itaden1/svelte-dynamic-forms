import type { iField, iElement } from "./interface";

export class WidgetComponent {
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
        this.fields.map(f => {
            if(f.name == name){
                f.value = value;
            }
            return f;
        })
    }

    setElementAttributes(name: string, value: string) {
        this.element.setAttribute(name, value);
    }
}

export class ImageElement implements iElement {
    id: number;
    src: string = "https://via.placeholder.com/250";
    alt: string;

    getAttribute(name: string){
        return this[name];
    }

    setAttribute(name: string, value: string) {
        this[name] = value;
    }

}