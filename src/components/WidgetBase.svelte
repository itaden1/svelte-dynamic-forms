<script lang="ts">
    import GenericInputField from "./GenericInputField.svelte";
    import GenericFileField from "./GenericFileField.svelte";

    import { existingComponents } from "../stores";

    import type { iField } from "../interface";
    import type { WidgetComponent } from "../models";

    export let widget: WidgetComponent;
    let fields: Array<iField> = widget.fields;

    const componentMap = {
        "file": GenericFileField,
        "input": GenericInputField
    }

    function getComponent(index: string){
        return componentMap[index];
    }

    function getCurrentComponent(components: Array<WidgetComponent>){
        return components.filter(c => c.active)[0];
    }

    function handleFieldChange(event: { target: HTMLInputElement; }){
        // if the target is a file field we create a data url of the file and apply it to the element
        let components: Array<WidgetComponent>;
        if (event.target.type === "file"){
            let fReader = new FileReader();
            fReader.readAsDataURL(event.target.files[0]);
            fReader.onloadend = (e) => {
                const tmpImage = e.target.result.toString();
                components = $existingComponents.map(c => {
                    if (c.active === true) {
                        c.setElementAttributes("src", tmpImage)
                        c.setFieldByName(event.target.name, event.target.value);
                        c.setFieldByName("url", "");
                    }
                    return c;
                });
                $existingComponents = components;
            }            
        }        
        else if (event.target.name === "url"){
            components = $existingComponents.map(c => {
                    if (c.active === true) {
                        c.setElementAttributes("src", event.target.value);
                        c.setFieldByName(event.target.name, event.target.value);
                    }
                    return c;
                });
                $existingComponents = components;
        } else {
            components = $existingComponents.map(c => {
                if (c.active) {
                    c.setFieldByName(event.target.name, event.target.value);
                }
                return c;
            });
            $existingComponents = components;
        }

    }

</script>
<div class="widget-form">
    {widget.index}
    {#each widget.fields as field, index}
        <svelte:component 
            this={getComponent(field.type)}
            {field} 
            {widget} 
            on:fieldChange={() => handleFieldChange(event)} 
        />
    {/each}
</div>

