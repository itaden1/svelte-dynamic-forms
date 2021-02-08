import { readable, writable } from "svelte/store";
import type { iComponentOption } from "./interface";
import type { WidgetComponent } from "./models";


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
    const {subscribe, set, update } = writable<Array<WidgetComponent>>([]);
    return {
        subscribe,
        patch: (widget: WidgetComponent) => update((components) => {
            components.forEach(element => {
                element.index === widget.index ? element = widget : element = element;   
            });
            return components
        }),
        open: (index: number) => update(components => {
            components.forEach(element => {
                element.index === index ? element.active = true : element.active = false;
            });
            return components;
        }),
        insert: (index, widget) => update(components => {
            let reIndexed = reIndexComponents(index, components);
            components = [...reIndexed, widget];
            return components.sort((a, b) => a.index > b.index ? 1 : -1);;
        }),
        delete: (index) => update(components => {
            components.splice(index, 1)
            return reIndexComponents(0, components);
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