import { readable, writable } from "svelte/store";
import type { iComponentOption } from "./interface";
import { ImageElement, WidgetComponent } from "./models";


export const existingComponents = writable<Array<WidgetComponent>>([
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