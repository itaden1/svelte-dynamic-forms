import { readable, writable } from "svelte/store";
import type { iComponentOption } from "./interface";
import { ImageElement, WidgetComponent } from "./models";


export const existingComponents = writable<Array<WidgetComponent>>([
    new WidgetComponent(0, {
        type:"image",
        name: "image",
        active: true,
        fields: [
            {type: "input", name: "url"}, 
            {type: "file", name: "upload"},
            {type: "input", name: "alt"}
        ],
        element: new ImageElement()
    })
]);

export const componentOptions = readable<{[key: string]: iComponentOption}>({
    image: {
            type:"image",
            name: "image",
            fields: [
                {type: "input", name: "url"}, 
                {type: "file", name: "upload"},
                {type: "input", name: "alt"}
            ]
        }
    }, function start(set){
    console.log("start");

    return function stop(){
        console.log("stop");
    }
});