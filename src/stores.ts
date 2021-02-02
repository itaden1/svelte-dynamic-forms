import { readable, writable } from "svelte/store";
import type { iComponentOption } from "./interface";
import { ImageElement, WidgetComponent } from "./models";


function reIndexComponents(index, components) {
    return components.map((c, i) => {
        if (index === 0){
            c.index = i;
        }
        else if (c.index >= index) {
            c.index++;
        }
        return c;
    });
}

function createExistingComponetns() {
    const {subscribe, set, update } = writable<Array<WidgetComponent>>([
        new WidgetComponent(0, {
            type:"image",
            name: "image",
            active: true,
            fields: [
                {type: "input", name: "url", value: ""}, 
                {type: "file", name: "upload", value: ""},
                {type: "input", name: "alt", value: ""}
            ],
            element: new ImageElement()
        })
    ]);
    return {
        subscribe,
        edit: (widget: WidgetComponent) => update((n) => {
            n.forEach(element => {
                element.index === widget.index ? element = widget : element;   
            });
            return n
        }),
        open: (index: number) => update(n => {
            n.forEach(element => {
                element.index === index ? element.active = true : element.active = false;   
            });
            return n;
        }),
        insert: (index, widget) => update(n => {
            let reIndexed = reIndexComponents(index, n);
            n = [...reIndexed, widget];
            return n.sort((a, b) => a.index > b.index ? 1 : -1);;
        }),
        delete: (index) => update(n => {
            n.splice(index, 1)
            return reIndexComponents(0, n);
        })
    }
  
}

export const existingComponents = createExistingComponetns()


export const componentOptions = readable<{[key: string]: iComponentOption}>({
    image: {
            type:"image",
            name: "image",
            fields: [
                {type: "input", name: "url", value: ""}, 
                {type: "file", name: "upload", value: ""},
                {type: "input", name: "alt", value: ""}
            ]
        }
    }, function start(set){
    console.log("start");

    return function stop(){
        console.log("stop");
    }
});